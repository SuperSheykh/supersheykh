import { projectSchema } from "@/db/schema/projects";
import { blogSchema } from "@/db/schema/blogs";
import { quoteSchema } from "@/db/schema/quotes";
import { billboardSchema } from "@/db/schema/billboards";
import { skillSchema, skillCategorySchema } from "@/db/schema/skills";

export const schemaMap = {
  projects: projectSchema,
  blogs: blogSchema,
  quotes: quoteSchema,
  billboards: billboardSchema,
  skills: skillSchema,
  skillCategories: skillCategorySchema,
};