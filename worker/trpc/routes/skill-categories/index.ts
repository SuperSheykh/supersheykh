import { createTRPCRouter as router } from "@worker/trpc/trpc";
import { getAllSkillCategories } from "./getAll";

export const skillCategoriesRouter = router({
  getAll: getAllSkillCategories,
});
