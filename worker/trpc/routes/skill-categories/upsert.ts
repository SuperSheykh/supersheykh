import { skill_categories } from "@/db/schema";
import {
  skillCategoryFormSchema,
  skillCategorySchema,
} from "@/db/schema/skills";
import { getPrompt } from "@/lib/utils/get-translate-prompt";
import { groq } from "@ai-sdk/groq";
import { publicProcedure } from "@worker/trpc/trpc";
import { generateObject } from "ai";

export const upsertSkillCategory = publicProcedure
  .input(skillCategoryFormSchema)
  .mutation(async ({ ctx, input: data }) => {
    const prompt = getPrompt(data, "skill-categories");
    const { object } = await generateObject({
      model: groq("openai/gpt-oss-20b"),
      schema: skillCategorySchema,
      prompt,
    });

    const { id, ...rest } = object;

    return ctx.db.insert(skill_categories).values(object).onConflictDoUpdate({
      target: skill_categories.id,
      set: rest,
    });
  });
