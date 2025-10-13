import { publicProcedure } from "@worker/trpc/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { images } from "@/db/schema";

export const viewImage = publicProcedure
  .input(z.object({ key: z.string() }))
  .query(async ({ ctx: { db, env }, input }) => {
    const { key } = input;
    return (
      await db.select().from(images).where(eq(images.id, key)).limit(1)
    )[0];
  });
