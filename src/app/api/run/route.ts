import { NextRequest } from "next/server";
import { z } from "zod";
import { runPipeline } from "@/lib/pipeline";
import { ModeSchema } from "@/lib/schemas";
import { checkAndIncrement, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 90;

const RequestSchema = z.object({
  paste: z.string().min(30, "Paste at least a sentence of context."),
  mode: ModeSchema,
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "invalid_request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const { paste, mode } = parsed.data;

  const ip = getClientIp(req);
  const limit = await checkAndIncrement(ip);
  if (!limit.ok) {
    return Response.json(
      {
        error: "rate_limited",
        message:
          "You've used your 10 runs for today. The limit resets at UTC midnight.",
        retryAfterSeconds: limit.retryAfterSeconds,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.retryAfterSeconds),
        },
      },
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of runPipeline(paste, mode)) {
          controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
        }
      } catch (err) {
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              type: "section_error",
              name: "snapshot",
              error: err instanceof Error ? err.message : "unknown error",
            }) + "\n",
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
