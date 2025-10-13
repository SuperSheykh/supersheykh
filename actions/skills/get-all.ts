import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { skills } from "@/db/schema";

export const getAllSkills = createServerFn().handler(async () => {
  return db.select().from(skills).all();
});