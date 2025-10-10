import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { TrpcRouterOutputs } from "@/types";
import { ArrowUpDown, Delete, Edit } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Quote = TrpcRouterOutputs["quotes"]["getAll"][number];

export const columns: ColumnDef<Quote>[] = [
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "live",
    header: "Live",
    cell: ({ row }) => (row.original.live ? "Yes" : "No"),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex gap-x-2 items-center justify-start flex-wrap">
        <Link
          to={"/dashboard/quotes/$quoteId"}
          params={{ quoteId: row.original.id }}
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
