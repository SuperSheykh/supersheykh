import { ColumnDef } from "@tanstack/react-table";
import { TrpcRouterOutputs } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import TableMoreBtn from "@/components/table-more-btn";
import { useTRPC } from "@/lib/trpc";
import { useMutation } from "@tanstack/react-query";

type Image = TrpcRouterOutputs["images"]["list"][number];

export const columns: ColumnDef<Image>[] = [
  {
    accessorKey: "key",
    header: "Key",
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
  const trpc = useTRPC();
  const { mutateAsync: removeImage } = useMutation(
    trpc.images.remove.mutationOptions(),
  );

  return (
    <TableMoreBtn
      name="image"
      onDelete={() => removeImage({ id })}
      onEdit={() =>
        navigate({
          to: "/dashboard/images/$imageId",
          params: { imageId: id },
        })
      }
    />
  );
};
