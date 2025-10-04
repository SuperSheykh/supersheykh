import { publicProcedure } from "@worker/trpc/trpc";
import { z } from "zod";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getProjects = publicProcedure
  .input(z.string().optional())
  .query(async ({ ctx: { db }, input: projectSlug }) => {
    if (projectSlug)
      return (
        await db
          .select()
          .from(projects)
          .where(eq(projects.slug, projectSlug))
          .limit(1)
      )[0];

    return db.select().from(projects).all();
  });
