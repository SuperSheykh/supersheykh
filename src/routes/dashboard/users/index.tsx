import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import PageTitle from "@/components/page-title";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./-columns";
import { getAllUsers } from "actions/users/get-all";
import PageLoading from "@/components/page-loading";

export const Route = createFileRoute("/dashboard/users/")({
  loader: () => getAllUsers(),
  component: RouteComponent,
  pendingComponent: PageLoading,
});

function RouteComponent() {
  const data = useLoaderData({ from: "/dashboard/users/" }) ?? [];
  return (
    <Gutter>
      <PageTitle title="Users" />
      <DataTable columns={columns} data={data} />
    </Gutter>
  );
}
