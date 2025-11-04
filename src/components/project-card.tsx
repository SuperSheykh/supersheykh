import { useEffect, useState } from "react";
import { Progress } from "./ui/progress"; // Import Progress component
import {
  Item,
  ItemHeader,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemSeparator,
} from "@/components/ui/item";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { TrpcRouterOutputs } from "@/types";
import { useTrans } from "@/hooks/use-trans";
import { GithubIcon, GlobeIcon } from "lucide-react";

const ProjectCard = ({
  id,
  cover,
  title,
  title_fr,
  description,
  description_fr,
  live,
  github,
  productLink,
  completion, // Add completion prop
}: TrpcRouterOutputs["projects"]["getAll"][number]) => {
  // Update type definition
  const t = useTrans();
  const [progress, setProgress] = useState(0);

  console.log("completion", completion);

  useEffect(() => {
    setProgress(completion);
  }, [completion]);

  return (
    <Item className="group hover:shadow-md border-border hover:border-accent rounded-none">
      <ItemHeader>
        <Link
          to="/portfolio/$projectId"
          params={{ projectId: id }}
          className="w-full"
        >
          <img
            src={`/images/${cover}`}
            alt={title}
            className="transition ease-in-out aspect-video w-full object-cover group-hover:scale-105"
          />
        </Link>
      </ItemHeader>
      <ItemContent className="space-y-2">
        <Link
          to="/portfolio/$projectId"
          params={{ projectId: id }}
          className="w-full"
        >
          <ItemTitle className="text-lg justify-start font-semibold group-hover:underline group-hover:font-bold">
            {t(title, title_fr)}
          </ItemTitle>
        </Link>
        <ItemSeparator />
        <ItemDescription className="pt-2 text-sm pb-4 line-clamp-2">
          {t(description, description_fr)}
        </ItemDescription>
        <Progress value={progress * 100} className="mt-2" />
        {/* Render Progress bar */}
        <ItemActions>
          {github && (
            <Button variant="outline" asChild>
              <a href={github} target="_blank" rel="noreferrer">
                <GithubIcon className="mr-2" />
                GitHub
              </a>
            </Button>
          )}
          {live && productLink && (
            <Button variant="outline" asChild>
              <a href={productLink} target="_blank" rel="noreferrer">
                <GlobeIcon className="mr-2" />
                {t("Live", "En ligne")}
              </a>
            </Button>
          )}
        </ItemActions>
      </ItemContent>
    </Item>
  );
};

export default ProjectCard;
