import { publicProcedure } from "@worker/trpc/trpc";
import { billboards } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const deleteBillboard = publicProcedure
  .input(z.string())
  .mutation(async ({ ctx: { db }, input: id }) => {
    return db.delete(billboards).where(eq(billboards.id, id)).returning();
  });
