'''use server''';
import db from "@/db";
import { skills, skillSchema } from "@/db/schema/skills";
import { eq } from "drizzle-orm";
import { z } from "zod";

const upsertSchema = skillSchema.extend({ id: z.string().optional() });

export const upsertSkill = async (data: z.infer<typeof upsertSchema>) => {
  if (data.id) {
    const { id, ...updateData } = data;
    return db.update(skills).set(updateData).where(eq(skills.id, id)).returning();
  }
  return db.insert(skills).values(data).returning();
};
