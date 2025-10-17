import { billboards } from "@/db/schema";
import { publicProcedure } from "@worker/trpc/trpc";

export const getAllBillboards = publicProcedure.query(
  async ({ ctx: { db, env } }) => {
    return db.select().from(billboards).all();
  },
);
