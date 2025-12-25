import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useTrans } from "@/hooks/use-trans";
import { cn } from "@/lib/utils";

const SectionTitle = ({
  title,
  title_fr,
  action,
  actionLink,
  className,
}: {
  title: string;
  title_fr?: string;
  action?: string;
  actionLink?: string;
  className?: string;
}) => {
  const t = useTrans();
  return (
    <div
      className={cn(
        "flex items-center flex-col justify-center gap-4 mb-12",
        className,
      )}
    >
      <h2 className="text-3xl md:text-5xl font-bold">
        <span className="text-primary mr-0.5">#</span>
        {t(title, title_fr)}
      </h2>
      <div className="w-1/3 h-0.5 bg-primary" />
      {action && actionLink && (
        <Button asChild variant="link" className="ml-auto text-foreground">
          <span className="flex items-center gap-2">
            <Link to={actionLink}>{action}</Link>
            <ArrowRightIcon />
          </span>
        </Button>
      )}
    </div>
  );
};

export default SectionTitle;
