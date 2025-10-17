import { publicProcedure } from "@worker/trpc/trpc";
import { quotes } from "@/db/schema";
import { quoteFormSchema, quoteSchema } from "@/db/schema/quotes";
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { getPrompt } from "@/lib/utils/get-translate-prompt";

export const upsertQuote = publicProcedure
  .input(quoteFormSchema)
  .mutation(async ({ ctx, input: data }) => {
    const prompt = getPrompt(data, "quotes");

    const { object } = await generateObject({
      model: groq("openai/gpt-oss-20b"),
      schema: quoteSchema,
      prompt,
    });

    const { id, ...rest } = object;

    await ctx.db
      .insert(quotes)
      .values(object)
      .onConflictDoUpdate({ target: quotes.id, set: rest })
      .returning();
  });
