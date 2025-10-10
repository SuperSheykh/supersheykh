import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Spinner } from "./ui/spinner";

type FormButtonsProps = {
  isPending: boolean;
  onCancel?: () => void;
  texts?: {
    save?: string;
    saving?: string;
    cancel?: string;
  };
};

export function FormButtons({ isPending, onCancel, texts }: FormButtonsProps) {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate({ to: ".." });
    }
  };

  return (
    <div className="flex items-center justify-end gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={handleCancel}
        disabled={isPending}
      >
        {texts?.cancel ?? "Cancel"}
      </Button>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Spinner className="mr-2" />
            {texts?.saving ?? "Submitting..."}
          </>
        ) : (
          (texts?.save ?? "Submit")
        )}
      </Button>
    </div>
  );
}