import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { TrpcRouterOutputs } from "@/types";
import { ArrowUpDown, Delete, Edit } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import TableMoreBtn from "@/components/table-more-btn";
import { delBillboard } from "actions/billboards";

type Billboard = TrpcRouterOutputs["billboards"]["getAll"][number];

export const columns: ColumnDef<Billboard>[] = [
  {
    accessorKey: "title",
    header: "Title",
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
      name="billboard"
      onDelete={() => delBillboard({ data: { id } })}
      onEdit={() =>
        navigate({
          to: "/dashboard/billboards/$billboardId",
          params: { billboardId: id },
        })
      }
    />
  );
};

