import { publicProcedure } from "@worker/trpc/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { blogs } from "@/db/schema";

export const getBlog = publicProcedure
  .input(z.string())
  .query(async ({ ctx: { db }, input: id }) => {
    return (await db.select().from(blogs).where(eq(blogs.id, id)).all())[0];
  });
