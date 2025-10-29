import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import SectionTitle from "@/components/section-title";
import ProjectCard from "@/components/project-card";

import PageTitle from "@/components/page-title";
import { getLiveProjects } from "actions/projects";
import { ItemGroup } from "@/components/ui/item";

export const Route = createFileRoute("/portfolio/")({
  loader: () => getLiveProjects(),
  component: RouteComponent,
});

function RouteComponent() {
  const projects = useLoaderData({ from: "/portfolio/" });

  return (
    <div className="pb-16">
      <PageTitle title="Portfolio" title_fr="Portfolio" />
      <div className="pt-16">
        <Gutter>
          <SectionTitle title="My Work" title_fr="Mes projets" />
          <ItemGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard {...project} key={project.id} />
            ))}
          </ItemGroup>
        </Gutter>
      </div>
    </div>
  );
}
