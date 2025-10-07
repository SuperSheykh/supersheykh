import { publicProcedure } from "@worker/trpc/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { skills } from "@/db/schema";

export const getSkill = publicProcedure
  .input(z.string())
  .query(async ({ ctx: { db }, input: id }) => {
    return (await db.select().from(skills).where(eq(skills.id, id)).all())[0];
  });
