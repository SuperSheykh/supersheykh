import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { projects } from "@/db/schema";

export const getProjects = createServerFn().handler(async () => {
  return null;
  // try {
  //   const results = await db.select({ id: projects.id }).from(projects).all();
  //   console.log("results:", results);
  //   return results;
  // } catch (error) {
  //   console.error("Error:", error);
  //   return null;
  // }
});
