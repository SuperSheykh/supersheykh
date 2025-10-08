import { publicProcedure } from "@worker/trpc/trpc";
import { billboards } from "@/db/schema";
import { billboardSchema } from "@/db/schema/billboards";
import db from "@/db";

export const upsertBillboard = publicProcedure
  .input(billboardSchema)
  .mutation(async ({ input: data }) => {
    const { id, ...rest } = data;
    await db
      .insert(billboards)
      .values(data)
      .onConflictDoUpdate({ target: billboards.id, set: rest })
      .returning();
  });
