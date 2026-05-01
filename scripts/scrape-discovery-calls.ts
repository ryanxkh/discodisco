import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { join } from "node:path";
import Firecrawl from "@mendable/firecrawl-js";

type Source = { url: string; slug: string; quality: number };

// URLs verified by web-intelligence-specialist; quality score 1-5 where
// 4-5 = mostly real rep/prospect dialogue, 3 = framework with real examples,
// 2 = research-backed phrasings without dialogue. Quality <3 dropped.
const SOURCES: Source[] = [
  {
    url: "https://www.30mpc.com/newsletter/how-to-ask-discovery-questions-ft-charles-muhlbauer",
    slug: "30mpc-muhlbauer-discovery",
    quality: 4,
  },
  {
    url: "https://www.30mpc.com/newsletter/4-ways-to-run-discovery-like-a-conversation-not-an-interrogation",
    slug: "30mpc-conversation-not-interrogation",
    quality: 4,
  },
  {
    url: "https://www.30mpc.com/newsletter/the-8-discovery-questions-that-got-me-to-presidents-club",
    slug: "30mpc-8-discovery-questions",
    quality: 3,
  },
  {
    url: "https://www.gong.io/blog/best-discovery-call-tips",
    slug: "gong-best-discovery-tips",
    quality: 3,
  },
  {
    url: "https://www.gong.io/blog/deal-closing-discovery-call",
    slug: "gong-deal-closing-discovery",
    quality: 3,
  },
  {
    url: "https://www.30mpc.com/newsletter/breakdown-30mpc-discovery-trees",
    slug: "30mpc-discovery-trees",
    quality: 3,
  },
];

const OUT_DIR = join(process.cwd(), "data/discovery-calls");

async function exists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) throw new Error("FIRECRAWL_API_KEY not set");
  await mkdir(OUT_DIR, { recursive: true });
  const fc = new Firecrawl({ apiKey });

  const results: Array<{ slug: string; status: string; bytes?: number }> = [];

  for (const src of SOURCES) {
    const filePath = join(OUT_DIR, `${src.slug}.md`);
    if (await exists(filePath)) {
      const existing = await readFile(filePath, "utf8");
      results.push({
        slug: src.slug,
        status: "skip-cached",
        bytes: existing.length,
      });
      console.log(`  ⏭  ${src.slug} (cached, ${existing.length} bytes)`);
      continue;
    }
    try {
      const doc = await fc.scrape(src.url, {
        formats: ["markdown"],
        onlyMainContent: true,
      });
      const md = doc.markdown ?? "";
      if (!md || md.length < 500) {
        results.push({ slug: src.slug, status: "too-short", bytes: md.length });
        const preview = md.slice(0, 160).replace(/\s+/g, " ");
        console.warn(
          `  ⚠  ${src.slug} too short (${md.length} bytes), skipping — preview: ${preview}`,
        );
        continue;
      }
      const titleLine = `# DISCOVERY CALL — ${src.slug}\n\nQuality: ${src.quality}/5\nSource: ${src.url}\n\n`;
      await writeFile(filePath, titleLine + md, "utf8");
      results.push({ slug: src.slug, status: "ok", bytes: md.length });
      console.log(`  ✓ ${src.slug} (${md.length} bytes)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      results.push({ slug: src.slug, status: `error: ${msg.slice(0, 80)}` });
      console.warn(`  ✗ ${src.slug}: ${msg.slice(0, 100)}`);
    }
  }

  console.log("\n=== Summary ===");
  const ok = results.filter((r) => r.status === "ok").length;
  const cached = results.filter((r) => r.status === "skip-cached").length;
  const failed = results.length - ok - cached;
  console.log(`  ok: ${ok}, cached: ${cached}, failed: ${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
