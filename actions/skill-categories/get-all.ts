import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { skill_categories } from "@/db/schema";

export const getAllSkillCategories = createServerFn().handler(async () => {
  return db.select().from(skill_categories).all();
});
