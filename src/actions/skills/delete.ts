'''use server''';
import db from "@/db";
import { skills } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteSkill = async (id: string) => {
  return await db.delete(skills).where(eq(skills.id, id)).returning();
};
