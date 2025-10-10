import db from "@/db";
import { createServerFn } from "@tanstack/react-start";
import { images, projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getAllProjects = createServerFn().handler(async () => {
  const data = await db
    .select()
    .from(projects)
    .leftJoin(images, eq(projects.cover, images.id));
  return data.map(({ projects, images }) => ({ ...projects, cover: images }));
});
