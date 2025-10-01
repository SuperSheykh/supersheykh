import { sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

export const projects = sqliteTable(
  "projects",
  {
    id: text("id").primaryKey().$defaultFn(uuidv4),
    title: text("title").notNull().unique(),
    title_fr: text("title_fr").notNull().unique(),
    description: text("description").notNull(),
    description_fr: text("description_fr").notNull(),
    slug: text("slug").notNull().unique(),
    cover: text("cover").notNull(),
    created_at: text("created_at").notNull(),
    updated_at: text("updated_at").notNull(),
  },
  (table) => ({
    titleIdx: index("title_idx").on(table.title),
    titleFrIdx: index("title_fr_idx").on(table.title_fr),
    slugIdx: index("slug_idx").on(table.slug),
  }),
);
