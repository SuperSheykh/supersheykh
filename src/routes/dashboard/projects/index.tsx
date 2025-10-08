import PageTitle from "@/components/page-title";
import {
  createFileRoute,
  useNavigate,
  useRouter,
  useRouteContext,
} from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";
import { trpc } from "@/lib/utils/trpc";

import { columns } from "./-columns";

export const Route = createFileRoute("/dashboard/projects/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  // const { data } = trpc.projects.getAll.useQuery();

  return (
    <Gutter>
      <PageTitle
        title="Projects"
        description="All the projects I've been working on"
      />
      <DataTable
        columns={columns}
        data={[]}
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
