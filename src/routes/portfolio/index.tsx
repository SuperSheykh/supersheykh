import { Link, createFileRoute, Outlet } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import SectionTitle from "@/components/section-title";
import ProjectCard from "@/components/project-card";

const PROJECTS = [
  {
    id: "043b5b40-c0ce-47cc-880e-f3b58209e47e",
    title: "Project 1",
    title_fr: "Projet 1",
    description: "Description 1",
    description_fr: "Description 1",
    imageUrl: "/recImg.png",
    imageAlt: "Sekou SIDIBE",
  },
  {
    id: "043b5b40-c0ce-47cc-880e-f3b58209e47f",
    title: "Project 2",
    title_fr: "Projet 2",
    description: "Description 2",
    description_fr: "Description 2",
    imageUrl: "/recImg.png",
    imageAlt: "Sekou SIDIBE",
  },
  {
    id: "043b5b40-c0ce-47cc-880e-f3b58209e480",
    title: "Project 3",
    title_fr: "Projet 3",
    description: "Description 3",
    description_fr: "Description 3",
    imageUrl: "/recImg.png",
    imageAlt: "Sekou SIDIBE",
  },
  {
    id: "043b5b40-c0ce-47cc-880e-f3b58209e481",
    title: "Project 4",
    title_fr: "Projet 4",
    description: "Description 4",
    description_fr: "Description 4",
    imageUrl: "/recImg.png",
    imageAlt: "Sekou SIDIBE",
  },
  {
    id: "043b5b40-c0ce-47cc-880e-f3b58209e482",
    title: "Project 5",
    title_fr: "Projet 5",
    description: "Description 5",
    description_fr: "Description 5",
    imageUrl: "/recImg.png",
    imageAlt: "Sekou SIDIBE",
  },
];

export const Route = createFileRoute("/portfolio/")({
  component: RouteComponent,
});

import PageTitle from "@/components/page-title";

// ... other imports

function RouteComponent() {
  return (
    <div className="pb-16">
      <PageTitle title="Portfolio" title_fr="Portfolio" />
      <div className="pt-16">
        <Gutter>
          <SectionTitle title="My Work" title_fr="Mes projets" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <Link
                to={`/portfolio/$projectId`}
                params={{ projectId: project.id }}
                key={project.id}
              >
                <ProjectCard {...project} />
              </Link>
            ))}
          </div>
        </Gutter>
      </div>
    </div>
  );
}
