import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { blogFormSchema, blogs, blogSchema } from "@/db/schema/blogs";
import { generateObject } from 'ai'
import { groq } from '@ai-sdk/groq'
import { getPrompt } from "@/lib/utils/get-translate-prompt";

export const upsertBlog = createServerFn()
  .inputValidator(blogFormSchema)
  .handler(async ({ data }) => {
    const prompt = getPrompt(data, 'blog')

    const { object } = await generateObject({
      model: groq('openai/gpt-oss-20b'),
      prompt,
      schema: blogSchema,
    })

    const { id, ...objectRest } = object

    const [res] = await db
      .insert(blogs)
      .values(object)
      .onConflictDoUpdate({ target: blogs.id, set: objectRest })
      .returning();

    return res;
  });
