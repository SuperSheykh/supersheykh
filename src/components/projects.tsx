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
];

const Projects = () => {
  return (
    <Gutter className="space-y-12">
      <SectionTitle
        title="Projects"
        action="View All"
        actionLink="/portfolio"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </Gutter>
  );
};

export default Projects;
