import { router } from "@worker/trpc/trpc";
import { getAllSkillCategories } from "./getAll";
import { upsertSkillCategory } from "./upsert";
import { getAllWithSkills } from "./getAllWithSkills";
import { getSkillCategory } from "./get";
import { deleteSkillCategory } from "./delete";

export const skillCategoriesRouter = router({
  getAll: getAllSkillCategories,
  upsert: upsertSkillCategory,
  get: getSkillCategory,
  getAllWithSkills: getAllWithSkills,
  delete: deleteSkillCategory,
});
