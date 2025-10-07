import { createFileRoute, useParams } from "@tanstack/react-router";
import { useTRPC } from "@/lib/utils/trpc";

import PageLoading from "@/components/page-loading";
import BlogForm from "./$blogId/-form";
import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/dashboard/blogs/$blogId")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { blogId } = useParams({ from: "/dashboard/blogs/$blogId" });
  const isNew = blogId === "new";
  const { data, isLoading } = useQuery(
    trpc.blogs.get.queryOptions(blogId, {
      enabled: !isNew,
    }),
  );

  if (isLoading && !isNew) return <PageLoading />;

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={data ? "Edit" : "Create"}
        description={data ? "Edit the blog" : "Create a new blog"}
      />
      <BlogForm blog={data ?? null} />
    </Gutter>
  );
}
