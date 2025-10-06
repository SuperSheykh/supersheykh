import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/lib/utils/trpc";

import PageLoading from "@/components/page-loading";
import ProjectForm from "./-form";

export const Route = createFileRoute("/dashboard/projects/$projectId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = useParams({ from: "/dashboard/projects/$projectId/" });
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(
    trpc.projects.get.queryOptions(projectId),
  );

  if (isLoading) return <PageLoading />;

  return <ProjectForm project={data ?? null} />;
}
