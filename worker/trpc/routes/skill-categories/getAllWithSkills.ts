import { skill_categories, skills } from "@/db/schema";
import { publicProcedure } from "@worker/trpc/trpc";
import { eq } from "drizzle-orm";

export const getAllWithSkills = publicProcedure.query(({ ctx: { db } }) => {
  return db
    .select()
    .from(skill_categories)
    .leftJoin(skills, eq(skill_categories.id, skills.category_id))
    .all();
});
