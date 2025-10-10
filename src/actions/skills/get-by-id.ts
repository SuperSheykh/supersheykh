'''use server''';
import db from "@/db";
import { skills } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getSkillById = async (id: string) => {
  if (id === "new") return null;
  const data = await db.select().from(skills).where(eq(skills.id, id));
  return data[0] ?? null;
};
