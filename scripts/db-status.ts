import { neon } from "@neondatabase/serverless";

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const r = await sql`
    SELECT source_file, COUNT(*)::int AS n
    FROM corpus_chunks GROUP BY source_file ORDER BY source_file
  `;
  for (const x of r) console.log(`  ${x.source_file}: ${x.n}`);
  const [{ total }] = await sql`SELECT COUNT(*)::int AS total FROM corpus_chunks`;
  console.log(`TOTAL: ${total}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
