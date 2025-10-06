import PageTitle from "@/components/page-title";
import { createFileRoute } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./-columns";

export const Route = createFileRoute("/dashboard/projects/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Gutter>
      <PageTitle
        title="Projects"
        description="All the projects I've been working on"
      />
      <DataTable columns={columns} data={[]} />
    </Gutter>
  );
}
