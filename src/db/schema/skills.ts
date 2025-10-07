import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { createInsertSchema } from "drizzle-zod";

export const skills = sqliteTable("skills", {
  id: text("id").primaryKey().$defaultFn(uuidv4),
  name: text("name").notNull().unique(),
  name_fr: text("name_fr"),
  category_id: text("category_id").references(() => skill_categories.id),
});

export const skill_categories = sqliteTable("skill_categories", {
  id: text("id").primaryKey().$defaultFn(uuidv4),
  name: text("name").notNull().unique(),
  name_fr: text("name_fr"),
});

export const skill_relations = relations(skills, ({ one }) => ({
  category: one(skill_categories, {
    fields: [skills.category_id],
    references: [skill_categories.id],
  }),
}));

export const skill_category_relations = relations(
  skill_categories,
  ({ many }) => ({
    skills: many(skills),
  }),
);

export const skillSchema = createInsertSchema(skills);
export type SkillInsert = typeof skills.$inferInsert;
