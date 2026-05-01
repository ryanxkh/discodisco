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

export const BuyerTypeSchema = z.enum([
  "next-native-startup",
  "headless-cms-migration",
  "headless-commerce-migration",
  "custom-spa-migration",
  "enterprise-commerce",
  "ai-native",
  "other-or-unclear",
]);
export type BuyerType = z.infer<typeof BuyerTypeSchema>;

export const ProspectSchema = z.object({
  company: z
    .string()
    .describe(
      "Company name as stated in the paste. Use 'Unknown' only if no company name appears anywhere.",
    ),
  industry: z.string().describe("Industry / sector in 1-3 words. 'Unknown' if not inferable."),
  role: z
    .string()
    .describe(
      "Primary contact's role/title. 'Unknown' if no contact mentioned.",
    ),
  stage: z
    .string()
    .describe(
      "Company stage (e.g., 'Series B SaaS', 'mid-market enterprise', 'bootstrapped'). 'Unknown' if not clear.",
    ),
  signals: z
    .array(z.string())
    .min(0)
    .max(10)
    .describe(
      "Concrete buyer signals extracted from the paste. Can be empty if paste is sparse.",
    ),
  pains: z
    .array(z.string())
    .max(7)
    .describe("Hinted pains/problems. Empty array if none stated."),
  buyerType: BuyerTypeSchema.describe(
    "Map to one of the 6 ICP buckets in the spine, or 'other-or-unclear' if signals are insufficient. WordPress / Magento / CRA / Drupal shops are 'headless-*-migration' — NOT 'other-or-unclear'.",
  ),
});
export type Prospect = z.infer<typeof ProspectSchema>;

export const ParseResultSchema = z.object({
  prospect: ProspectSchema,
  confidence: z
    .enum(["low", "medium", "high"])
    .describe(
      "Confidence in the extracted signals. high = company+role+stage+signals+pains all present. medium = some Unknowns but enough to ground sections. low = mostly sparse, sections will hedge.",
    ),
  missingSignals: z
    .array(
      z.enum([
        "company-name",
        "industry",
        "contact-role",
        "company-stage",
        "tech-stack",
        "pain-points",
        "decision-criteria",
        "timeline",
        "budget",
        "competition",
      ]),
    )
    .max(10)
    .describe(
      "Which key signal categories are absent or weak. Used to coach the rep on what to gather next.",
    ),
});

export type ParseResult = z.infer<typeof ParseResultSchema>;

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
