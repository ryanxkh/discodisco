import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";
import { setTimeout as sleep } from "node:timers/promises";
import { embedMany } from "ai";
import { count, sql } from "drizzle-orm";
import { getDb } from "../src/db";
import { corpusChunks } from "../src/db/schema";
import { chunkMarkdown } from "../src/lib/chunking";
import { sectionsForFile, SOURCE_FILES, type Section } from "../src/lib/sections";

const RESEARCH_DIR = join(homedir(), "Projects/vercel/interview-prep/research");
const METHODOLOGY_DIR = join(process.cwd(), "data/methodology");
const METHODOLOGY_SECTIONS: Section[] = ["discovery", "objections"];
const CASE_STUDIES_DIR = join(process.cwd(), "data/case-studies");
const CASE_STUDIES_SECTIONS: Section[] = ["case-study"];
const DISCOVERY_CALLS_DIR = join(process.cwd(), "data/discovery-calls");
const DISCOVERY_CALLS_SECTIONS: Section[] = ["discovery", "objections"];
const EMBED_MODEL = "openai/text-embedding-3-small";
const EMBED_BATCH = 32;
const RESET_FLAG = process.argv.includes("--reset");
const FORCE_FILES = process.argv
  .filter((a) => a.startsWith("--file="))
  .map((a) => a.slice("--file=".length));

function deriveTitle(filename: string): string {
  return filename
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/\.md$/, "")
    .replace(/-/g, " ");
}

async function alreadyIngested(): Promise<Set<string>> {
  const db = getDb();
  const rows = await db
    .selectDistinct({ sourceFile: corpusChunks.sourceFile })
    .from(corpusChunks);
  return new Set(rows.map((r) => r.sourceFile));
}

async function embedWithBackoff(values: string[]): Promise<number[][]> {
  let attempt = 0;
  const maxAttempts = 5;
  while (true) {
    try {
      const { embeddings } = await embedMany({
        model: EMBED_MODEL,
        values,
      });
      return embeddings;
    } catch (err) {
      attempt++;
      const e = err as { statusCode?: number; message?: string };
      const isRateLimit = e.statusCode === 429;
      if (!isRateLimit || attempt >= maxAttempts) throw err;
      const wait = Math.min(60_000, 2_000 * 2 ** (attempt - 1));
      console.warn(
        `\n  ⚠ rate-limited (429). attempt ${attempt}/${maxAttempts}, sleeping ${wait}ms...`,
      );
      await sleep(wait);
    }
  }
}

