import { readFileSync } from "node:fs";
import { join } from "node:path";

export type SpineCard = {
  id: string;
  type: "product" | "icp" | "case-study" | "objection-bank" | "competitive" | "methodology";
  title: string;
  one_liner: string;
  facts: string[];
  use_when: string;
};

export type Spine = {
  version: string;
  updated: string;
  note: string;
  cards: SpineCard[];
};

let _spine: Spine | null = null;

export function getSpine(): Spine {
  if (_spine) return _spine;
  const path = join(process.cwd(), "data/knowledge-spine.json");
  _spine = JSON.parse(readFileSync(path, "utf8")) as Spine;
  return _spine;
}

export function spineForPrompt(): string {
  const spine = getSpine();
  return spine.cards
    .map(
      (c) =>
        `## ${c.title}\n${c.one_liner}\n${c.facts.map((f) => `- ${f}`).join("\n")}\n_Use when:_ ${c.use_when}`,
    )
    .join("\n\n");
}
