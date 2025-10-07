import { createTRPCRouter as router } from "@worker/trpc/trpc";
import { getAllSkills } from "./getAll";
import { getSkill } from "./get";
import { upsertSkill } from "./upsert";

export const skillsRouter = router({
  getAll: getAllSkills,
  get: getSkill,
  upsert: upsertSkill,
});
