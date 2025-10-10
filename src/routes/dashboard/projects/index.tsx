import PageTitle from "@/components/page-title";
import {
  createFileRoute,
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";
import { trpc } from "@/lib/utils/trpc";

import { columns } from "./-columns";
import PageLoading from "@/components/page-loading";

export const Route = createFileRoute("/dashboard/projects/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const {} = useRouteContext({ from: "/" });
  const { data, isLoading } = useQuery(trpc.projects.getAll.queryOptions());

  if (isLoading) return <PageLoading />;

  return (
    <Gutter>
      <PageTitle
        title="Projects"
        description="All the projects I've been working on"
      />
      <DataTable
        columns={columns}
        data={data ?? []}
        onAdd={() =>
          navigate({
            to: "/dashboard/projects/$projectId",
            params: { projectId: "new" },
          })
        }
      />
    </Gutter>
  );
}
