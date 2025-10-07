
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { TrpcRouterOutputs } from "@/types";
import { ArrowUpDown, Delete, Edit } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Blog = TrpcRouterOutputs["blogs"]["getAll"][number];

export const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex gap-x-2 items-center justify-start flex-wrap">
        <Link
          to={"/dashboard/blogs/$blogId"}
          params={{ blogId: row.original.id }}
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
