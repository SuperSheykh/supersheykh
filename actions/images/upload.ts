import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { env } from "cloudflare:workers";
import db from "@/db";
import { images } from "@/db/schema";

const inputSchema = z.object({
  file: z.string(),
  contentType: z.string(),
  filename: z.string(),
});

export const upload = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: input }) => {
    try {
      const { file, contentType, filename } = input;
      const key = uuidv4();
      const buffer = Buffer.from(file, "base64");

      await env.BK.put(key, buffer, {
        httpMetadata: { contentType },
      });

      const [newImage] = await db
        .insert(images)
        .values({
          key,
          filename,
          size: buffer.length,
          type: contentType,
        })
        .returning();

      return newImage;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  });

