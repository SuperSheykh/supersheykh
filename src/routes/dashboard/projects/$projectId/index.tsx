import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/lib/utils/trpc";

import PageLoading from "@/components/page-loading";
import ProjectForm from "./-form";
import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";

export const Route = createFileRoute("/dashboard/projects/$projectId/")({
  component: RouteComponent,
  handle: {
    crumb: (params: { projectId: string }) =>
      params.projectId === "new" ? "New Project" : `Edit Project`,
  },
});

function RouteComponent() {
  const { projectId } = useParams({ from: "/dashboard/projects/$projectId/" });
  const trpc = useTRPC();
  const isNew = projectId === "new";
  const { data, isLoading } = useQuery(
    trpc.projects.get.queryOptions(projectId, {
      enabled: !isNew,
    }),
  );

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
