import { createFileRoute } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import SectionTitle from "@/components/section-title";
import { ItemGroup } from "@/components/ui/item";

export const Route = createFileRoute("/blog/")({
  loader: () => getLiveBlogs(),
  component: RouteComponent,
});

import PageTitle from "@/components/page-title";
import BlogCard from "@/components/blog-card";
import { getLiveBlogs } from "actions/blogs";

function RouteComponent() {
  const data = Route.useLoaderData();
  console.log("data:", data);

  return (
    <div className="pb-16">
      <PageTitle title="Blog" title_fr="Blog" />
      <div className="pt-16">
        <Gutter>
          <SectionTitle title="All Posts" title_fr="Tous les articles" />
          <ItemGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </ItemGroup>
        </Gutter>
      </div>
    </div>
  );
}
