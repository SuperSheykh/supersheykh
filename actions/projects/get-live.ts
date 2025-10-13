import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getLiveProjects = createServerFn().handler(async () => {
  return db.select().from(projects).where(eq(projects.live, "1")).all();
});
