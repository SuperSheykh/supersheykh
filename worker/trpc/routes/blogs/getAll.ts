import { publicProcedure } from "@worker/trpc/trpc";
import { blogs } from "@/db/schema";

export const getAllBlogs = publicProcedure.query(async ({ ctx: { db } }) => {
  return db.select().from(blogs).all();
});
