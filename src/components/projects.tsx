import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Gutter from "./gutter";
import ProjectCard from "./project-card";
import SectionTitle from "./section-title";
const PROJECTS = [
  {
    id: 1,
    title: "Project 1",
    title_fr: "Projet 1",
    description: "Description 1",
    description_fr: "Description 1",
    imageUrl: "/recImg.png",
    imageAlt: "Sekou SIDIBE",
  },
  {
    id: 2,
    title: "Project 2",
    title_fr: "Projet 2",
    description: "Description 2",
    description_fr: "Description 2",
    imageUrl: "/recImg.png",
    imageAlt: "Sekou SIDIBE",
  },
  {
    id: 3,
    title: "Project 3",
    title_fr: "Projet 3",
    description: "Description 3",
    description_fr: "Description 3",
    imageUrl: "/recImg.png",
    imageAlt: "Sekou SIDIBE",
  },
  {
    id: 4,
    title: "Project 4",
    title_fr: "Projet 4",
    description: "Description 4",
    description_fr: "Description 4",
    imageUrl: "/recImg.png",
    imageAlt: "Sekou SIDIBE",
  },
  {
    id: 5,
    title: "Project 5",
    title_fr: "Projet 5",
    description: "Description 5",
    description_fr: "Description 5",
    imageUrl: "/recImg.png",
    imageAlt: "Sekou SIDIBE",
  },
];

const Projects = () => {
  return (
    <Gutter className="space-y-12">
      <SectionTitle
        title="Projects"
        action="View All"
        actionLink="/portfolio"
      />
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex w-max space-x-4">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="w-[300px] md:w-[350px] lg:w-[400px]"
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Gutter>
  );
};

export default Projects;
