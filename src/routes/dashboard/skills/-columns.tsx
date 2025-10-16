import { ColumnDef } from "@tanstack/react-table";
import TableMoreBtn from "@/components/table-more-btn";
import { delSkill } from "actions/skills";
import { Button } from "@/components/ui/button";
import { Skill, SkillCategory } from "@/db/schema/skills";
import { useDialog } from "@/hooks/use-dialog";
import SkillForm from "@/components/form-skill";
import SkillCategoryForm from "@/components/form-skill-category";

type SkillCategoryWithSkills = SkillCategory & {
  skills: Skill[];
};

export const columns: ColumnDef<SkillCategoryWithSkills>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.name}</p>
        <div className="flex flex-wrap gap-x-2 mt-2">
          {row.original.skills.map((skill) => (
            <SkillBtn key={skill.id} id={skill.id} name={skill.name} />
          ))}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex gap-x-2 items-center justify-start flex-wrap">
        <MoreButtons id={row.original.id} />
      </div>
    ),
  },
];

const SkillBtn = ({ id, name }: { id: string; name: string }) => {
  const open = useDialog((state) => state.open);

  return (
    <Button
      variant="secondary"
      size="sm"
      className="cursor-pointer"
      onClick={() =>
        open({
          title: "Edit Skill",
          description: "Edit an existing skill",
          content: <SkillForm id={id} />,
        })
      }
    >
      {name}
    </Button>
  );
};

const MoreButtons = ({ id }: { id: string }) => {
  const open = useDialog((state) => state.open);

  return (
    <TableMoreBtn
      name="skill"
      onDelete={() => delSkill({ data: { id } })}
      onEdit={() =>
        open({
          title: "Edit Skill",
          description: "Create a new skill",
          content: <SkillCategoryForm id={id} />,
        })
      }
    />
  );
};
