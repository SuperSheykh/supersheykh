import { createFileRoute } from "@tanstack/react-router";
import { getBlogBySlug } from "actions/blogs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Blog } from "@/db/schema/blogs";
import { z } from "zod";
import ReactMarkdown from "react-markdown";

export const Route = createFileRoute("/blog/$slug")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return getBlogBySlug({ slug: params.slug });
  },
  validateSearch: z.object({
    lang: z.enum(["en", "fr"]).optional(),
  }),
});

function RouteComponent() {
  const blog = Route.useLoaderData() as Blog;
  const { lang } = Route.useSearch();

  return (
    <div className="container mx-auto p-4">
      <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden">
        <img
          src={blog.cover}
          alt={blog.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">
            {lang === "fr" ? blog.title_fr : blog.title}
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>
              {lang === "fr" ? blog.content_fr : blog.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}