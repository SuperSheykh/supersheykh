import { router } from "@worker/trpc/trpc";
import { getAllSkills } from "./getAll";
import { getSkill } from "./get";
import { upsertSkill } from "./upsert";
import { deleteSkill } from "./delete";

export const skillsRouter = router({
  getAll: getAllSkills,
  get: getSkill,
  upsert: upsertSkill,
  delete: deleteSkill,
});
