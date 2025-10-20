
import { ColumnDef } from "@tanstack/react-table";
import { TrpcRouterOutputs } from "@/types";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import TableMoreBtn from "@/components/table-more-btn";
import { delSocial } from "actions/socials";
import { Button } from "@/components/ui/button";

type Social = TrpcRouterOutputs["socials"]["getAll"][number];

export const columns: ColumnDef<Social>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
      name="social"
      onDelete={() => delSocial({ data: { id } })}
      onEdit={() =>
        navigate({
          to: "/dashboard/socials/$socialId",
          params: { socialId: id },
        })
      }
    />
  );
};
