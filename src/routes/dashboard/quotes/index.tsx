import PageTitle from "@/components/page-title";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./-columns";
import PageLoading from "@/components/page-loading";
import { useTRPC } from "@/lib/utils/trpc";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/dashboard/quotes/")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(trpc.quotes.getAll.queryOptions());
  const navigate = useNavigate();

  if (isLoading) return <PageLoading />;

  return (
    <Gutter>
      <PageTitle title="Quotes" description="All the quotes that inspire me." />
      <DataTable
        columns={columns}
        data={data ?? []}
        onAdd={() =>
          navigate({
            to: "/dashboard/quotes/$quoteId",
            params: { quoteId: "new" },
          })
        }
      />
    </Gutter>
  );
}
