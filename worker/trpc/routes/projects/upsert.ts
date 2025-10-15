import { publicProcedure } from "@worker/trpc/trpc";
import { images, projects } from "@/db/schema";
import { projectSchema } from "@/db/schema/projects";

export const upsertProject = publicProcedure
  .input(projectSchema)
  .mutation(async ({ ctx: { db, env }, input: data }) => {
    const { id, ...rest } = data;
    console.log("data:", data);

    const imgObject = await env.BK.get(rest.cover);

    if (!imgObject) throw new Error("Image not found");

    const [newImg] = await db
      .insert(images)
      .values({
        id: rest.cover,
        alt: rest.title,
        // size: imgObject.size,
        // type: imgObject.httpMetadata?.contentType,
        uploadedAt: new Date().toISOString(),
      })
      .onConflictDoNothing()
      .returning();

    const [project] = await db
      .insert(projects)
      .values(data)
      .onConflictDoUpdate({
        target: projects.id,
        set: { ...rest, cover: newImg.id },
      })
      .returning();

    return project;
  });
