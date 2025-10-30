import Gutter from "@/components/gutter";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getAllPolicies } from "actions/policies";
import { columns } from "./-columns";
import { DataTable } from "@/components/ui/data-table";
import PageTitle from "@/components/page-title";
import PageLoading from "@/components/page-loading";

export const Route = createFileRoute("/dashboard/policies/")({
  loader: () => getAllPolicies(),
  component: RouteComponent,
  pendingComponent: PageLoading,
});

function RouteComponent() {
  const policies = Route.useLoaderData();
  const router = useRouter();
  return (
    <Gutter>
      <PageTitle title="Policies" />
      <DataTable
        columns={columns}
        data={policies}
        onAdd={() =>
          router.navigate({
            to: "/dashboard/policies/$id",
            params: { id: "new" },
          })
        }
      />
    </Gutter>
  );
}
