import Gutter from "@/components/gutter";
import { Button } from "@/components/ui/button";
import MDRenderer from "@/components/ui/md-renderer";
import { useTrans } from "@/hooks/use-trans";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getBlogBySlug } from "actions/blogs";

export const Route = createFileRoute("/dashboard/blogs/$slug/view")({
  loader: ({ params }) => getBlogBySlug({ data: { slug: params.slug } }),
  component: RouteComponent,
});

function RouteComponent() {
  const blog = Route.useLoaderData();
  const t = useTrans();
  return (
    <Gutter className="space-y-8 mt-8">
      <Button variant="outline" asChild>
        <Link
          to="/dashboard/blogs/$slug"
          search={{ type: "edit" }}
          params={{ slug: blog.slug }}
          className="text-primary hover:underline"
        >
          Edit
        </Link>
      </Button>
      <img
        src={`/images/${blog.cover}`}
        alt={blog.title}
        className="w-full h-96"
      />
      <h1 className="text-4xl font-bold mb-4">
        {t(blog.title, blog.title_fr)}
      </h1>
      <MDRenderer source={t(blog.content, blog.content_fr) ?? ""} />
    </Gutter>
  );
}
