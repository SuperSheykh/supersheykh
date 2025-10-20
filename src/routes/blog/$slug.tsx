import { createFileRoute } from "@tanstack/react-router";
import { getBlogBySlug } from "actions/blogs";
import { z } from "zod";
import ReactMarkdown from "react-markdown";
import { useTrans } from "@/hooks/use-trans";

export const Route = createFileRoute("/blog/$slug")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return getBlogBySlug({ data: { slug: params.slug } });
  },
  validateSearch: z.object({
    lang: z.enum(["en", "fr"]).optional(),
  }),
});

function RouteComponent() {
  const blog = Route.useLoaderData()
  const t = useTrans()

  return (
    <div className="container mx-auto p-4">
      <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden">
        {blog.cover && <img
          src={`/images/${blog.cover}`}
          alt={blog.title}
          className="w-full h-96 object-cover"
        />}
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">
            {t(blog.title, blog.title_fr)}
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>
              {t(blog.content, blog.content_fr)}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
