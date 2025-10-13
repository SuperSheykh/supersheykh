import { ColumnDef } from "@tanstack/react-table";
import type { TrpcRouterOutputs } from "@/types";
import TableMoreBtn from "@/components/table-more-btn";
import { delProject } from "actions/projects";
import { useNavigate } from "@tanstack/react-router";

export const columns: ColumnDef<
  TrpcRouterOutputs["projects"]["getAll"][number]
>[] = [
  {
    accessorKey: "title",
    header: "Name",
  },
  {
    accessorKey: "completion",
    header: "Completion",
    cell: ({ row }) => row.original.completion * 100 + "%",
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

const MoreButtons = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  return (
    <TableMoreBtn
      name="project"
      onDelete={() => delProject({ data: { id } })}
      onEdit={() =>
        navigate({
          to: "/dashboard/projects/$projectId",
          params: { projectId: id },
        })
      }
    />
  );
};
