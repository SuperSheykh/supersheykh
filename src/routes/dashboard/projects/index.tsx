import PageTitle from "@/components/page-title";
import {
  createFileRoute,
  useLoaderData,
  useNavigate,
} from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./-columns";
import PageLoading from "@/components/page-loading";

import { getAllProjects } from "actions/projects/get-all";

export const Route = createFileRoute("/dashboard/projects/")({
  loader: () => getAllProjects(),
  staleTime: Infinity,
  shouldReload: false,
  component: RouteComponent,
  pendingComponent: PageLoading,
});

function RouteComponent() {
  const navigate = useNavigate();
  const data = useLoaderData({ from: "/dashboard/projects/" }) ?? [];

  return (
    <Gutter>
      <PageTitle
        title="Projects"
        description="All the projects I've been working on"
      />
      <DataTable
        columns={columns}
        data={data}
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
