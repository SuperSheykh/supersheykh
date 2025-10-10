'''use server''';
import db from "@/db";
import { projects, projectSchema } from "@/db/schema/projects";
import { eq } from "drizzle-orm";
import { z } from "zod";

const upsertSchema = projectSchema.extend({ id: z.string().optional() });

export const upsertProject = async (data: z.infer<typeof upsertSchema>) => {
  if (data.id) {
    const { id, ...updateData } = data;
    return db.update(projects).set(updateData).where(eq(projects.id, id)).returning();
  }
  return db.insert(projects).values(data).returning();
};
