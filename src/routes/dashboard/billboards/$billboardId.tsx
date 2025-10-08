import { createFileRoute, useParams } from "@tanstack/react-router";
import { trpc } from "@/lib/utils/trpc";

import PageLoading from "@/components/page-loading";
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
  // const { data, isLoading } = trpc.billboards.get.useQuery(billboardId, {
  //   enabled: !isNew,
  // });

  if (false && !isNew) return <PageLoading />;

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={false ? "Edit" : "Create"}
        description={false ? "Edit the billboard" : "Create a new billboard"}
      />
      <div>Form</div>
    </Gutter>
  );
}

