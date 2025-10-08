import { createFileRoute, useParams } from "@tanstack/react-router";
import { trpc } from "@/lib/utils/trpc";

import PageLoading from "@/components/page-loading";
import SocialForm from "./-form";
import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";

export const Route = createFileRoute("/dashboard/socials/$socialId/")({
  component: RouteComponent,
  handle: {
    crumb: (params: { socialId: string }) =>
      params.socialId === "new" ? "New Social" : `Edit Social`,
  },
});

function RouteComponent() {
  const { socialId } = useParams({ from: "/dashboard/socials/$socialId" });
  const isNew = socialId === "new";
  const { data, isLoading } = trpc.socials.get.useQuery(socialId, {
    enabled: !isNew,
  });

  if (isLoading && !isNew) return <PageLoading />;

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={data ? "Edit" : "Create"}
        description={data ? "Edit the social" : "Create a new social"}
      />
      <SocialForm social={data ?? null} />
    </Gutter>
  );
}
