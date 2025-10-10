import PageTitle from "@/components/page-title";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./-columns";
import PageLoading from "@/components/page-loading";
import { trpc } from "@/lib/utils/trpc";

export const Route = createFileRoute("/dashboard/blogs/")({
  component: RouteComponent,
});

function RouteComponent() {
  // const { data, isLoading } = trpc.blogs.getAll.useQuery();
  const navigate = useNavigate();

  // if (isLoading) return <PageLoading />;

  return (
    <Gutter>
      <PageTitle title="Blogs" description="All the blogs I've written." />
      <DataTable
        columns={columns}
        data={[]}
        onAdd={() =>
          navigate({
            to: "/dashboard/blogs/$blogId",
            params: { blogId: "new" },
          })
        }
      />
    </Gutter>
  );
}
