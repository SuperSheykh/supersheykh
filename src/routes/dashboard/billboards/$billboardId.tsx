import { createFileRoute, useParams } from "@tanstack/react-router";
import { useTRPC } from "@/lib/utils/trpc";

import { useQuery } from "@tanstack/react-query";

import PageLoading from "@/components/page-loading";
import BillboardForm from "./$billboardId/-form";
import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";

export const Route = createFileRoute("/dashboard/billboards/$billboardId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { billboardId } = useParams({
    from: "/dashboard/billboards/$billboardId",
  });
  const isNew = billboardId === "new";
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(
    trpc.billboards.get.queryOptions(billboardId, {
      enabled: !isNew,
    }),
  );

  if (isLoading && !isNew) return <PageLoading />;

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={data ? "Edit" : "Create"}
        description={data ? "Edit the billboard" : "Create a new billboard"}
      />
      <BillboardForm billboard={data ?? null} />
    </Gutter>
  );
}
