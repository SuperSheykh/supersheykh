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
import { getAllBlogs } from "actions/blogs/get-all";

export const Route = createFileRoute("/dashboard/blogs/")({
  loader: () => getAllBlogs(),
  staleTime: Infinity,
  shouldReload: false,
  component: RouteComponent,
  pendingComponent: PageLoading,
});

function RouteComponent() {
  const navigate = useNavigate();
  const data = useLoaderData({ from: "/dashboard/blogs/" }) ?? [];

  return (
    <Gutter>
      <PageTitle title="Blogs" description="All the blogs I've written." />
      <DataTable
        columns={columns}
        data={data}
        onAdd={() =>
          navigate({
            to: "/dashboard/blogs/$slug",
            search: { type: "ai" },
            params: { slug: "new" },
          })
        }
      />
    </Gutter>
  );
}
