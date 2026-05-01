import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { join } from "node:path";
import Firecrawl from "@mendable/firecrawl-js";

type Source = { url: string; slug: string; methodology: string };

const SOURCES: Source[] = [
  // MEDDPICC
  // Note: Force Management /offerings/meddicc page removed — it's a marketing/sales
  // page (certifications, testimonials, CTAs) not the methodology itself.
  {
    url: "https://blog.hubspot.com/sales/meddpicc-methodology",
    slug: "hubspot-meddpicc-methodology",
    methodology: "meddpicc",
  },
  {
    url: "https://meddpicc.net/meddpicc-sales-definition/",
    slug: "meddpicc-net-definition",
    methodology: "meddpicc",
  },
  {
    url: "https://meddic.academy/meddic-sales-methodology-checklist/",
    slug: "meddic-academy-checklist",
    methodology: "meddpicc",
  },
  // Command of the Message
  {
    url: "https://www.forcemanagement.com/blog/whats-the-meaning-of-command-of-the-message",
    slug: "fm-meaning-of-command-of-the-message",
    methodology: "command-of-the-message",
  },
  // Note: GitLab handbook page removed — it's a vendor-specific application
  // (GitLab differentiators, DevSecOps value drivers) not the methodology.
  // Note: Scratchpad blog removed — every example dialogue is a Scratchpad
  // product pitch about Salesforce, would contaminate Vercel discovery.
  {
    url: "https://qwilr.com/blog/command-of-the-message/",
    slug: "qwilr-command-of-the-message",
    methodology: "command-of-the-message",
  },
  // SPICED (Winning by Design)
  // Note: Winning by Design blueprint page removed — the methodology PDF is
  // gated behind a form, so Firecrawl only captured the form fields and chrome.
  {
    url: "https://www.salesenablementcollective.com/spiced-sales-methodology/",
    slug: "sec-spiced-methodology",
    methodology: "spiced",
  },
  {
    url: "https://www.highspot.com/blog/spiced-sales-methodology/",
    slug: "highspot-spiced",
    methodology: "spiced",
  },
  // Challenger Sale
  // Note: Salesforce blog removed — 60%+ chrome (country dropdowns,
  // newsletter signups, cookie banners) overwhelmed the methodology content.
  // Note: Gartner page removed — URL returned 404 "page not found".
  {
    url: "https://challengerinc.com/what-is-challenger-sales-methodology/",
    slug: "challengerinc-what-is-challenger",
    methodology: "challenger",
  },
  {
    url: "https://www.highspot.com/blog/challenger-sales-methodology/",
    slug: "highspot-challenger",
    methodology: "challenger",
  },
];

const OUT_DIR = join(process.cwd(), "data/methodology");

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
      const titleLine = `# ${src.methodology.toUpperCase()} — ${src.slug}\n\nSource: ${src.url}\n\n`;
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
