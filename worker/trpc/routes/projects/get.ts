import { publicProcedure } from "@worker/trpc/trpc";
import { z } from "zod";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getProject = publicProcedure
  .input(z.string().uuid())
  .query(async ({ ctx: { db }, input: projectSlug }) => {
    return (
      (
        await db
          .select()
          .from(projects)
          .where(eq(projects.slug, projectSlug))
          .limit(1)
      )[0] ?? null
    );
  });
