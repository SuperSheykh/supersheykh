import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { useTrans } from "@/hooks/use-trans";

interface ProjectCardProps {
  title: string;
  title_fr: string;
  description: string;
  description_fr: string;
  imageUrl: string;
  imageAlt: string;
}

const STACKS = ["React", "Next.js", "TailwindCSS", "PostgreSQL"];

const ProjectCard = ({
  imageAlt,
  imageUrl,
  title,
  title_fr,
  description,
  description_fr,
}: ProjectCardProps) => {
  const t = useTrans();
  return (
    <div className="border-1 border-border hover:border-primary transition ease-in">
      <div className="aspect-video">
        <img src={imageUrl} alt={imageAlt} className="w-full object-cover" />
      </div>
      <div className="text-sm flex flex-wrap gap-4 p-2 md:p-4  border-t">
        {STACKS.map((stack) => (
          <span key={stack}>{stack}</span>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <p className="border-y p-2 md:p-4 text-lg md:text-xl font-bold">
          {t(title, title_fr)}
        </p>
        <p className="p-2 md:p-4 ">{t(description, description_fr)}</p>
        <div className="flex items-center gap-4 p-4">
          <Button variant="outline">
            <Link to={`/portfolio`}>View</Link>
          </Button>
          <Button variant="outline">
            <Link to={`/portfolio`}>Live</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
