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

const ProjectCard = ({
  id,
  cover,
  title,
  title_fr,
  description,
  description_fr,
  live,
  github,
}: TrpcRouterOutputs["projects"]["getAll"][number]) => {
  const t = useTrans();
  return (
    <Item className="hover:shadow-md border-border hover:border-accent rounded-none">
      <ItemHeader>
        <Link
          to="/portfolio/$projectId"
          params={{ projectId: id }}
          className="w-full"
        >
          <img
            src={`/images/${cover}`}
            alt={title}
            className="aspect-video w-full object-cover"
          />
        </Link>
      </ItemHeader>
      <ItemContent>
        <Link
          to="/portfolio/$projectId"
          params={{ projectId: id }}
          className="w-full"
        >
          <ItemTitle className="text-lg justify-start font-semibold">
            {t(title, title_fr)}
          </ItemTitle>
        </Link>
        <ItemSeparator />
        <ItemDescription className="pt-2 pb-4 h-20">
          {t(description, description_fr)}
        </ItemDescription>
        <ItemActions>
          {github && (
            <Button variant="outline" asChild>
              <a href={github} target="_blank" rel="noreferrer">
                Github
              </a>
            </Button>
          )}
          {live && (
            <Button variant="outline" asChild>
              <a href={live} target="_blank" rel="noreferrer">
                Live
              </a>
            </Button>
          )}
        </ItemActions>
      </ItemContent>
    </Item>
  );
};

export default ProjectCard;
