export type Chunk = {
  content: string;
  headerPath: string[];
  tokenCount: number;
};

const APPROX_CHARS_PER_TOKEN = 3.5;
const SOFT_CAP_TOKENS = 800;
const MIN_CHUNK_TOKENS = 40;

function estimateTokens(text: string): number {
  return Math.ceil(text.length / APPROX_CHARS_PER_TOKEN);
}

type Section = {
  headerPath: string[];
  body: string;
};

function parseSections(markdown: string): Section[] {
  const lines = markdown.split("\n");
  const sections: Section[] = [];
  let currentHeaders: string[] = [];
  let currentBody: string[] = [];

  const flush = () => {
    const body = currentBody.join("\n").trim();
    if (body.length === 0) return;
    sections.push({ headerPath: [...currentHeaders], body });
    currentBody = [];
  };

  for (const line of lines) {
    const headerMatch = /^(#{1,4})\s+(.*)$/.exec(line);
    if (headerMatch) {
      flush();
      const level = headerMatch[1].length;
      const title = headerMatch[2].trim();
      currentHeaders = currentHeaders.slice(0, level - 1);
      currentHeaders[level - 1] = title;
      currentHeaders = currentHeaders.filter((h) => h !== undefined);
    } else {
      currentBody.push(line);
    }
  }
  flush();
  return sections;
}

function splitParagraphsRespectingCap(
  body: string,
  capTokens: number,
): string[] {
  const paragraphs = body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const chunks: string[] = [];
  let current: string[] = [];
  let currentTokens = 0;

  for (const para of paragraphs) {
    const t = estimateTokens(para);
    if (t > capTokens) {
      if (current.length) {
        chunks.push(current.join("\n\n"));
        current = [];
        currentTokens = 0;
      }
      chunks.push(para);
      continue;
    }
    if (currentTokens + t > capTokens && current.length) {
      chunks.push(current.join("\n\n"));
      current = [];
      currentTokens = 0;
    }
    current.push(para);
    currentTokens += t;
  }
  if (current.length) chunks.push(current.join("\n\n"));
  return chunks;
}

export function chunkMarkdown(markdown: string): Chunk[] {
  const sections = parseSections(markdown);
  const out: Chunk[] = [];

  for (const section of sections) {
    const tokens = estimateTokens(section.body);
    if (tokens < MIN_CHUNK_TOKENS) continue;

    if (tokens <= SOFT_CAP_TOKENS) {
      out.push({
        content: section.body,
        headerPath: section.headerPath,
        tokenCount: tokens,
      });
    } else {
      const pieces = splitParagraphsRespectingCap(section.body, SOFT_CAP_TOKENS);
      for (const piece of pieces) {
        const t = estimateTokens(piece);
        if (t < MIN_CHUNK_TOKENS) continue;
        out.push({
          content: piece,
          headerPath: section.headerPath,
          tokenCount: t,
        });
      }
    }
  }

  return out;
}
