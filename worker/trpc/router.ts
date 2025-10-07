import { createTRPCRouter as router } from "./trpc";
import { projectsRouter } from "./routes/projects";
import { billboardsRouter } from "./routes/billboards";
import { blogsRouter } from "./routes/blogs";
import { skillsRouter } from "./routes/skills";
import { skillCategoriesRouter } from "./routes/skill-categories";
import { quotesRouter } from "./routes/quotes";
import { socialsRouter } from "./routes/socials";

export const appRouter = router({
  projects: projectsRouter,
  billboards: billboardsRouter,
  blogs: blogsRouter,
  skills: skillsRouter,
  skillCategories: skillCategoriesRouter,
  quotes: quotesRouter,
  socials: socialsRouter,
});

export type AppRouter = typeof appRouter;
