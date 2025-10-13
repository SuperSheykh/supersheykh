import { ColumnDef } from "@tanstack/react-table";
import { TrpcRouterOutputs } from "@/types";
import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import TableMoreBtn from "@/components/table-more-btn";
import { delQuote } from "actions/quotes";
import { Button } from "@/components/ui/button";

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
        <MoreButtons id={row.original.id} />
      </div>
    ),
  },
];

const MoreButtons = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  return (
    <TableMoreBtn
      name="quote"
      onDelete={() => delQuote({ data: { id } })}
      onEdit={() =>
        navigate({
          to: "/dashboard/quotes/$quoteId",
          params: { quoteId: id },
        })
      }
    />
  );
};
