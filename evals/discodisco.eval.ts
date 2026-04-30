import { z } from "zod";
import { Eval } from "braintrust";
import { generateText, Output } from "../src/lib/braintrust";
import { runPipeline } from "../src/lib/pipeline";
import type { Mode, SectionName } from "../src/lib/schemas";

type EvalInput = { paste: string; mode: Mode };
type EvalOutput = {
  prospect?: unknown;
  parseError?: { reason: string; suggestion: string };
  sections: Partial<Record<SectionName, unknown>>;
  errors: Array<{ name: SectionName; error: string }>;
};

const JUDGE_MODEL = "anthropic/claude-haiku-4.5";

const cases: Array<{
  input: EvalInput;
  metadata: { profile: string; expectedBuyerType: string };
}> = [
  {
    input: {
      mode: "sa",
      paste:
        "Met with Sarah Chen, VP Engineering at Glide AI (Series B, ~80 engineers, ~$30M raised). Building an AI customer-support agent product. Pain: AWS Lambda bill exploded last quarter — long LLM tool calls paying for idle wait. Staging envs take ~25 min to spin up. On Next.js 14 self-hosted on EKS. Champion: head of platform eng. Evaluating Cloudflare Workers vs. self-hosted.",
    },
    metadata: { profile: "ai-native-series-b", expectedBuyerType: "ai-native" },
  },
  {
    input: {
      mode: "ae",
      paste:
        "Acme Retail. ~600 stores nationwide, NYSE listed. Frontend team is 12 engineers stuck on Next.js Pages Router. Last Black Friday: site degraded for 4 hours, lost an estimated $1.4M in conversions. Director of Digital is asking how to never repeat that. They're also evaluating Cloudflare Pages.",
    },
    metadata: {
      profile: "enterprise-commerce-bf-burned",
      expectedBuyerType: "enterprise-commerce",
    },
  },
  {
    input: {
      mode: "sa",
      paste:
        "Hopper, fintech Series A, ~25 engineers. Lead: David Kim, Staff Engineer (founding eng). Building a savings/budgeting product. They're on Next.js 15 deployed on Render. Pains: deploy times getting long (~9 min), no good preview environments, started feeling AWS-curious for control. Hesitating on the cost of leaving Render.",
    },
    metadata: {
      profile: "next-native-growth-startup",
      expectedBuyerType: "next-native-startup",
    },
  },
  {
    input: {
      mode: "ae",
      paste:
        "Heard from SDR there might be a Vercel opportunity at NorthLight, a logistics company. Not much else. They asked about pricing.",
    },
    metadata: {
      profile: "low-info-paste-tests-confidence",
      expectedBuyerType: "other-or-unclear",
    },
  },
  {
    input: {
      mode: "sa",
      paste:
        "Drift Inc — B2B SaaS, ~250 engineers. Their main customer-facing app is a 6-year-old Create React App SPA hosted on AWS S3 + CloudFront with a Node API on EKS. Engineering leadership wants to migrate to Next.js for SEO + perf. They've heard about Vercel but nervous about the migration cost. Champion: VP Eng. Critical event: they want to start migration in Q3 and have a Black Friday-equivalent peak shopping season in November.",
    },
    metadata: {
      profile: "cra-to-nextjs-migration",
      expectedBuyerType: "next-native-startup",
    },
  },
];

async function runOnce(input: EvalInput): Promise<EvalOutput> {
  const out: EvalOutput = { sections: {}, errors: [] };
  for await (const ev of runPipeline(input.paste, input.mode)) {
    switch (ev.type) {
      case "parsed":
        out.prospect = ev.prospect;
        break;
      case "parse_error":
        out.parseError = { reason: ev.reason, suggestion: ev.suggestion };
        break;
      case "section":
        out.sections[ev.name] = ev.data;
        break;
      case "section_error":
        out.errors.push({ name: ev.name, error: ev.error });
        break;
    }
  }
  return out;
}

const ALL_MEDDPICC = [
  "Metrics",
  "Economic-Buyer",
  "Decision-Criteria",
  "Decision-Process",
  "Paper-Process",
  "Identify-Pain",
  "Champion",
  "Competition",
];
const ALL_SPICED = ["Situation", "Pain", "Impact", "Critical-Event", "Decision"];

