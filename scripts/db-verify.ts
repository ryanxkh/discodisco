import { neon } from "@neondatabase/serverless";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");
  const sql = neon(url);

  const tables = await sql`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' ORDER BY table_name
  `;
  console.log("Tables:", tables.map((t) => t.table_name).join(", "));

  const indexes = await sql`
    SELECT indexname, indexdef FROM pg_indexes
    WHERE schemaname = 'public' AND indexname LIKE 'corpus_chunks%'
    ORDER BY indexname
  `;
  console.log("Vector indexes:");
  for (const i of indexes) console.log(" -", i.indexname);

  const ext = await sql`
    SELECT extname FROM pg_extension WHERE extname = 'vector'
  `;
  console.log("vector extension:", ext.length > 0 ? "✓" : "✗");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
