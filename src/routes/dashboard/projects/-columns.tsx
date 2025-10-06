import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import type { AppRouter } from "@worker/trpc/router";
import { Delete, Edit } from "lucide-react";

type Project = {
  id: number;
  name: string;
  description: string;
  completion: number;
  url: string;
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
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
    cell: ({}) => (
      <div className="flex gap-x-2 items-center justify-start flex-wrap">
        <Button variant="outline" size="icon" className="hover:text-primary">
          <Edit />
        </Button>
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
