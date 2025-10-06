import { publicProcedure } from "@worker/trpc/trpc";
import { projects } from "@/db/schema";

export const getAllProjects = publicProcedure.query(async ({ ctx: { db } }) => {
  return db.select().from(projects).all();
});
