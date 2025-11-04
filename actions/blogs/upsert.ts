import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { blogs, blogSchema } from "@/db/schema/blogs";
import { env } from "cloudflare:workers";
import { images } from "@/db/schema/images";

export const upsertBlog = createServerFn()
  .inputValidator(blogSchema)
  .handler(async ({ data }) => {
    const { id, ...objectRest } = data;
    const imgObject = data.cover ? await env.BK.get(data.cover) : null;
    if (!imgObject) throw new Error("Image not found");

    const [img] = await db
      .insert(images)
      .values({
        id: imgObject.key,
        alt: data.title,
        type: imgObject.httpMetadata?.contentType,
        size: imgObject.size,
        uploadedAt: new Date().toISOString(),
      })
      .onConflictDoNothing()
      .returning();

    const [res] = await db
      .insert(blogs)
      .values({ ...data, cover: img?.id ?? imgObject.key })
      .onConflictDoUpdate({ target: blogs.id, set: objectRest })
      .returning();

    return res;
  });
