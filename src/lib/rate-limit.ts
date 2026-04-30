import { neon } from "@neondatabase/serverless";

const DAILY_LIMIT = 10;

let _sql: ReturnType<typeof neon> | null = null;
function getSql() {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");
  _sql = neon(url);
  return _sql;
}

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; remaining: 0; retryAfterSeconds: number };

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

function secondsUntilUtcMidnight(): number {
  const now = new Date();
  const tomorrow = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      0,
      0,
    ),
  );
  return Math.ceil((tomorrow.getTime() - now.getTime()) / 1000);
}

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export async function checkAndIncrement(
  ip: string,
): Promise<RateLimitResult> {
  const sql = getSql();
  const day = todayUtc();
  const rows = (await sql`
    INSERT INTO rate_limits (ip, day, count, updated_at)
    VALUES (${ip}, ${day}, 1, NOW())
    ON CONFLICT (ip, day)
    DO UPDATE SET count = rate_limits.count + 1, updated_at = NOW()
    RETURNING count
  `) as Array<{ count: number }>;
  const count = rows[0].count;
  if (count > DAILY_LIMIT) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: secondsUntilUtcMidnight(),
    };
  }
  return { ok: true, remaining: DAILY_LIMIT - count };
}
