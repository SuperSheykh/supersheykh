import { createFileRoute, useParams } from "@tanstack/react-router";
import { trpc } from "@/lib/utils/trpc";

import PageLoading from "@/components/page-loading";
import SkillForm from "./$skillId/-form";
import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";

export const Route = createFileRoute("/dashboard/skills/$skillId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { skillId } = useParams({ from: "/dashboard/skills/$skillId" });
  const isNew = skillId === "new";
  // const { data, isLoading } = trpc.skills.get.useQuery(skillId, {
  //   enabled: !isNew,
  // });

  // if (isLoading && !isNew) return <PageLoading />;

  return (
    <Gutter className="space-y-8">
      <PageTitle
        title={false ? "Edit" : "Create"}
        description={false ? "Edit the skill" : "Create a new skill"}
      />
      <SkillForm skill={null} />
    </Gutter>
  );
}

