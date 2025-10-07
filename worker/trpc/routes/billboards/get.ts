import { publicProcedure } from "@worker/trpc/trpc";
import { db } from "@/db";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { billboards } from "@/db/schema";

export const getBillboard = publicProcedure
  .input(z.string())
  .query(async ({ input: id }) => {
    return await db.query.billboards.findFirst({
      where: eq(billboards.id, id),
    });
  });
