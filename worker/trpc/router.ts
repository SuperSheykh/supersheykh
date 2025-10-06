import { createTRPCRouter as router } from "./trpc";
import * as projects from "./routes/projects";

export const appRouter = router({
  projects,
});

export type AppRouter = typeof appRouter;