async function main() {
  const db = getDb();

  if (RESET_FLAG) {
    console.log("→ --reset: TRUNCATE corpus_chunks");
    await db.execute(sql`TRUNCATE TABLE ${corpusChunks}`);
  }

  const done = RESET_FLAG ? new Set<string>() : await alreadyIngested();
  if (done.size > 0) {
    console.log(`→ Resuming. Already ingested: ${done.size} files.`);
  }

  const filesToProcess = SOURCE_FILES.filter(
    (f) =>
      (FORCE_FILES.length === 0 || FORCE_FILES.includes(f)) && !done.has(f),
  );

  if (filesToProcess.length > 0) {
    console.log(`→ ${filesToProcess.length} research file(s) to process.`);
  }

  for (const filename of filesToProcess) {
    const path = join(RESEARCH_DIR, filename);
    let raw: string;
    try {
      raw = await readFile(path, "utf8");
    } catch {
      console.warn(`  ⚠ skipped (missing): ${filename}`);
      continue;
    }
    await ingestFile({
      sourceFile: filename,
      sourceTitle: deriveTitle(filename),
      raw,
      sections: sectionsForFile(filename),
    });
  }

  // Methodology corpus (MEDDPICC, Command of the Message, SPICED, Challenger).
  let methodologyFiles: string[] = [];
  try {
    methodologyFiles = (await readdir(METHODOLOGY_DIR))
      .filter((f) => f.endsWith(".md"))
      .sort();
  } catch {
    // directory may not exist yet
  }
  const methodologyToDo = methodologyFiles.filter(
    (f) => !done.has(`methodology/${f}`),
  );
  if (methodologyToDo.length > 0) {
    console.log(`→ ${methodologyToDo.length} methodology file(s) to process.`);
    for (const filename of methodologyToDo) {
      const raw = await readFile(join(METHODOLOGY_DIR, filename), "utf8");
      await ingestFile({
        sourceFile: `methodology/${filename}`,
        sourceTitle: deriveTitle(filename),
        raw,
        sections: METHODOLOGY_SECTIONS,
      });
    }
  }

  // Vercel customer case studies (long-tail, scraped from vercel.com/customers).
  let caseStudyFiles: string[] = [];
  try {
    caseStudyFiles = (await readdir(CASE_STUDIES_DIR))
      .filter((f) => f.endsWith(".md"))
      .sort();
  } catch {
    // directory may not exist yet
  }
  const caseStudiesToDo = caseStudyFiles.filter(
    (f) => !done.has(`case-studies/${f}`),
  );
  if (caseStudiesToDo.length > 0) {
    console.log(`→ ${caseStudiesToDo.length} case-study file(s) to process.`);
    for (const filename of caseStudiesToDo) {
      const raw = await readFile(join(CASE_STUDIES_DIR, filename), "utf8");
      await ingestFile({
        sourceFile: `case-studies/${filename}`,
        sourceTitle: deriveTitle(filename),
        raw,
        sections: CASE_STUDIES_SECTIONS,
      });
    }
  }

  // Real B2B discovery call walkthroughs (30MPC, Gong Labs, etc.).
  let discoveryCallFiles: string[] = [];
  try {
    discoveryCallFiles = (await readdir(DISCOVERY_CALLS_DIR))
      .filter((f) => f.endsWith(".md"))
      .sort();
  } catch {
    // directory may not exist yet
  }
  const discoveryCallsToDo = discoveryCallFiles.filter(
    (f) => !done.has(`discovery-calls/${f}`),
  );
  if (discoveryCallsToDo.length > 0) {
    console.log(
      `→ ${discoveryCallsToDo.length} discovery-call file(s) to process.`,
    );
    for (const filename of discoveryCallsToDo) {
      const raw = await readFile(join(DISCOVERY_CALLS_DIR, filename), "utf8");
      await ingestFile({
        sourceFile: `discovery-calls/${filename}`,
        sourceTitle: deriveTitle(filename),
        raw,
        sections: DISCOVERY_CALLS_SECTIONS,
      });
    }
  }

  const [{ total }] = await db.select({ total: count() }).from(corpusChunks);
  console.log(`✓ corpus_chunks now contains ${total} rows`);
}

async function ingestFile(params: {
  sourceFile: string;
  sourceTitle: string;
  raw: string;
  sections: Section[];
}) {
  const db = getDb();
  const chunks = chunkMarkdown(params.raw);
  console.log(
    `  ${params.sourceFile} → ${chunks.length} chunks [${params.sections.join(", ")}]`,
  );
  let embedded = 0;
  for (let i = 0; i < chunks.length; i += EMBED_BATCH) {
    const batch = chunks.slice(i, i + EMBED_BATCH);
    const embeddings = await embedWithBackoff(batch.map((c) => c.content));
    const rows = batch.map((c, idx) => ({
      sourceFile: params.sourceFile,
      sourceTitle: params.sourceTitle,
      headerPath: c.headerPath,
      sections: params.sections,
      content: c.content,
      tokenCount: c.tokenCount,
      embedding: embeddings[idx],
    }));
    await db.insert(corpusChunks).values(rows);
    embedded += rows.length;
    process.stdout.write(`\r    embedded ${embedded}/${chunks.length}`);
  }
  process.stdout.write("\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
