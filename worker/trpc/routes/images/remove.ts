import { publicProcedure } from "@worker/trpc/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { images } from "@/db/schema";

export const removeImage = publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx: { db }, input }) => {
    const { id } = input;

    const [deletedImage] = await db
      .delete(images)
      .where(eq(images.id, id))
      .returning();

    if (deletedImage) {
      await env.BK.delete(deletedImage.filename);
    }

    return deletedImage;
  });
