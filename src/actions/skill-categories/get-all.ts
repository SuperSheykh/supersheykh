'''use server''';
import db from "@/db";
import { skill_categories } from "@/db/schema";

export const getAllSkillCategories = async () => {
  return await db.select().from(skill_categories);
};
