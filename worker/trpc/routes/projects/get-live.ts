import { publicProcedure } from "@worker/trpc/trpc";
import { eq } from "drizzle-orm";
import { projects } from "@/db/schema";

export const getLive = publicProcedure.query(async ({ ctx: { db } }) => {
  return db.select().from(projects).where(eq(projects.live, "1")).all();
});
