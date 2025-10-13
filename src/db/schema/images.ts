import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { projects } from "./projects";
import { blogs } from "./blogs";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { billboards } from "./billboards";

export const images = sqliteTable("images", {
  id: text("id").primaryKey().$defaultFn(uuidv4),
  key: text("key").notNull(),
  url: text("url").notNull(),
  filename: text("filename").notNull(),
  size: integer("size"),
  type: text("type"),
  uploadedAt: text("uploadedAt")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const image_relations = relations(images, ({ many }) => ({
  projects: many(projects),
  blogs: many(blogs),
  billboards: many(billboards),
}));

export const imageSchema = createInsertSchema(images);
export type ImageInsert = typeof images.$inferInsert;
