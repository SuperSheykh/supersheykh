import { createFileRoute } from "@tanstack/react-router";
import { getBlogBySlug } from "actions/blogs";
import { z } from "zod";
import { useTrans } from "@/hooks/use-trans";
import Gutter from "@/components/gutter";
import MDRenderer from "@/components/ui/md-renderer";

export const Route = createFileRoute("/blog/$slug")({
  component: RouteComponent,
  loader: ({ params }) => getBlogBySlug({ data: { slug: params.slug } }),
  // head: ({ params }) => {
  //   return {
  //     meta: {
  //       title: "Blog",
  //     },
  //   };
  // },
  validateSearch: z.object({
    lang: z.enum(["en", "fr"]).optional(),
  }),
});

function RouteComponent() {
  const blog = Route.useLoaderData();
  const t = useTrans();

  return (
    <Gutter className="space-y-8 py-8">
      {blog.cover && (
        <img
          src={`/images/${blog.cover}`}
          alt={blog.title}
          className="w-full h-96 object-cover"
        />
      )}
      <div className="py-6 space-y-4">
        <MDRenderer source={t(blog.content, blog.content_fr) ?? ""} />
      </div>
    </Gutter>
  );
}
