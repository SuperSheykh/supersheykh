import { z } from "zod";
import { projects } from "./projects";
import { router } from "../trpc";

export const appRouter = router({
  projects,
});

export type AppRouter = typeof appRouter;
