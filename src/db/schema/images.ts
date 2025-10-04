import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { projects } from "./projects";
import { blogs } from "./blogs";
import { relations } from "drizzle-orm";

export const images = sqliteTable("images", {
  id: text("id").primaryKey().$defaultFn(uuidv4),
});

export const image_relations = relations(images, ({ many }) => ({
  projects: many(projects),
  blogs: many(blogs),
}));
