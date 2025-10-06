import { Skeleton } from "@/components/ui/skeleton";

const PageLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
};

export default PageLoading;
