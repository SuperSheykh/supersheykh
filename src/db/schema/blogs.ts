import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { images } from "./images";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const blogs = sqliteTable("blogs", {
  id: text("id").primaryKey().$defaultFn(uuidv4),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  title_fr: text("title_fr").notNull(),
  content: text("content").notNull(),
  content_fr: text("content_fr").notNull(),
  cover: text("cover"),
  createdAt: text("createdAt").$defaultFn(() => new Date().toISOString()),
  updatedAt: text("createdAt").$defaultFn(() => new Date().toISOString()),
});

export const blog_relations = relations(blogs, ({ one }) => ({
  image: one(images, {
    fields: [blogs.cover],
    references: [images.id],
  }),
}));

export const blogSchema = createInsertSchema(blogs);
export const blogFormSchema = blogSchema
  .pick({
    slug: true,
    title: true,
    content: true,
    cover: true,
  })
  .extend({
    id: z.string().optional(),
    lang: z.enum(["en", "fr"]),
  });
export const blogAiFormSchema = createInsertSchema(blogs).pick({
  cover: true,
  title: true
}).extend({
  lang: z.enum(["en", "fr"]),
})

export type BlogInsert = typeof blogs.$inferInsert;
