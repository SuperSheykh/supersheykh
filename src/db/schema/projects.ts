import { sqliteTable, text, index, real } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { images } from "./images";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const projects = sqliteTable(
  "projects",
  {
    id: text("id").primaryKey().$defaultFn(uuidv4),
    title: text("title").notNull().unique(),
    title_fr: text("title_fr").notNull().unique(),
    description: text("description").notNull(),
    description_fr: text("description_fr").notNull(),
    slug: text("slug").notNull().unique(),
    cover: text("cover")
      .notNull()
      .references(() => images.id),
    live: text("live").default("1"),
    completion: real("completion").notNull(),
    github: text("github"),
    created_at: text("created_at").$defaultFn(() => new Date().toISOString()),
    updated_at: text("updated_at").$defaultFn(() => new Date().toISOString()),
  },
  (table) => ({
    titleIdx: index("title_idx").on(table.title),
    titleFrIdx: index("title_fr_idx").on(table.title_fr),
    slugIdx: index("slug_idx").on(table.slug),
  }),
);

export const project_relations = relations(projects, ({ one }) => ({
  cover: one(images, {
    fields: [projects.cover],
    references: [images.id],
  }),
}));

export type Project = typeof projects.$inferSelect;
export type ProjectInsert = typeof projects.$inferInsert;
export const projectSchema = createInsertSchema(projects);
export const projectFormSchema = projectSchema
  .pick({
    title: true,
    description: true,
    cover: true,
    live: true,
    completion: true,
    github: true,
  })
  .extend({
    id: z.string().optional(),
    lang: z.enum(["en", "fr"]),
  });
