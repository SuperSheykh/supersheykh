import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Gutter from "./gutter";
import SectionTitle from "./section-title";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/router";
import { ItemGroup } from "@/components/ui/item";
import ProjectCard from "./project-card";
const Projects = () => {
  const { data } = useQuery(trpc.projects.getAll.queryOptions());

  return (
    <Gutter className="space-y-12">
      <SectionTitle
        title="Projects"
        action="View All"
        actionLink="/portfolio"
      />
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <ItemGroup className="flex w-max flex-row space-x-4">
          {data?.map((project) => (
            <div className="w-[350px]" key={project.id}>
              <ProjectCard {...project} />
            </div>
          ))}
        </ItemGroup>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Gutter>
  );
};

export default Projects;
