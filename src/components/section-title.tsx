import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useTrans } from "@/hooks/use-trans";

const SectionTitle = ({
  title,
  title_fr,
  action,
  actionLink,
}: {
  title: string;
  title_fr?: string;
  action?: string;
  actionLink?: string;
}) => {
  const t = useTrans();
  return (
    <div className="flex items-center gap-4 mb-12">
      <h2 className="text-2xl md:text-3xl font-bold">
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
