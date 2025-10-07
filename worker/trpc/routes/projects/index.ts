import { getProject as get } from "./get";
import { getAllProjects as getAll } from "./get-all";
import { getLive } from "./get-live";
import { upsertProject as upsert } from "./upsert";
import { deleteProject as remove } from "./remove";

export const projectsRouter = {
  get,
  getAll,
  getLive,
  upsert,
  remove,
};
