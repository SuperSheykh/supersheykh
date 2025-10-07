import { billboards } from "@/db/schema";
import { publicProcedure } from "@worker/trpc/trpc";

export const getAllBillboards = publicProcedure.query(
  async ({ ctx: { db } }) => {
    return db.select().from(billboards).all();
  },
);
