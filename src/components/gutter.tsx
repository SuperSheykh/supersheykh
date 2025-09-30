import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

const Gutter = ({
  children,
  className,
}: {
  className?: ClassNameValue;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn(["px-4 lg:px-8 max-w-screen-2xl mx-auto", className])}>
      {children}
    </div>
  );
};

export default Gutter;
