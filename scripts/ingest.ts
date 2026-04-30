import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";
import { setTimeout as sleep } from "node:timers/promises";
import { embedMany } from "ai";
import { count, sql } from "drizzle-orm";
import { getDb } from "../src/db";
import { corpusChunks } from "../src/db/schema";
import { chunkMarkdown } from "../src/lib/chunking";
import { sectionsForFile, SOURCE_FILES } from "../src/lib/sections";

const RESEARCH_DIR = join(homedir(), "Projects/vercel/interview-prep/research");
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

  if (filesToProcess.length === 0) {
    console.log("✓ Nothing to do — all files already ingested.");
    return;
  }

  console.log(`→ ${filesToProcess.length} file(s) to process.`);

  for (const filename of filesToProcess) {
    const path = join(RESEARCH_DIR, filename);
    let raw: string;
    try {
      raw = await readFile(path, "utf8");
    } catch {
      console.warn(`  ⚠ skipped (missing): ${filename}`);
      continue;
    }
    const chunks = chunkMarkdown(raw);
    const sections = sectionsForFile(filename);
    const title = deriveTitle(filename);
    console.log(`  ${filename} → ${chunks.length} chunks [${sections.join(", ")}]`);

    let embedded = 0;
    for (let i = 0; i < chunks.length; i += EMBED_BATCH) {
      const batch = chunks.slice(i, i + EMBED_BATCH);
      const embeddings = await embedWithBackoff(batch.map((c) => c.content));
      const rows = batch.map((c, idx) => ({
        sourceFile: filename,
        sourceTitle: title,
        headerPath: c.headerPath,
        sections,
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

  const [{ total }] = await db.select({ total: count() }).from(corpusChunks);
  console.log(`✓ corpus_chunks now contains ${total} rows`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
