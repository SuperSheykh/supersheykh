import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialog } from "@/hooks/use-dialog";

const DialogProvider = () => {
  const { isOpen, close, title, content: Content, description } = useDialog();

  const onChange = (open: boolean) => {
    if (!open) {
      close();
    }
  };

  if (!Content) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {Content}
      </DialogContent>
    </Dialog>
  );
};

export default DialogProvider;
