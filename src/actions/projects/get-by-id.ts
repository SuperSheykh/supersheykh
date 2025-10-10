'''use server''';
import db from "@/db";
import { images, projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getProjectById = async (id: string) => {
  if (id === "new") return null;
  const data = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .leftJoin(images, eq(projects.cover, images.id));
  if (!data.length) return null;
  const { projects: projectData, images: imageData } = data[0];
  return { ...projectData, cover: imageData };
};
