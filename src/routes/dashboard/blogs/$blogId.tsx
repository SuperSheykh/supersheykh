import { createFileRoute, useParams } from "@tanstack/react-router";
import { trpc } from "@/lib/utils/trpc";

import PageLoading from "@/components/page-loading";
import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";

export const Route = createFileRoute("/dashboard/blogs/$blogId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { blogId } = useParams({ from: "/dashboard/blogs/$blogId" });
  const isNew = blogId === "new";
  // const { data, isLoading } = trpc.blogs.get.useQuery(blogId, {
  //   enabled: !isNew,
  // });

  // if (isLoading && !isNew) return <PageLoading />;

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={false ? "Edit" : "Create"}
        description={false ? "Edit the blog" : "Create a new blog"}
      />
      <p>Form</p>
    </Gutter>
  );
}

