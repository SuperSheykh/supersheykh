import { publicProcedure } from "@worker/trpc/trpc";
import { z } from "zod";
import { images } from "@/db/schema";
import { v4 as uuid } from "uuid";

export const uploadImage = publicProcedure
  .input(
    z.object({
      file: z.string(), // base64 encoded image
      contentType: z.string().optional(), // Add contentType to input
    }),
  )
  .mutation(async ({ ctx: { db, env }, input }) => {
    const { file, contentType } = input;

    const filename = uuid() + ".png";

    // Decode base64
    const body = Buffer.from(file, "base64");

    // Upload to R2
    const uploaded = await env.BK.put(filename, body, {
      httpMetadata: {
        contentType: contentType || "application/octet-stream", // Use dynamic contentType or a default
      },
    });

    console.log("uploaded:", uploaded);

    // Register in D1
    const [newImage] = await db
      .insert(images)
      .values({
        key: uploaded.key,
        url: `${uploaded.key}`,
        filename,
        size: uploaded.size,
      })
      .returning();

    return newImage;
  });
