import {
  generateText,
  Output,
  trace,
  type FlexibleSchema,
} from "./braintrust";
import {
  SECTION_SCHEMAS,
  type Mode,
  type Prospect,
  type SectionName,
} from "./schemas";
import { spineForPrompt } from "./spine";
import {
  chunksForPrompt,
  retrieveForSection,
  type RetrievedChunk,
} from "./retrieve";

const GEN_MODEL = "anthropic/claude-sonnet-4.6";

const SECTION_INSTRUCTIONS: Record<SectionName, (mode: Mode) => string> = {
  snapshot: (mode) =>
    `Produce the prospect snapshot.
- buyerType: a 1-line buyer-type read (e.g., "Series B AI-native startup, founder-led GTM").
- topSignals: ${mode === "ae" ? "the 3 highest-signal observations" : "5–7 observations"} grounded in the parsed prospect + paste.
${mode === "sa" ? "- buyerCommittee: likely roles in the buying group (3–5 entries).\n- dealStageRead: 1-line read on stage (cold, warm, qualified, evaluating, etc.).\n- icpFitConfidence: low | medium | high based on signal density and ICP-bucket match." : "- Leave buyerCommittee, dealStageRead, icpFitConfidence undefined (AE mode is concise)."}`,

  discovery: (mode) =>
    `Produce ${mode === "ae" ? "5 ranked" : "7–9 ranked"} discovery questions.
Every question MUST be dual-tagged with at least one MEDDPICC entry AND at least one SPICED entry. Use ONLY the values listed in the schema.
Anchor each question to a specific Vercel product or value (productAnchor).
${mode === "sa" ? "For each question include goodAnswerSounds (what a strong reply sounds like), followUp (next question if the answer is rich), and why (1-line coaching note on what skilled-listening signal to listen for)." : "AE mode: leave goodAnswerSounds, followUp, why undefined."}
If a question can't be tagged in either methodology, drop it.`,

  "product-map": (mode) =>
    mode === "ae"
      ? `Produce 1–2 anchor products that should be the primary thread of the conversation, with a short rationale.`
      : `Produce a full architecture sketch:
- anchorProducts: 3–6 products (Fluid Compute, Cache Components, AI Gateway, AI SDK, v0, Sandbox, Workflow, etc.) relevant to this prospect.
- currentState: 2–4 sentences describing what the prospect is likely doing today (be concrete from signals).
- proposedArchitecture: 4–8 sentences (markdown ok) describing the proposed Vercel-native architecture.
- rationale: 1–2 sentences linking the architecture to the prospect's pains/signals.`,

  "case-study": (mode) =>
    mode === "ae"
      ? `Pick the SINGLE best-matched case study (1 entry). Include title, punchline metric, and url if you have one. Skip rationale.`
      : `Pick the top 3 best-matched case studies. For each: title, punchline metric, url if known, and a 1-sentence rationale on why it matches this prospect.`,

  objections: (mode) =>
    mode === "ae"
      ? `Pick the SINGLE most-likely pushback for this buyer profile (1 entry). Include type (technical | pricing | political), the objection, and the response.`
      : `Surface 3 likely pushbacks: ideally one technical, one pricing, one political. Each with type, objection, and response. Be specific — name real concerns from the retrieved context (CVE, pricing horror stories, vendor lock-in, etc.) when they fit.`,

  competitive: () =>
    `SE/SA mode only. Identify the most-likely competitor for this deal and list 2–3 specific differentiators Vercel should lead with. If competitor is genuinely unknown, leave likelyCompetitor undefined and provide differentiators that would matter regardless.`,
};

export type SectionResult = {
  name: SectionName;
  data: unknown;
  citations: Array<{ sourceFile: string; sourceTitle: string }>;
};

export const generateSection = trace("generateSection", _generateSection);

