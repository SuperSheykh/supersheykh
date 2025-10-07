import PageTitle from "@/components/page-title";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./-columns";
import { useTRPC } from "@/lib/utils/trpc";
import PageLoading from "@/components/page-loading";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/dashboard/socials/")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(trpc.socials.getAll.queryOptions());
  const navigate = useNavigate();

  if (isLoading) return <PageLoading />;

  return (
    <Gutter>
      <PageTitle title="Socials" description="All the socials I am on." />
      <DataTable
        columns={columns}
        data={data ?? []}
        onAdd={() =>
          navigate({
            to: "/dashboard/socials/$socialId",
            params: { socialId: "new" },
          })
        }
      />
    </Gutter>
  );
}
