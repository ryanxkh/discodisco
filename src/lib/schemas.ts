import { z } from "zod";

export const ModeSchema = z.enum(["ae", "sa"]);
export type Mode = z.infer<typeof ModeSchema>;

export const SectionNameSchema = z.enum([
  "snapshot",
  "discovery",
  "product-map",
  "case-study",
  "objections",
  "competitive",
]);
export type SectionName = z.infer<typeof SectionNameSchema>;

export const ProspectSchema = z.object({
  company: z.string().describe("Company name. Use 'Unknown' if not stated."),
  industry: z.string().describe("Industry / sector in 1-3 words."),
  role: z
    .string()
    .describe("Primary contact's role/title. Use 'Unknown' if not stated."),
  stage: z
    .string()
    .describe(
      "Company stage (e.g., 'Series B SaaS', 'mid-market enterprise'). 'Unknown' if not clear.",
    ),
  signals: z
    .array(z.string())
    .min(2)
    .max(7)
    .describe("Concrete buyer signals extracted from the paste."),
  pains: z
    .array(z.string())
    .max(5)
    .describe("Hinted pains/problems. Empty array if none stated."),
  buyerType: z
    .enum([
      "next-native-startup",
      "enterprise-commerce",
      "ai-native",
      "other-or-unclear",
    ])
    .describe(
      "Map to one of the 3 ICP buckets in the spine, or 'other-or-unclear'.",
    ),
});
export type Prospect = z.infer<typeof ProspectSchema>;

export const ParseResultSchema = z.object({
  ok: z
    .boolean()
    .describe(
      "True if a usable prospect could be extracted; false if the paste is too short / unparseable.",
    ),
  prospect: ProspectSchema.optional().describe(
    "The extracted prospect. Required when ok=true.",
  ),
  confidence: z
    .enum(["low", "medium", "high"])
    .optional()
    .describe(
      "Confidence in the extracted prospect signals. Required when ok=true.",
    ),
  reason: z
    .enum(["too-short", "no-company", "no-context", "garbled"])
    .optional()
    .describe("Why the paste was unusable. Required when ok=false."),
  suggestion: z
    .string()
    .optional()
    .describe(
      "Friendly 1-sentence suggestion for what to add. Required when ok=false.",
    ),
});

export type ParseResultRaw = z.infer<typeof ParseResultSchema>;
export type ParseResult =
  | { ok: true; prospect: Prospect; confidence: "low" | "medium" | "high" }
  | {
      ok: false;
      reason: "too-short" | "no-company" | "no-context" | "garbled";
      suggestion: string;
    };

export function narrowParseResult(raw: ParseResultRaw): ParseResult {
  if (raw.ok) {
    if (!raw.prospect || !raw.confidence) {
      return {
        ok: false,
        reason: "garbled",
        suggestion:
          "Model returned ok=true without a complete prospect — try resubmitting with more context.",
      };
    }
    return { ok: true, prospect: raw.prospect, confidence: raw.confidence };
  }
  return {
    ok: false,
    reason: raw.reason ?? "garbled",
    suggestion:
      raw.suggestion ??
      "Try adding company name, role, industry, and a pain point or two.",
  };
}

export const SnapshotSchema = z.object({
  buyerType: z.string(),
  topSignals: z.array(z.string()).min(3).max(7),
  buyerCommittee: z.array(z.string()).optional(),
  dealStageRead: z.string().optional(),
  icpFitConfidence: z.enum(["low", "medium", "high"]).optional(),
});

export const DiscoveryQuestionSchema = z.object({
  rank: z.number().int().min(1),
  question: z.string(),
  meddpicc: z
    .array(
      z.enum([
        "Metrics",
        "Economic-Buyer",
        "Decision-Criteria",
        "Decision-Process",
        "Paper-Process",
        "Identify-Pain",
        "Champion",
        "Competition",
      ]),
    )
    .min(1),
  spiced: z
    .array(
      z.enum(["Situation", "Pain", "Impact", "Critical-Event", "Decision"]),
    )
    .min(1),
  productAnchor: z.string(),
  goodAnswerSounds: z.string().optional(),
  followUp: z.string().optional(),
  why: z.string().optional(),
});

export const DiscoverySchema = z.object({
  questions: z.array(DiscoveryQuestionSchema).min(3).max(10),
});

export const ProductMapSchema = z.object({
  anchorProducts: z.array(z.string()).min(1).max(6),
  currentState: z.string().optional(),
  proposedArchitecture: z.string().optional(),
  rationale: z.string(),
});

export const CaseStudySchema = z.object({
  studies: z
    .array(
      z.object({
        title: z.string(),
        metric: z.string(),
        url: z.string().optional(),
        rationale: z.string().optional(),
      }),
    )
    .min(1)
    .max(3),
});

export const ObjectionsSchema = z.object({
  pushbacks: z
    .array(
      z.object({
        type: z.enum(["technical", "pricing", "political"]),
        objection: z.string(),
        response: z.string(),
      }),
    )
    .min(1)
    .max(4),
});

export const CompetitiveSchema = z.object({
  likelyCompetitor: z.string().optional(),
  differentiators: z.array(z.string()).min(0).max(5),
});

export type Snapshot = z.infer<typeof SnapshotSchema>;
export type Discovery = z.infer<typeof DiscoverySchema>;
export type ProductMap = z.infer<typeof ProductMapSchema>;
export type CaseStudy = z.infer<typeof CaseStudySchema>;
export type Objections = z.infer<typeof ObjectionsSchema>;
export type Competitive = z.infer<typeof CompetitiveSchema>;

export const SECTIONS_FOR_MODE: Record<Mode, SectionName[]> = {
  ae: ["snapshot", "discovery", "product-map", "case-study", "objections"],
  sa: [
    "snapshot",
    "discovery",
    "product-map",
    "case-study",
    "objections",
    "competitive",
  ],
};

export const SECTION_SCHEMAS = {
  snapshot: SnapshotSchema,
  discovery: DiscoverySchema,
  "product-map": ProductMapSchema,
  "case-study": CaseStudySchema,
  objections: ObjectionsSchema,
  competitive: CompetitiveSchema,
} as const;
