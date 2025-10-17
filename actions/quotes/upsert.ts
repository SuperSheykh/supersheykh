import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { quotes, quoteSchema } from "@/db/schema/quotes";
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { getPrompt } from "@/lib/utils/get-translate-prompt";

export const upsertQuote = createServerFn()
  .inputValidator(quoteSchema)
  .handler(async ({ data }) => {
    const prompt = getPrompt(data, "quotes");
    const { object } = await generateObject({
      model: groq("openai/gpt-oss-20b"),
      schema: quoteSchema,
      prompt,
    });
    const { id, ...rest } = object;

    const [res] = await db
      .insert(quotes)
      .values(data)
      .onConflictDoUpdate({ target: quotes.id, set: rest })
      .returning();

    return res;
  });
