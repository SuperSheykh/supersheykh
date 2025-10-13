import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { images } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { env } from "cloudflare:workers";

const inputSchema = z.object({
  id: z.string(),
});

export const delImage = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    const [deletedImage] = await db
      .delete(images)
      .where(eq(images.id, id))
      .returning();

    // if (deletedImage) {
    //   await env.BK.delete(deletedImage.filename);
    // }

    return deletedImage;
  });
