import { createFileRoute } from "@tanstack/react-router";
import { getProject } from "actions/projects";
import { Project } from "@/db/schema/projects";
import { z } from "zod";

export const Route = createFileRoute("/portfolio/$projectId/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return getProject({ data: { id: params.projectId } });
  },
  validateSearch: z.object({
    lang: z.enum(["en", "fr"]).optional(),
  }),
});

function RouteComponent() {
  const project = Route.useLoaderData() as Project;
  const { lang } = Route.useSearch();

  return (
    <div className="container mx-auto p-4">
      <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden">
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">
            {lang === "fr" ? project.title_fr : project.title}
          </h1>
          <p className="text-muted-foreground mb-4">
            {lang === "fr" ? project.description_fr : project.description}
          </p>
          <div className="flex items-center mb-4">
            <span className="text-sm font-medium mr-2">Completion:</span>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${project.completion}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm font-medium">
              {project.completion}%
            </span>
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
