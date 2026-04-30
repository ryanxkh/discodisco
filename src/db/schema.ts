import {
  pgTable,
  text,
  timestamp,
  integer,
  date,
  uuid,
  jsonb,
  index,
  primaryKey,
} from "drizzle-orm/pg-core";
import { vector } from "drizzle-orm/pg-core";

export const corpusChunks = pgTable(
  "corpus_chunks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sourceFile: text("source_file").notNull(),
    sourceTitle: text("source_title").notNull(),
    headerPath: text("header_path").array(),
    sections: text("sections").array().notNull(),
    content: text("content").notNull(),
    tokenCount: integer("token_count"),
    embedding: vector("embedding", { dimensions: 1536 }).notNull(),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("corpus_chunks_embedding_idx").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops"),
    ),
    index("corpus_chunks_sections_idx").using("gin", table.sections),
  ],
);

export const rateLimits = pgTable(
  "rate_limits",
  {
    ip: text("ip").notNull(),
    day: date("day").notNull(),
    count: integer("count").notNull().default(0),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.ip, table.day] })],
);

export type CorpusChunk = typeof corpusChunks.$inferSelect;
export type NewCorpusChunk = typeof corpusChunks.$inferInsert;
export type RateLimit = typeof rateLimits.$inferSelect;
