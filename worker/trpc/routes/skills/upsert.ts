import { publicProcedure } from "@worker/trpc/trpc";
import { skills } from "@/db/schema";
import { skillSchema } from "@/db/schema/skills";

export const upsertSkill = publicProcedure
  .input(skillSchema)
  .mutation(async ({ ctx: { db }, input: data }) => {
    const { id, ...rest } = data;
    await db
      .insert(skills)
      .values(data)
      .onConflictDoUpdate({ target: skills.id, set: rest })
      .returning();
  });
