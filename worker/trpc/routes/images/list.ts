import { images } from "@/db/schema";
import { publicProcedure } from "@worker/trpc/trpc";

export const listImages = publicProcedure.query(async ({ ctx: { db } }) => {
  return db.select().from(images).all();
});
