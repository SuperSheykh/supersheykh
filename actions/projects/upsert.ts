import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { projects, projectSchema } from "@/db/schema/projects";

export const upsertProject = createServerFn()
  .inputValidator(projectSchema)
  .handler(async ({ data }) => {
    const { id, ...rest } = data;

    const [res] = await db
      .insert(projects)
      .values(data)
      .onConflictDoUpdate({ target: projects.id, set: rest })
      .returning();

    return res;
  });
