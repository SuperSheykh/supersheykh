import { publicProcedure } from "@worker/trpc/trpc";
import { z } from "zod";
import { skills } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteSkill = publicProcedure
  .input(z.string())
  .mutation(async ({ ctx: { db }, input: id }) => {
    return db.delete(skills).where(eq(skills.id, id)).returning();
  });
