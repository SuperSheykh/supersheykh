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
import { useTRPC } from "@/lib/trpc";

export const Route = createFileRoute("/dashboard/images/")({
  loader: async ({ context: { trpc } }) => trpc.images.list.query(),
  shouldReload: false,
  staleTime: Infinity,
  component: RouteComponent,
  pendingComponent: PageLoading,
});

function RouteComponent() {
  const navigate = useNavigate();
  const data = useLoaderData({ from: "/dashboard/images/" }) ?? [];

  return (
    <Gutter>
      <PageTitle title="Images" description="All the uploaded images." />
      <DataTable
        columns={columns}
        data={data}
        onAdd={() =>
          navigate({
            to: "/dashboard/images/$imageId",
            params: { imageId: "new" },
          })
        }
      />
    </Gutter>
  );
}
