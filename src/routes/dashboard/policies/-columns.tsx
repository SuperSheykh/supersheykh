import { ColumnDef } from "@tanstack/react-table";
import TableMoreBtn from "@/components/table-more-btn";
import { deletePolicy } from "actions/policies";
import { useNavigate } from "@tanstack/react-router";
import { Policy } from "@/db/schema/policies";
import { View } from "lucide-react";

export const columns: ColumnDef<Policy>[] = [
  {
    accessorKey: "title",
    header: "Name",
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
      onDelete={() => deletePolicy({ data: { id } })}
      onEdit={() =>
        navigate({
          to: "/dashboard/policies/$id",
          params: { id },
          search: { type: "edit" },
        })
      }
      moreBtn={[
        {
          icon: <View className="mr-2" />,
          label: "View",
          onClick: () =>
            navigate({ to: `/dashboard/policies/$id/view`, params: { id } }),
        },
      ]}
    />
  );
};
