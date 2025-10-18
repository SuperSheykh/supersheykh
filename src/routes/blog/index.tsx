import { createFileRoute } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import SectionTitle from "@/components/section-title";
import { ItemGroup } from "@/components/ui/item";

export const Route = createFileRoute("/blog/")({
  component: RouteComponent,
});

import PageTitle from "@/components/page-title";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/router";
import BlogCard from "@/components/blog-card";

function RouteComponent() {
  const { data } = useQuery(trpc.blogs.getAll.queryOptions());

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
