import { createFileRoute, useParams } from "@tanstack/react-router";
import { useTRPC } from "@/lib/utils/trpc";

import PageLoading from "@/components/page-loading";
import SkillForm from "./$skillId/-form";
import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/dashboard/skills/$skillId")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { skillId } = useParams({ from: "/dashboard/skills/$skillId" });
  const isNew = skillId === "new";
  const { data, isLoading } = useQuery(
    trpc.skills.get.queryOptions(skillId, {
      enabled: !isNew,
    }),
  );

  if (isLoading && !isNew) return <PageLoading />;

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={data ? "Edit" : "Create"}
        description={data ? "Edit the skill" : "Create a new skill"}
      />
      <SkillForm skill={data ?? null} />
    </Gutter>
  );
}
