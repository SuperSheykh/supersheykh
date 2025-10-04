import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { images } from "./images";

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
