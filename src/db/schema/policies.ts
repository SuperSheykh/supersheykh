import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const policies = sqliteTable("policies", {
  id: text("id").primaryKey().$defaultFn(uuidv4),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  titleFr: text("title_fr").notNull(),
  content: text("content").notNull(),
  contentFr: text("content_fr").notNull(),
  version: text("version").notNull().default("1.0"),
  published: integer("published", { mode: "boolean" }).default(true).notNull(),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at").$defaultFn(() => new Date().toISOString()),
});

export const policySchema = createInsertSchema(policies);
export const policyFormSchema = policySchema
  .pick({
    title: true,
  })
  .extend({
    id: z.string().optional(),
    prompt: z.string().optional(),
    lang: z.enum(["en", "fr"]).optional(),
  });
export type Policy = typeof policies.$inferSelect;
