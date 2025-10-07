import { publicProcedure } from "@worker/trpc/trpc";
import { skill_categories } from "@/db/schema";

export const getAllSkillCategories = publicProcedure.query(
  async ({ ctx: { db } }) => {
    return db.select().from(skill_categories).all();
  },
);
