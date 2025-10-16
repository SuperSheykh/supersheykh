import { createServerFn } from "@tanstack/react-start";
import db from "@/db";

export const getAllSkills = createServerFn().handler(async () => {
  return db.query.skill_categories.findMany({
    with: {
      skills: true,
    },
  });
});

