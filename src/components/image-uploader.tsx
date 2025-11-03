import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";
import { deleteR2Image } from "actions/images/delete-r2-image";

const uploadFile = async (formData: FormData) => {
  const res = await fetch("/api/bucket", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("Failed to upload image");
  }

  const data = (await res.json()) as { key: string };
  return data;
};

const ImageUploader = ({
  value,
  onChange,
  multiple,
}: {
  value?: string | null; // Being the image r2 bucket key.
  onChange?: (imageId: string) => void;
  multiple?: boolean;
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are accepted");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      setIsUploading(true);
      toast.promise(uploadFile(formData), {
        loading: "Uploading...",
        success: ({ key }) => {
          onChange?.(key);
          return "Uploaded!";
        },
        error: (error) => {
          console.error(error.message);
          return error.message;
        },
        finally: () => {
          setIsUploading(false);
        },
      });
    },
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] },
    multiple: multiple || false,
    disabled: isUploading,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!value) return;
    toast.promise(deleteR2Image({ data: { key: value } }), {
      loading: "Deleting...",
      success: () => {
        onChange?.("");
        return "Deleted!";
      },
      error: "Something went wrong!",
    });
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-none cursor-pointer",
          "min-h-[200px] transition-colors duration-200 ease-in-out",
          isDragActive
            ? "border-primary bg-primary/10 text-primary"
            : "border-border  hover:border-gray-400 bg-background",
          isUploading && "cursor-not-allowed",
        )}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <Spinner className="h-10 w-10" />
        ) : value ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={`/api/bucket/${value}`} // could also be /api/${value}
              alt="Preview"
              className="max-h-[300px] max-w-full object-contain rounded-md"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 hover:bg-destructive hover:text-destructive-foreground"
              onClick={handleRemove}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        ) : isDragActive ? (
          <p className="text-lg font-medium">Drop the files here ...</p>
        ) : (
          <div className="flex flex-col items-center space-y-2 text-center">
            <ImageIcon className="h-8 w-8" />
            <p className="text-sm font-normal">
              Drag 'n' drop some files here, or click to select files
            </p>
            <p className="text-sm text-muted-foreground">
              Only image files are accepted
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
