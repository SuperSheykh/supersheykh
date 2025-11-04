import { useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getBlogBySlug } from "actions/blogs";
import PageTitle from "@/components/page-title";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import BlogForm from "./-form";
import BlogAiForm from "./-ai-form";
import Gutter from "@/components/gutter";
import z from "zod";
import { Blog } from "@/db/schema/blogs";

const formSearchSchema = z.object({
  type: z.enum(["ai", "edit"]).optional().default("ai"),
});

export const Route = createFileRoute("/dashboard/blogs/$slug/")({
  validateSearch: (search) => formSearchSchema.parse(search),
  loader: async ({ params: { slug } }) => {
    if (slug === "new") return null;
    return getBlogBySlug({ data: { slug: slug } });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const blog = Route.useLoaderData() as Blog | null;
  const navigate = useNavigate();
  const { type } = Route.useSearch();
  const title = useMemo(() => (blog ? blog.title : "New Blog"), [blog]);
  const description = useMemo(
    () => (blog ? "Edit blog" : "Create a new blog"),
    [blog],
  );

  const switchToAi = (checked: boolean) => {
    navigate({
      to: ".",
      search: (old) => ({ ...old, type: checked ? "ai" : "edit" }),
      replace: true,
    });
  };

  return (
    <Gutter>
      <PageTitle title={title} description={description} />
      <div className="flex items-center space-x-2 mb-8 ">
        <Switch
          id="ai-form-toggle"
          checked={type === "ai"}
          onCheckedChange={switchToAi}
        />
        <Label htmlFor="ai-form-toggle">Use AI Assistant</Label>
      </div>

      {type === "ai" ? <BlogAiForm blog={blog} /> : <BlogForm blog={blog} />}
    </Gutter>
  );
}