function meddpiccCoverage({ output }: { output: EvalOutput }) {
  const discovery = output.sections.discovery as
    | { questions: Array<{ meddpicc: string[] }> }
    | undefined;
  if (!discovery?.questions?.length) {
    return { name: "meddpicc-coverage", score: 0 };
  }
  const seen = new Set<string>();
  for (const q of discovery.questions) for (const t of q.meddpicc) seen.add(t);
  return { name: "meddpicc-coverage", score: seen.size / ALL_MEDDPICC.length };
}

function spicedCoverage({ output }: { output: EvalOutput }) {
  const discovery = output.sections.discovery as
    | { questions: Array<{ spiced: string[] }> }
    | undefined;
  if (!discovery?.questions?.length) {
    return { name: "spiced-coverage", score: 0 };
  }
  const seen = new Set<string>();
  for (const q of discovery.questions) for (const t of q.spiced) seen.add(t);
  return { name: "spiced-coverage", score: seen.size / ALL_SPICED.length };
}

const ChoiceSchema = z.object({
  reasoning: z.string(),
  choice: z.enum(["A", "B", "C", "D", "E"]),
});
const CHOICE_SCORES = { A: 1, B: 0.8, C: 0.6, D: 0.3, E: 0 } as const;

async function judge(prompt: string, system: string) {
  const { output } = await generateText({
    model: JUDGE_MODEL,
    output: Output.object({ schema: ChoiceSchema }),
    system,
    prompt,
  });
  return {
    score: CHOICE_SCORES[output.choice],
    metadata: { choice: output.choice, reasoning: output.reasoning },
  };
}

async function specificity({ output }: { output: EvalOutput }) {
  if (output.parseError) return { name: "specificity", score: null };
  const sectionsText = JSON.stringify(output.sections, null, 2);
  const system = `You are auditing a Vercel sales-prep packet. Decide whether the model produced SPECIFIC, defensible content vs. generic SaaS-speak.

Specific = mentions real Vercel features (Fluid Compute, Active CPU, AI Gateway, AI SDK, ISR, Routing Middleware, v0, Sandbox, Workflow), real customers (Gamma, Cruise Critic, Helly Hansen, Stripe, Notion, Forrester TEI), or concrete numbers (45B weekly requests, 264% ROI, 80% YoY, $200M ARR, $0.128/CPU-hr, etc.).
Generic = vague phrases like "improve performance", "increase developer velocity", "modern infrastructure" without anchoring to a real Vercel artifact or number.

A: Highly specific — multiple real features/customers/numbers cited; no generic filler.
B: Mostly specific — at least one real feature/customer/number, minor generic phrases.
C: Mixed — some specific anchors but noticeable generic SaaS-speak.
D: Mostly generic — only one weak anchor, lots of filler.
E: Entirely generic — no specific Vercel anchors at all.`;
  const result = await judge(`PACKET:\n${sectionsText}`, system);
  return {
    name: "specificity",
    score: result.score,
    metadata: result.metadata,
  };
}

async function faithfulness({ output }: { output: EvalOutput }) {
  if (output.parseError || !output.prospect) {
    return { name: "faithfulness", score: null };
  }
  const sectionsText = JSON.stringify(output.sections, null, 2);
  const prospectText = JSON.stringify(output.prospect, null, 2);
  const system = `You are auditing whether a Vercel sales-prep packet is FAITHFUL to the parsed prospect facts. Does the packet make claims about the prospect that are not in the parsed facts? Does it invent numbers, decisions, or stakeholders?

A: Fully faithful — every prospect-related claim traces back to the parsed facts; reasonable extrapolations where labeled as such.
B: Mostly faithful — minor extrapolations but no unsupported invented facts about the prospect.
C: Mixed — at least one claim about the prospect that isn't supported by the parsed facts.
D: Significant fabrication — multiple invented details about the prospect's situation.
E: Hallucinated — packet describes a prospect that doesn't match the input.`;
  const result = await judge(
    `PARSED PROSPECT:\n${prospectText}\n\nPACKET:\n${sectionsText}`,
    system,
  );
  return {
    name: "faithfulness",
    score: result.score,
    metadata: result.metadata,
  };
}

void Eval<EvalInput, EvalOutput, void, { profile: string; expectedBuyerType: string }>(
  "discodisco",
  {
    data: () =>
      cases.map((c) => ({ input: c.input, metadata: c.metadata })),
    task: (input) => runOnce(input),
    scores: [meddpiccCoverage, spicedCoverage, specificity, faithfulness],
    experimentName: "baseline",
  },
);
