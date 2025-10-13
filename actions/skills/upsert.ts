import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { skills, skillSchema } from "@/db/schema/skills";

export const upsertSkill = createServerFn()
  .inputValidator(skillSchema)
  .handler(async ({ data }) => {
    const { id, ...rest } = data;

    const [res] = await db
      .insert(skills)
      .values(data)
      .onConflictDoUpdate({ target: skills.id, set: rest })
      .returning();

    return res;
  });
