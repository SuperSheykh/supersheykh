import { router } from "@worker/trpc/trpc";
import { getAllSocials } from "./getAll";
import { getSocial } from "./get";
import { upsertSocial } from "./upsert";

export const socialsRouter = router({
  getAll: getAllSocials,
  get: getSocial,
  upsert: upsertSocial,
});
