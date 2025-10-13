import { useState, useCallback } from "react";
import { useTRPC } from "@/lib/trpc";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";
import { useMutation } from "@tanstack/react-query";

const ImageUploader = ({
  onUpload,
}: {
  onUpload: (imageId: string) => void;
  multiple?: boolean;
}) => {
  const trpc = useTRPC();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { mutateAsync } = useMutation(trpc.images.upload.mutationOptions());

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);

    // Convert to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.split(",")[1]; // remove "data:image/png;base64,"
        resolve(base64String);
      };
      reader.onerror = reject;
    });

    // Upload via TRPC
    const uploaded = await mutateAsync({
      file: base64,
      contentType: file.type,
    });

    toast.promise(mutateAsync({ file: base64, contentType: file.type }), {
      loading: "Uploading...",
      success: () => {
        onUpload(uploaded.id);
        return "Image uploaded successfully!";
      },
      error: "Failed to upload image",
      finally: () => {
        setIsUploading(false);
        setFile(null);
      },
    });
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-md cursor-pointer",
          "min-h-[200px] transition-colors duration-200 ease-in-out",
          isDragActive
            ? "border-primary bg-primary/10 text-primary"
            : "border-border  hover:border-gray-400 bg-background",
        )}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="max-h-[300px] max-w-full object-contain rounded-md"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        ) : isDragActive ? (
          <p className="text-lg font-medium">Drop the files here ...</p>
        ) : (
          <div className="flex flex-col items-center space-y-2 text-center">
            <ImageIcon className="h-8 w-8" />
            <p className="text-base font-medium">
              Drag 'n' drop some files here, or click to select files
            </p>
            <p className="text-sm text-muted-foreground">
              Only image files are accepted
            </p>
          </div>
        )}
      </div>
      {file && (
        <div className="flex justify-end">
          <Button onClick={handleUpload} disabled={isUploading}>
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? <Spinner /> : "Upload"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
