import PageTitle from "@/components/page-title";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./-columns";

export const Route = createFileRoute("/dashboard/skills/")({
  component: RouteComponent,
});

function RouteComponent() {
  // const { data, isLoading } = trpc.skills.getAll.useQuery();
  const navigate = useNavigate();

  // if (isLoading) return <PageLoading />;

  return (
    <Gutter>
      <PageTitle title="Skills" description="All the skills I have." />
      <DataTable
        columns={columns}
        data={[]}
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
