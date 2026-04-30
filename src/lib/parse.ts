import { generateText, Output } from "ai";
import {
  ParseResultSchema,
  narrowParseResult,
  type ParseResult,
} from "./schemas";
import { spineForPrompt } from "./spine";

const PARSE_MODEL = "anthropic/claude-haiku-4.5";

export async function parseProspect(paste: string): Promise<ParseResult> {
  const trimmed = paste.trim();
  if (trimmed.length < 80) {
    return {
      ok: false,
      reason: "too-short",
      suggestion:
        "Paste is too short — add company name, role, industry, and any pain points or context from the call/email.",
    };
  }

  const system = `You are a prospect-intake parser for a Vercel sales discovery tool.
Extract structured prospect facts from the user's paste. Map the buyer to one of the 3 spine ICP buckets.
Return ok=true with prospect + confidence ('low' | 'medium' | 'high'), or ok=false with a reason and a 1-sentence suggestion if the paste is unusable (too short, no clear company, no business context, garbled).
Do not invent facts. If a field is unstated, mark it 'Unknown'.

Reference spine (for ICP buckets):
${spineForPrompt()}`;

  const { output } = await generateText({
    model: PARSE_MODEL,
    output: Output.object({ schema: ParseResultSchema }),
    system,
    prompt: `Paste:\n\n${trimmed}`,
  });
  return narrowParseResult(output);
}
