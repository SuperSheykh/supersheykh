import PageTitle from "@/components/page-title";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./-columns";
import { trpc } from "@/lib/utils/trpc";
import PageLoading from "@/components/page-loading";

export const Route = createFileRoute("/dashboard/socials/")({
  component: RouteComponent,
});

function RouteComponent() {
  // const { data, isLoading } = trpc.socials.getAll.useQuery();
  const navigate = useNavigate();

  // if (isLoading) return <PageLoading />;

  return (
    <Gutter>
      <PageTitle title="Socials" description="All the socials I am on." />
      <DataTable
        columns={columns}
        data={[]}
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

