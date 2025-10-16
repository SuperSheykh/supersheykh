import { skill_categories } from "@/db/schema";
import { skillCategorySchema } from "@/db/schema/skills";
import { publicProcedure } from "@worker/trpc/trpc";

export const upsertSkillCategory = publicProcedure
  .input(skillCategorySchema)
  .mutation(({ ctx: { db }, input: data }) => {
    const { id, ...rest } = data;
    return db.insert(skill_categories).values(data).onConflictDoUpdate({
      target: skill_categories.id,
      set: rest,
    });
  });
