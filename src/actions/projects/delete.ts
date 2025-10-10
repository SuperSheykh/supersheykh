'''use server''';
import db from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteProject = async (id: string) => {
  return await db.delete(projects).where(eq(projects.id, id)).returning();
};
