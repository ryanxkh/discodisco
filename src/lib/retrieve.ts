import { setTimeout as sleep } from "node:timers/promises";
import { neon } from "@neondatabase/serverless";
import { embed } from "./braintrust";
import type { Prospect, SectionName } from "./schemas";

export type RetrievedChunk = {
  id: string;
  sourceFile: string;
  sourceTitle: string;
  headerPath: string[] | null;
  sections: string[];
  content: string;
};

const EMBED_MODEL = "openai/text-embedding-3-small";
const TOP_K_PER_SECTION: Record<SectionName, number> = {
  snapshot: 0,
  discovery: 0,
  "product-map": 6,
  "case-study": 4,
  objections: 5,
  competitive: 5,
};

let _sql: ReturnType<typeof neon> | null = null;
function getSql() {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");
  _sql = neon(url);
  return _sql;
}

function queryFor(prospect: Prospect, section: SectionName): string {
  const base = `${prospect.company} (${prospect.industry}) — ${prospect.role}, ${prospect.stage}. Signals: ${prospect.signals.join("; ")}. Pains: ${prospect.pains.join("; ") || "none stated"}.`;
  switch (section) {
    case "product-map":
      return `${base}\nVercel products and architecture relevant to this buyer.`;
    case "case-study":
      return `${base}\nClosest Vercel customer case study by industry, stage, and use case.`;
    case "objections":
      return `${base}\nLikely objections and pushbacks for this buyer profile.`;
    case "competitive":
      return `${base}\nLikely competitor and differentiators relevant to this buyer.`;
    default:
      return base;
  }
}

async function embedWithBackoff(value: string): Promise<number[]> {
  let attempt = 0;
  const max = 4;
  while (true) {
    try {
      const { embedding } = await embed({ model: EMBED_MODEL, value });
      return embedding;
    } catch (err) {
      attempt++;
      const e = err as { statusCode?: number };
      if (e.statusCode !== 429 || attempt >= max) throw err;
      await sleep(Math.min(15_000, 1_500 * 2 ** (attempt - 1)));
    }
  }
}

export async function retrieveForSection(
  prospect: Prospect,
  section: SectionName,
): Promise<RetrievedChunk[]> {
  const k = TOP_K_PER_SECTION[section];
  if (k === 0) return [];

  const embedding = await embedWithBackoff(queryFor(prospect, section));
  const queryVec = `[${embedding.join(",")}]`;

  const sqlClient = getSql();
  const rows = await sqlClient`
    SELECT id::text, source_file AS "sourceFile", source_title AS "sourceTitle",
           header_path AS "headerPath", sections, content
    FROM corpus_chunks
    WHERE ${section}::text = ANY(sections)
    ORDER BY embedding <=> ${queryVec}::vector
    LIMIT ${k}
  `;
  return rows as unknown as RetrievedChunk[];
}

export function chunksForPrompt(chunks: RetrievedChunk[]): string {
  return chunks
    .map(
      (c, i) =>
        `[${i + 1}] ${c.sourceTitle} — ${(c.headerPath ?? []).join(" › ")}\n${c.content}`,
    )
    .join("\n\n---\n\n");
}
