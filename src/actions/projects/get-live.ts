import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { images, projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getLiveProjects = createServerFn().handler(async () => {
  const data = await db
    .select()
    .from(projects)
    .where(eq(projects.live, "1"))
    .leftJoin(images, eq(projects.cover, images.id));
  return data.map(({ projects, images }) => ({ ...projects, cover: images }));
});
