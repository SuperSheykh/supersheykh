import { createFileRoute, useParams } from "@tanstack/react-router";
import { trpc } from "@/lib/utils/trpc";

import PageLoading from "@/components/page-loading";
import ProjectForm from "./-form";
import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";

export const Route = createFileRoute("/dashboard/projects/$projectId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = useParams({ from: "/dashboard/projects/$projectId/" });
  const isNew = projectId === "new";
  const { data, isLoading } = trpc.projects.get.useQuery(projectId, {
    enabled: !isNew,
  });

  if (isLoading && !isNew) return <PageLoading />;

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={data ? "Edit" : "Create"}
        description={data ? "Edit the project" : "Create a new project"}
      />
      <ProjectForm project={data ?? null} />
    </Gutter>
  );
}

