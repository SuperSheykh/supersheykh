import { createFileRoute, useParams } from "@tanstack/react-router";
import { useTRPC } from "@/lib/utils/trpc";

import PageLoading from "@/components/page-loading";
import QuoteForm from "./$quoteId/-form";
import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/dashboard/quotes/$quoteId")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { quoteId } = useParams({ from: "/dashboard/quotes/$quoteId" });
  const isNew = quoteId === "new";
  const { data, isLoading } = useQuery(
    trpc.quotes.get.queryOptions(quoteId, {
      enabled: !isNew,
    }),
  );

  if (isLoading && !isNew) return <PageLoading />;

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={data ? "Edit" : "Create"}
        description={data ? "Edit the quote" : "Create a new quote"}
      />
      <QuoteForm quote={data ?? null} />
    </Gutter>
  );
}
