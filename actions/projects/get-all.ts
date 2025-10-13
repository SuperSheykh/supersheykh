import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { projects } from "@/db/schema";

export const getAllProjects = createServerFn().handler(async () => {
  return db.select().from(projects).all();
});