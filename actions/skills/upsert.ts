import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { skills, skillSchema, skillFormSchema } from "@/db/schema/skills";
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { getPrompt } from "@/lib/utils/get-translate-prompt";

export const upsertSkill = createServerFn()
  .inputValidator(skillFormSchema)
  .handler(async ({ data }) => {
    const prompt = getPrompt(data, "skills");

    const { object } = await generateObject({
      model: groq("openai/gpt-oss-20b"),
      schema: skillSchema,
      prompt,
    });

    const { id, ...rest } = object;

    const [res] = await db
      .insert(skills)
      .values(object)
      .onConflictDoUpdate({ target: skills.id, set: rest })
      .returning();

    return res;
  });
