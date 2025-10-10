'''use server''';
import db from "@/db";
import { skills, skill_categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getAllSkillsWithCategory = async () => {
  const data = await db
    .select()
    .from(skills)
    .leftJoin(skill_categories, eq(skills.category_id, skill_categories.id));
  return data.map(({ skills, skill_categories }) => ({
    ...skills,
    category: skill_categories,
  }));
};