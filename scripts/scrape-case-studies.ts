import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { join } from "node:path";
import Firecrawl from "@mendable/firecrawl-js";

type Source = { url: string; slug: string; profile: string };

const SOURCES: Source[] = [
  // Enterprise commerce (replatforming)
  {
    url: "https://vercel.com/customers/how-sonos-amplified-their-devex",
    slug: "sonos-devex",
    profile: "enterprise-commerce",
  },
  {
    url: "https://vercel.com/blog/how-paige-grew-revenue-by-22-with-shopify-next-js-and-vercel",
    slug: "paige-shopify-bfcm",
    profile: "enterprise-commerce",
  },
  {
    url: "https://vercel.com/customers/desenio",
    slug: "desenio-conversion",
    profile: "enterprise-commerce",
  },
  {
    url: "https://vercel.com/blog/how-ruggable-saw-more-organic-clicks-by-optimizing-their-frontend",
    slug: "ruggable-headless-shopify",
    profile: "enterprise-commerce",
  },
  // AI-native startups
  {
    url: "https://vercel.com/customers/leonardo-ai-performantly-generates-4-5-million-images-daily-with-next-js-and-vercel",
    slug: "leonardo-ai-images",
    profile: "ai-native",
  },
  {
    url: "https://vercel.com/blog/360-billion-tokens-3-million-customers-6-engineers",
    slug: "durable-ai-saas",
    profile: "ai-native",
  },
  {
    url: "https://vercel.com/blog/how-zo-computer-improved-ai-reliability-20x-on-vercel",
    slug: "zo-computer-ai-gateway",
    profile: "ai-native",
  },
  {
    url: "https://vercel.com/blog/serhants-playbook-for-rapid-ai-iteration",
    slug: "serhant-ai-real-estate",
    profile: "ai-native",
  },
  {
    url: "https://vercel.com/blog/how-openevidence-built-a-healthcare-ai-that-physicians-can-trust",
    slug: "openevidence-healthcare-ai",
    profile: "ai-native",
  },
  // Media / publishing
  {
    url: "https://vercel.com/blog/from-newsletter-to-global-media-brand-with-a-headless-frontend",
    slug: "morning-brew-headless-media",
    profile: "media-publishing",
  },
  {
    url: "https://vercel.com/blog/motortrend-shifting-into-overdrive-with-vercel",
    slug: "motortrend-deploy-velocity",
    profile: "media-publishing",
  },
  // Fintech / financial services
  {
    url: "https://vercel.com/blog/neo-financial",
    slug: "neo-financial-aws-migration",
    profile: "fintech",
  },
  {
    url: "https://vercel.com/customers/architecting-reliability-stripes-black-friday-site",
    slug: "stripe-black-friday",
    profile: "fintech",
  },
  // Headless WordPress migration
  {
    url: "https://vercel.com/customers/hydrow",
    slug: "hydrow-wordpress-headless",
    profile: "headless-wordpress",
  },
  // Custom React SPA → Next.js
  {
    url: "https://vercel.com/blog/incrementally-adopting-next-js-at-one-of-europes-fastest-growing-brands",
    slug: "remarkable-gatsby-to-next",
    profile: "custom-spa-migration",
  },
  // Next.js native startups scaling
  {
    url: "https://vercel.com/blog/how-hashicorp-developers-iterate-faster-with-isr",
    slug: "hashicorp-isr-docs",
    profile: "next-native-scaling",
  },
  {
    url: "https://vercel.com/blog/mintlify-scaling-a-powerful-documentation-platform-with-vercel",
    slug: "mintlify-multi-tenant-docs",
    profile: "next-native-scaling",
  },
  // Other / B2B
  {
    url: "https://vercel.com/customers/managing-major-traffic-spikes-during-ticket-drops-with-vercel",
    slug: "shotgun-traffic-spikes",
    profile: "other",
  },
];

const OUT_DIR = join(process.cwd(), "data/case-studies");

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
      if (!md || md.length < 800) {
        results.push({ slug: src.slug, status: "too-short", bytes: md.length });
        const preview = md.slice(0, 160).replace(/\s+/g, " ");
        console.warn(
          `  ⚠  ${src.slug} too short (${md.length} bytes), skipping — preview: ${preview}`,
        );
        continue;
      }
      const titleLine = `# CASE STUDY — ${src.slug}\n\nProfile: ${src.profile}\nSource: ${src.url}\n\n`;
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
