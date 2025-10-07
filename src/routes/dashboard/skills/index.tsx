import PageTitle from "@/components/page-title";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./-columns";
import { useTRPC } from "@/lib/utils/trpc";
import PageLoading from "@/components/page-loading";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/dashboard/skills/")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(trpc.skills.getAll.queryOptions());
  const navigate = useNavigate();

  if (isLoading) return <PageLoading />;

  return (
    <Gutter>
      <PageTitle title="Skills" description="All the skills I have." />
      <DataTable
        columns={columns}
        data={data ?? []}
        onAdd={() =>
          navigate({
            to: "/dashboard/skills/$skillId",
            params: { skillId: "new" },
          })
        }
      />
    </Gutter>
  );
}
