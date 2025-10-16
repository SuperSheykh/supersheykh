import PageTitle from "@/components/page-title";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./-columns";
import PageLoading from "@/components/page-loading";
import { getAllSkills } from "actions/skills/get-all";
import { useDialog } from "@/hooks/use-dialog";
import SkillCategoryForm from "@/components/form-skill-category";
import { Plus } from "lucide-react";
import SkillForm from "@/components/form-skill";

export const Route = createFileRoute("/dashboard/skills/")({
  loader: () => getAllSkills(),
  component: RouteComponent,
  pendingComponent: PageLoading,
});

function RouteComponent() {
  const data = useLoaderData({ from: "/dashboard/skills/" }) ?? [];
  const open = useDialog((state) => state.open);

  return (
    <Gutter>
      <PageTitle
        title="Skill Categories"
        description="Skills I want to display on my portfolio."
      />
      <DataTable
        columns={columns}
        data={data ?? []}
        onAdd={() =>
          open({
            title: "Add Skill",
            description: "Create a new skill",
            content: <SkillForm />,
          })
        }
        moreBtn={[
          {
            label: "Add Category",
            onClick: () =>
              open({
                title: "Add Category",
                description: "Create a new category",
                content: <SkillCategoryForm />,
              }),
            icon: <Plus className="mr-2" />,
          },
        ]}
      />
    </Gutter>
  );
}
