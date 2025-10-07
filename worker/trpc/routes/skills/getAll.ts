import { skills } from "@/db/schema";
import { publicProcedure } from "@worker/trpc/trpc";

export const getAllSkills = publicProcedure.query(async ({ ctx: { db } }) => {
  return db.select().from(skills).all();
});
