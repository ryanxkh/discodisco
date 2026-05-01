import { generateText, Output, trace } from "./braintrust";
import { ParseResultSchema, type ParseResult } from "./schemas";
import { spineForPrompt } from "./spine";

const PARSE_MODEL = "anthropic/claude-haiku-4.5";

export const parseProspect = trace("parseProspect", _parseProspect);

async function _parseProspect(paste: string): Promise<ParseResult> {
  const trimmed = paste.trim();

  const system = `You are a flexible prospect-intake parser for a Vercel sales discovery tool.

Your job is to extract whatever structure you can from messy text — call transcripts, polished discovery briefs, internal notes, SDR handoffs, LinkedIn bios, casual one-liners — and return ALWAYS a prospect object plus a confidence score.

You DO NOT reject input. You parse it. If the paste is sparse, return a prospect with mostly 'Unknown' fields, set confidence='low', and list missing signal categories so the rep knows what to gather next.

Critical: a prospect on WordPress, Magento, WooCommerce, Drupal, CRA, Wix, Webflow, or any other "non-Vercel" stack is **NOT 'other-or-unclear'** — that is exactly the migration motion. Map them to 'headless-cms-migration', 'headless-commerce-migration', or 'custom-spa-migration' as appropriate. Use 'other-or-unclear' only when you cannot identify the buyer's tech context AT ALL.

Confidence rubric:
- high: company name, contact role, stage, 4+ concrete signals, at least 1 pain
- medium: company name + 2-3 signals, some Unknowns
- low: company name only, OR only 1-2 vague signals — sections will still run but should hedge

Reference spine (for ICP buckets — use these names verbatim):
${spineForPrompt()}`;

  const { output } = await generateText({
    model: PARSE_MODEL,
    output: Output.object({ schema: ParseResultSchema }),
    system,
    prompt: `Paste:\n\n${trimmed}`,
  });
  return output;
}
