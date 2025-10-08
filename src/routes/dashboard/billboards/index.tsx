import PageTitle from "@/components/page-title";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./-columns";
import { trpc } from "@/lib/utils/trpc";
import PageLoading from "@/components/page-loading";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/billboards/")({
  component: RouteComponent,
});

function RouteComponent() {
  // const { data, isLoading } = trpc.billboards.getAll.useQuery();
  const [data] = useState([]);
  const [isLoading] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <PageLoading />;

  return (
    <Gutter>
      <PageTitle
        title="Billboards"
        description="The first thing people see when they visit the site."
      />
      <DataTable
        columns={columns}
        data={data ?? []}
        onAdd={() =>
          navigate({
            to: "/dashboard/billboards/$billboardId",
            params: { billboardId: "new" },
          })
        }
      />
    </Gutter>
  );
}

