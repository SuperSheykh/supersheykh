import PageTitle from "@/components/page-title";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./-columns";

export const Route = createFileRoute("/dashboard/projects/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
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
