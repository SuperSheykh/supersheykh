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
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/lib/trpc";
import { getAllQuotes } from "actions/quotes/get-all";

export const Route = createFileRoute("/dashboard/quotes/")({
  loader: () => getAllQuotes(),
  staleTime: Infinity,
  shouldReload: false,
  component: RouteComponent,
  pendingComponent: PageLoading,
});

function RouteComponent() {
  const navigate = useNavigate();
  const data = useLoaderData({ from: "/dashboard/quotes/" }) ?? [];

  return (
    <Gutter>
      <PageTitle title="Quotes" description="All the quotes that inspire me." />
      <DataTable
        columns={columns}
        data={data}
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
