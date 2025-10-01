import { sql } from "drizzle-orm";
import { text, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  title_fr: text("title_fr"),
  content: text("content").notNull(),
  content_fr: text("content_fr"),
  imageUrl: text("imageUrl"),
  createdAt: timestamp("createdAt").default(sql`now()`),
  updatedAt: timestamp("updatedAt").default(sql`now()`),
});
