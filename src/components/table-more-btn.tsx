import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { Edit, Trash, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const TableMoreBtn = ({
  onDelete,
  name,
  onEdit,
  setPending,
}: {
  name: string;
  onEdit: () => void;
  onDelete: () => Promise<unknown>;
  setPending?: (pending: boolean) => void;
}) => {
  const navigate = useNavigate();
  const router = useRouter();

  const handleOnEdit = () => {
    if (typeof onEdit === "string") navigate(onEdit);
    else if (typeof onEdit === "function") onEdit();
  };

  const handleOnDelete = () => {
    const toastId = toast.info(
      `Are you sure you want to delete this ${name}?`,
      {
        action: {
          label: "Delete",
          onClick: () => {
            toast.dismiss(toastId);
            if (setPending) setPending(true);

            toast.promise(onDelete(), {
              loading: "Deleting...",
              success: () => {
                router.invalidate();
                return "Deleted!";
              },
              error: "Something went wrong!",
              finally: () => {
                if (setPending) setPending(false);
              },
            });
          },
        },
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuItem onClick={handleOnEdit}>
          <Edit className="mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleOnDelete}>
          <Trash className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableMoreBtn;
