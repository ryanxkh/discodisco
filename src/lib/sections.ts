export type Section =
  | "product-map"
  | "case-study"
  | "objections"
  | "competitive"
  | "discovery";

export const ALL_SECTIONS: Section[] = [
  "product-map",
  "case-study",
  "objections",
  "competitive",
  "discovery",
];

export function sectionsForFile(filename: string): Section[] {
  if (filename.includes("honest-criticisms")) return ["objections"];
  if (filename.includes("competitive-analysis"))
    return ["competitive", "objections"];
  if (
    filename.includes("vercel-customer-case-studies") ||
    /-vercel-case-study\.md$/.test(filename) ||
    filename.includes("cra-to-nextjs-migration")
  ) {
    return ["case-study"];
  }
  if (
    filename.includes("sa-breakdown") ||
    filename.includes("sa-playbook") ||
    filename.includes("sa-value-prop")
  ) {
    return ["product-map", "objections"];
  }
  return ["product-map"];
}

export const SOURCE_FILES = [
  "2026-02-21-ai-gateway-sa-breakdown.md",
  "2026-02-21-ai-sdk-sa-breakdown.md",
  "2026-02-21-fluid-compute-sa-breakdown.md",
  "2026-02-21-pages-to-agents-pixels-to-tokens.md",
  "2026-02-21-self-driving-infrastructure.md",
  "2026-02-21-v0-sa-value-prop.md",
  "2026-02-21-vercel-aws-sa-breakdown.md",
  "2026-02-21-vercel-pricing-sa-playbook.md",
  "2026-03-12-vercel-customer-case-studies.md",
  "2026-03-12-vercel-honest-criticisms-panel-prep.md",
  "2026-03-12-vercel-vs-amplify-competitive-analysis.md",
  "2026-03-12-vercel-vs-cloudflare-competitive-analysis.md",
  "2026-03-12-vercel-vs-netlify-competitive-analysis.md",
  "2026-03-13-ai-products-deep-dive.md",
  "2026-03-13-ai-sdk-6-release.md",
  "2026-03-13-cdn-request-collapsing.md",
  "2026-03-13-cruise-critic-vercel-case-study.md",
  "2026-03-13-deployments-builds-rollback-deep-dive.md",
  "2026-03-13-gamma-vercel-case-study.md",
  "2026-03-13-grep-cra-to-nextjs-migration.md",
  "2026-03-13-nextjs-on-vercel-vs-self-hosted.md",
  "2026-03-13-stably-vercel-case-study.md",
  "2026-03-13-vercel-caching-isr-deep-dive.md",
  "2026-03-13-vercel-functions-complete-technical-reference.md",
  "2026-03-13-vercel-limits-pricing-deep-dive.md",
  "2026-03-13-vercel-security-compliance-enterprise-deep-dive.md",
];
