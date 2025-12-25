import { createFileRoute, useLoaderData, useNavigate } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import SectionTitle from "@/components/section-title";
import ProjectCard from "@/components/project-card";

import PageTitle from "@/components/page-title";
import { getLiveProjects } from "actions/projects";
import { ItemGroup } from "@/components/ui/item";
import { useTrans } from "@/hooks/use-trans";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Project } from "@/db/schema/projects";

export const Route = createFileRoute("/portfolio/")({
  loader: () => getLiveProjects(),
  staleTime: 60 * 60 * 8, // 8 hours
  component: RouteComponent,
});

function RouteComponent() {
  const allProjects = useLoaderData({ from: "/portfolio/" });
  const t = useTrans();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    allProjects.forEach((project: Project) => {
      if (project.category) {
        uniqueCategories.add(project.category);
      }
    });
    return ["all", ...Array.from(uniqueCategories)];
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return allProjects;
    }
    return allProjects.filter(
      (project: Project) => project.category === activeCategory,
    );
  }, [allProjects, activeCategory]);

  return (
    <div className="pb-16">
      <PageTitle title="Portfolio" title_fr="Portfolio" />
      <div className="pt-16">
        <Gutter>
          <SectionTitle title="My Work" title_fr="Mes projets" />
          <div className="mb-8 flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className={cn(
                  activeCategory === category && "bg-primary text-primary-foreground",
                )}
                onClick={() => setActiveCategory(category)}
              >
                {t(category)}
              </Button>
            ))}
          </div>
          <ItemGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project: Project) => (
              <ProjectCard {...project} key={project.id} />
            ))}
          </ItemGroup>
        </Gutter>
      </div>
    </div>
  );
}
