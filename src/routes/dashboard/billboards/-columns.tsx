import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { TrpcRouterOutputs } from "@/types";
import { ArrowUpDown, Delete, Edit } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Billboard = TrpcRouterOutputs["billboards"]["getAll"][number];

export const columns: ColumnDef<Billboard>[] = [
  {
    accessorKey: "greeting",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Greeting
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex gap-x-2 items-center justify-start flex-wrap">
        <Link
          to={"/dashboard/billboards/$billboardId"}
          params={{ billboardId: row.original.id }}
        >
          <Button variant="outline" size="icon" className="hover:text-primary">
            <Edit />
          </Button>
        </Link>
        <Button
          variant="outline"
          size="icon"
          className="hover:text-destructive"
        >
          <Delete />
        </Button>
      </div>
    ),
  },
];