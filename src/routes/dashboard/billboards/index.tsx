import PageTitle from "@/components/page-title";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./-columns";
import { useTRPC } from "@/lib/utils/trpc";
import PageLoading from "@/components/page-loading";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/dashboard/billboards/")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(trpc.billboards.getAll.queryOptions());
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
