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
import { getAllBillboards } from "actions/billboards/get-all";

export const Route = createFileRoute("/dashboard/billboards/")({
  loader: () => getAllBillboards(),
  shouldReload: false,
  staleTime: Infinity,
  component: RouteComponent,
  pendingComponent: PageLoading,
});

function RouteComponent() {
  const navigate = useNavigate();
  const data = useLoaderData({ from: "/dashboard/billboards/" }) ?? [];

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
