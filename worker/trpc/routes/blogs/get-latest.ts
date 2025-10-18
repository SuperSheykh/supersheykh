import { publicProcedure } from "@worker/trpc/trpc";
import { blogs } from "@/db/schema";
import { asc } from "drizzle-orm";

export const getLatestBlogs = publicProcedure.query(async ({ ctx: { db } }) => {
  return db.select().from(blogs).orderBy(asc(blogs.createdAt)).limit(3).all();
});
