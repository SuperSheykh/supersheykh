import { publicProcedure } from "@worker/trpc/trpc";
import { eq } from "drizzle-orm";
import { projects } from "@/db/schema";
import { z } from "zod";

export const deleteProject = publicProcedure
  .input(z.string().uuid())
  .mutation(async ({ ctx: { db }, input: projectSlug }) => {
    return db.delete(projects).where(eq(projects.slug, projectSlug)).run();
  });
