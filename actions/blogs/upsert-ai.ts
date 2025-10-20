import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { blogAiFormSchema, blogs, blogSchema } from "@/db/schema/blogs";
import { generateObject } from 'ai'
import { groq } from '@ai-sdk/groq'
import { env } from 'cloudflare:workers'
import { images } from "@/db/schema";

export const upsertAiBlog = createServerFn()
  .inputValidator(blogAiFormSchema)
  .handler(async ({ data, }) => {

    const prompt = `
Context: You are an expert about Mali. You knows of its latest news, history and laws. 
You are responsible for writing blog posts about tech, and many other things.
Given the title provided in the following, provide the equivalent title in the other language,
and generate both relevant english and french content variations for a blog post to match the schema given. Make it make sense, normal lenth and be concise.
- title: ${data.title} in ${data.lang}.
`

    const { object } = await generateObject({
      model: groq('openai/gpt-oss-20b'),
      prompt,
      schema: blogSchema,
    })


    const imgObject = data.cover ? await env.BK.get(data.cover) : null
    if (!imgObject) throw new Error('Image not found')

    const [img] = await db.insert(images).values({
      id: imgObject.key,
      type: imgObject.httpMetadata?.contentType,
      size: imgObject.size,
      uploadedAt: new Date().toISOString(),
      alt: object.title,
    })
      .onConflictDoNothing()
      .returning()


    const { id, ...objectRest } = object

    const [res] = await db
      .insert(blogs)
      .values({ ...object, cover: img?.id })
      .onConflictDoUpdate({ target: blogs.id, set: { cover: img?.id, ...objectRest } })
      .returning();

    return res;
  });
