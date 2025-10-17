import { publicProcedure } from "@worker/trpc/trpc";
import { skills } from "@/db/schema";
import { skillFormSchema, skillSchema } from "@/db/schema/skills";
import { generateObject } from "ai";
import { getPrompt } from "@/lib/utils/get-translate-prompt";
import { groq } from "@ai-sdk/groq";

export const upsertSkill = publicProcedure
  .input(skillFormSchema)
  .mutation(async ({ ctx, input: data }) => {
    const prompt = getPrompt(data, "skills");

    const { object } = await generateObject({
      model: groq("openai/gpt-oss-20b"),
      schema: skillSchema,
      prompt,
    });

    const { id, ...rest } = object;
    await ctx.db
      .insert(skills)
      .values(object)
      .onConflictDoUpdate({ target: skills.id, set: rest })
      .returning();
  });
