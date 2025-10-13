import { ColumnDef } from "@tanstack/react-table";
import { TrpcRouterOutputs } from "@/types";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import TableMoreBtn from "@/components/table-more-btn";
import { delBlog } from "actions/blogs";
import { Button } from "@/components/ui/button";

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
        <MoreButtons id={row.original.id} />
      </div>
    ),
  },
];

const MoreButtons = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  return (
    <TableMoreBtn
      name="blog"
      onDelete={() => delBlog({ data: { id } })}
      onEdit={() =>
        navigate({
          to: "/dashboard/blogs/$blogId",
          params: { blogId: id },
        })
      }
    />
  );
};
