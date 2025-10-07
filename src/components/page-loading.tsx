import { Skeleton } from "@/components/ui/skeleton";
import Gutter from "@/components/gutter";

const PageLoading = () => {
  return (
    <Gutter className="flex flex-col gap-y-6 py-8 ">
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
    </Gutter>
  );
};

export default PageLoading;
