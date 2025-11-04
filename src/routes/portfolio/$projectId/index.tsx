import { createFileRoute } from "@tanstack/react-router";
import { getProject } from "actions/projects";
import { Project } from "@/db/schema/projects";
import { z } from "zod";
import MDRenderer from "@/components/ui/md-renderer"; // Import MDRenderer
import PageLoading from "@/components/page-loading";
import Gutter from "@/components/gutter";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { GithubIcon, GlobeIcon } from "lucide-react";
import { useTrans } from "@/hooks/use-trans";

export const Route = createFileRoute("/portfolio/$projectId/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return getProject({ data: { id: params.projectId } });
  },
  validateSearch: z.object({
    lang: z.enum(["en", "fr"]).optional(),
  }),
  pendingComponent: PageLoading,
});

function RouteComponent() {
  const project = Route.useLoaderData() as Project;
  const { lang } = Route.useSearch();
  const t = useTrans();

  return (
    <Gutter className="space-y-8 py-8">
      <img
        src={`/images/${project.cover}`}
        alt={project.title}
        className="w-full h-64 object-cover"
      />
      <h1 className="text-3xl font-bold mb-4">
        {lang === "fr" ? project.title_fr : project.title}
      </h1>
      <div className="flex items-center mb-4">
        <Progress value={project.completion * 100} className="mr-2" />
        <span className="ml-2 text-sm font-medium">{project.completion}%</span>
      </div>
      <div className="text-muted-foreground mb-4">
        {" "}
        {/* Changed p to div to wrap MDRenderer */}
        <MDRenderer
          source={lang === "fr" ? project.description_fr : project.description}
        />
      </div>
      <div className="flex gap-2">
        {project.github && (
          <Button variant="outline" asChild>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              <GithubIcon className="mr-2" />
              Github
            </a>
          </Button>
        )}
        {project.live && (
          <Button variant="outline" asChild>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              <GlobeIcon className="mr-2" />
              {t("Live", "En ligne")}
            </a>
          </Button>
        )}
      </div>
    </Gutter>
  );
}
