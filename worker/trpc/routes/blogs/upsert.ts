import { publicProcedure } from "@worker/trpc/trpc";
import { blogs } from "@/db/schema";
import { blogFormSchema, blogSchema } from "@/db/schema/blogs";
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { getPrompt } from "@/lib/utils/get-translate-prompt";

export const upsertBlog = publicProcedure
  .input(blogFormSchema)
  .mutation(async ({ ctx, input: data }) => {
    const prompt = getPrompt(data, "blogs");

    const { object } = await generateObject({
      model: groq("openai/gpt-oss-20b"),
      schema: blogSchema,
      prompt,
    });

    const { id, ...rest } = object;

    await ctx.db
      .insert(blogs)
      .values(object)
      .onConflictDoUpdate({ target: blogs.id, set: rest })
      .returning();
  });
