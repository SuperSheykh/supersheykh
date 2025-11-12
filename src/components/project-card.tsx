import { useEffect, useState } from "react";
import { Progress } from "./ui/progress"; // Import Progress component
import {
  Item,
  ItemHeader,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemSeparator,
  ItemActions,
} from "@/components/ui/item";
import { Link } from "@tanstack/react-router";
import { TrpcRouterOutputs } from "@/types";
import { useTrans } from "@/hooks/use-trans";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Github, GithubIcon, GlobeIcon } from "lucide-react";

const ProjectCard = ({
  id,
  cover,
  title,
  title_fr,
  description,
  description_fr,
  completion, // Add completion prop
  github,
  productLink,
  className,
}: TrpcRouterOutputs["projects"]["getAll"][number] & {
  className?: ClassNameValue;
}) => {
  // Update type definition
  const t = useTrans();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(completion);
  }, [completion]);

  return (
    <Link
      to="/portfolio/$projectId"
      params={{ projectId: id }}
      className={cn(
        "w-full flex flex-col justify-center items-center",
        className,
      )}
    >
      <Item
        className={cn(
          "group transition hover:shadow-md border-border hover:border-primary rounded-none",
        )}
      >
        <ItemHeader className="w-full h-50 overflow-hidden">
          <img
            src={`/images/${cover}`}
            alt={title}
            className="transition ease-in-out aspect-video w-full object-cover group-hover:scale-105"
          />
        </ItemHeader>
        <ItemContent className="space-y-2">
          <ItemTitle className="text-lg capitalize justify-start line-clamp-1 font-semibold group-hover:font-bold">
            {t(title, title_fr)}
          </ItemTitle>
          <ItemSeparator />
          <Progress value={progress * 100} className="mt-2" />
          <ItemDescription className="line-clamp-2 min-h-[3rem]">
            {t(description, description_fr)}
          </ItemDescription>
          <ItemActions>
            {github && (
              <Button asChild>
                <a href={github} target="_blank" rel="noreferrer">
                  <Github className="mr-2" />
                  {t("GitHub", "GitHub")}
                </a>
              </Button>
            )}
            {productLink && (
              <Button asChild>
                <a href={productLink} target="_blank" rel="noreferrer">
                  <GlobeIcon className="mr-2" />
                  {t("See live", "En ligne")}
                </a>
              </Button>
            )}
          </ItemActions>
        </ItemContent>
      </Item>
    </Link>
  );
};

export default ProjectCard;
