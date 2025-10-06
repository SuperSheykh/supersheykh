import { publicProcedure } from "@worker/trpc/trpc";
import { projects } from "@/db/schema";
import { projectSchema } from "@/db/schema/projects";

export const upsertProject = publicProcedure
  .input(projectSchema)
  .mutation(async ({ ctx: { db }, input: data }) => {
    const { id, ...rest } = data;
    db.insert(projects)
      .values(data)
      .onConflictDoUpdate({ target: projects.id, set: rest })
      .returning();
  });