async function _generateSection(
  section: SectionName,
  prospect: Prospect,
  mode: Mode,
  confidence: "low" | "medium" | "high" = "high",
): Promise<SectionResult> {
  const chunks = await retrieveForSection(prospect, section);
  const instructions = SECTION_INSTRUCTIONS[section](mode);
  const schema = SECTION_SCHEMAS[section];

  const system = `You are a Vercel sales-coach generating ONE section of a discovery prep packet for a real sales rep.
Mode: ${mode === "ae" ? "AE — fast, concise, copy-paste-friendly" : "SE/SA — depth, product-mapped, exportable"}.

Always-in-context spine (treat as ground truth):
${spineForPrompt()}

${chunks.length > 0 ? `Section-scoped retrieved context (use these facts; cite via natural phrasing — do NOT include URLs unless given):\n\n${chunksForPrompt(chunks)}\n\n` : ""}Parser confidence in the prospect: **${confidence}**.
${confidence === "low" ? "The paste was sparse. DO NOT invent specific numbers, headcounts, deal stages, committee members, dates, or critical events that aren't in the prospect facts. Hedge ('likely', 'often in deals like this'). For unclear buyer types, lean into questions that REVEAL Vercel fit rather than assuming it. Returning fewer items > fabricated ones." : confidence === "medium" ? "Mixed signal density. Stick to facts in the prospect; mark inferences with hedge language ('likely', 'in similar deals')." : "Strong signal density. You can be specific — but never invent prospect-specific facts (headcounts, committee names, exact dates) that aren't grounded in the parsed facts."}

**Anti-invention rules (HARD — applies to ALL sections):**
The parsed prospect facts are the ONLY source of truth about THIS buyer. Never assert any of the following unless it's literally in the parsed facts or quoted in the paste:
- Specific named stakeholders or champions ("the CTO is John", "VP Eng is the EB")
- Numeric specifics about the prospect: headcount, ARR, deal size, build times, traffic, conversion rates, % numbers
- Specific dates, deadlines, quarters, or critical events
- Named competitors the prospect is evaluating ("they're looking at Cloudflare and Netlify")
- Internal decisions the prospect has made ("they've already chosen to migrate", "they've ruled out X")
- Procurement, security, or legal review steps the prospect runs

If a fact isn't in the parsed prospect, EITHER omit it OR phrase it as a question/hypothesis ("likely", "often see in similar deals", "worth confirming whether…"). Generic Vercel facts (features, real customer outcomes from the spine/corpus) are fine — but anchoring them to THIS prospect's situation requires real signals.

**Discovery-specific:** Questions ASK, they don't ASSUME. "Who's the economic buyer?" is correct; "Confirm with the VP Eng (EB) that…" is wrong unless the VP Eng was named as EB. If you can't tag a question with MEDDPICC+SPICED without inventing facts, change the question — don't fabricate the framing.

**Objections-specific:** Pick objections that match the buyer's STATED scale and stage. Don't choose enterprise procurement objections for an unconfirmed startup, or startup-pricing objections for a stated enterprise.

**Case-study-specific:** Match on real signals (industry, stage, technical migration motion). If no case study in the corpus is a strong match, pick the closest one and explicitly hedge ("closest analog by motion, though industry differs"). Do not invent customer outcomes that aren't in the corpus.

Other rules:
- Ground claims in the spine + retrieved context. If a fact isn't supported, omit it.
- A prospect on WordPress / Magento / WooCommerce / Drupal / CRA / etc. is a migration motion, not a disqualification. Lean into the headless / migration angle when the buyerType is one of the *-migration buckets.
- Do not leak content tagged 'objections' into other sections.
- Be specific about VERCEL features, customers, and numbers (the spine and corpus are full of real ones). Be hedged about the prospect's specifics unless they're stated.
- Output MUST conform to the schema.

**Self-check before returning:** For each claim about the prospect, ask "Is this in the parsed facts?" If not, either remove it, hedge it heavily, or convert it to a question.`;

  const userPrompt = `Section: ${section}
Prospect:
${JSON.stringify(prospect, null, 2)}

Instructions for this section:
${instructions}`;

  const { output } = await generateText({
    model: GEN_MODEL,
    output: Output.object({ schema: schema as FlexibleSchema<unknown> }),
    system,
    prompt: userPrompt,
  });

  return {
    name: section,
    data: output,
    citations: chunks.map((c) => ({
      sourceFile: c.sourceFile,
      sourceTitle: c.sourceTitle,
    })),
  };
}
