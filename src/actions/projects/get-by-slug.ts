import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { images, projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const getProjectBySlug = createServerFn()
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data: { slug } }) => {
    const data = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug))
      .leftJoin(images, eq(projects.cover, images.id));

    if (!data.length) return null;
    const { projects: projectData, images: imageData } = data[0];
    return { ...projectData, cover: imageData };
  });
