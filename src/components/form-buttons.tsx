import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Spinner } from "./ui/spinner";
import { Download, RefreshCcw } from "lucide-react";
import { useDialog } from "@/hooks/use-dialog";

type FormButtonsProps = {
  isPending: boolean;
  onCancel?: () => void;
  texts?: {
    save?: string;
    saving?: string;
    cancel?: string;
  };
  inDialog?: boolean;
};

export function FormButtons({
  isPending,
  onCancel,
  texts,
  inDialog,
}: FormButtonsProps) {
  const navigate = useNavigate();
  const { close } = useDialog();

  const handleCancel = () => {
    if (inDialog) {
      close();
    } else if (onCancel) {
      onCancel();
    } else {
      navigate({ to: ".." });
    }
  };

  return (
    <div className="grid grid-cols-2 md:flex md:items-center justify-end gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={handleCancel}
        disabled={isPending}
      >
        <RefreshCcw className="mr-2" />
        {texts?.cancel ?? "Cancel"}
      </Button>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Spinner className="mr-2" />
            {texts?.saving ?? "Submitting..."}
          </>
        ) : (
          <>
            <Download className="mr-2" />
            {texts?.save ?? "Submit"}
          </>
        )}
      </Button>
    </div>
  );
}
