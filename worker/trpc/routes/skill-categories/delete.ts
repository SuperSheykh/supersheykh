import { publicProcedure } from "@worker/trpc/trpc";
import { z } from "zod";
import { skill_categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteSkillCategory = publicProcedure
  .input(z.string())
  .mutation(async ({ ctx: { db }, input: id }) => {
    return db
      .delete(skill_categories)
      .where(eq(skill_categories.id, id))
      .returning();
  });
