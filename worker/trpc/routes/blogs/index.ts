import { router } from "@worker/trpc/trpc";
import { getAllBlogs } from "./getAll";
import { getBlog } from "./get";
import { upsertBlog } from "./upsert";

export const blogsRouter = router({
  getAll: getAllBlogs,
  get: getBlog,
  upsert: upsertBlog,
});
