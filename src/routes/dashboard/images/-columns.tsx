import { ColumnDef } from "@tanstack/react-table";
import { TrpcRouterOutputs } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import TableMoreBtn from "@/components/table-more-btn";
import { useTRPC } from "@/lib/trpc";

type Image = TrpcRouterOutputs["images"]["list"][number];

export const columns: ColumnDef<Image>[] = [
  {
    accessorKey: "preview",
    header: "Preview",
    cell: ({ row }) => (
      <img
        src={row.original.url}
        alt={row.original.filename}
        className="h-16 w-16 rounded-md object-cover"
      />
    ),
  },
  {
    accessorKey: "filename",
    header: "Filename",
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => (
      <a href={row.original.url} target="_blank" rel="noreferrer" className="hover:underline">
        {row.original.url}
      </a>
    ),
  },
  {
    accessorKey: "uploadedAt",
    header: "Uploaded At",
    cell: ({ row }) => new Date(row.original.uploadedAt).toLocaleDateString(),
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
  const removeImage = trpc.images.remove.useMutation();

  return (
    <TableMoreBtn
      name="image"
      onDelete={() => removeImage.mutateAsync({ id })}
      onEdit={() =>
        navigate({
          to: "/dashboard/images/$imageId",
          params: { imageId: id },
        })
      }
    />
  );
};
