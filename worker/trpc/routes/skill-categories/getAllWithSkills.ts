import { skill_categories, skills } from "@/db/schema";
import { publicProcedure } from "@worker/trpc/trpc";
import { eq, exists } from "drizzle-orm";

export const getAllWithSkills = publicProcedure.query(
  async ({ ctx: { db } }) => {
    return db.query.skill_categories.findMany({
      where: exists(
        db
          .select()
          .from(skills)
          .where(eq(skill_categories.id, skills.category_id)),
      ),
      with: {
        skills: true,
      },
    });
  },
);
