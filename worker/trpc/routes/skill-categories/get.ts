import { skill_categories } from "@/db/schema";
import { publicProcedure } from "@worker/trpc/trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const getSkillCategory = publicProcedure
  .input(z.string().optional())
  .query(async ({ ctx: { db }, input: id }) => {
    if (!id) return null;
    return (
      await db
        .select()
        .from(skill_categories)
        .where(eq(skill_categories.id, id))
        .all()
    )[0];
  });
