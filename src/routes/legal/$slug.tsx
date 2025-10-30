import { createFileRoute } from "@tanstack/react-router";
import { getPolicy } from "actions/policies";
import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";

export const Route = createFileRoute("/legal/$slug")({
  loader: ({ params }) => getPolicy({ data: { slug: params.slug } }),
  component: RouteComponent,
});

function RouteComponent() {
  const policy = Route.useLoaderData();
  return (
    <Gutter>
      <PageTitle title={policy.title} title_fr={policy.titleFr} />
    </Gutter>
  );
}
