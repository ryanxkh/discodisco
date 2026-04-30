import { parseProspect } from "./parse";
import { generateSection } from "./generate";
import {
  SECTIONS_FOR_MODE,
  type Mode,
  type Prospect,
  type SectionName,
} from "./schemas";

export type StreamEvent =
  | { type: "parsed"; prospect: Prospect; confidence: "low" | "medium" | "high" }
  | {
      type: "parse_error";
      reason: "too-short" | "no-company" | "no-context" | "garbled";
      suggestion: string;
    }
  | { type: "plan"; sections: SectionName[] }
  | {
      type: "section";
      name: SectionName;
      data: unknown;
      citations: Array<{ sourceFile: string; sourceTitle: string }>;
    }
  | { type: "section_error"; name: SectionName; error: string }
  | { type: "done" };

export async function* runPipeline(
  paste: string,
  mode: Mode,
): AsyncGenerator<StreamEvent> {
  const parsed = await parseProspect(paste);
  if (!parsed.ok) {
    yield {
      type: "parse_error",
      reason: parsed.reason,
      suggestion: parsed.suggestion,
    };
    return;
  }
  yield { type: "parsed", prospect: parsed.prospect, confidence: parsed.confidence };

  const sections = SECTIONS_FOR_MODE[mode];
  yield { type: "plan", sections };

  // Fan out section generation in parallel and yield as each settles.
  const tasks = sections.map((name) =>
    generateSection(name, parsed.prospect, mode)
      .then((res) => ({ ok: true as const, res }))
      .catch((err: unknown) => ({
        ok: false as const,
        name,
        error: err instanceof Error ? err.message : String(err),
      })),
  );

  const pending = new Set(tasks);
  while (pending.size > 0) {
    const settled = await Promise.race(
      [...pending].map((p) => p.then((v) => ({ p, v }))),
    );
    pending.delete(settled.p);
    const v = settled.v;
    if (v.ok) {
      yield {
        type: "section",
        name: v.res.name,
        data: v.res.data,
        citations: v.res.citations,
      };
    } else {
      yield { type: "section_error", name: v.name, error: v.error };
    }
  }

  yield { type: "done" };
}
