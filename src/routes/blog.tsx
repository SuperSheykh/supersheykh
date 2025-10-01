import { Link, createFileRoute } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import SectionTitle from "@/components/section-title";
import { Button } from "@/components/ui/button";

const BLOG_POSTS = [
  {
    id: 1,
    slug: "my-first-blog-post",
    title: "My First Blog Post",
    title_fr: "Mon premier article de blog",
    excerpt: "This is the excerpt for my first blog post.",
    excerpt_fr: "Ceci est l'extrait de mon premier article de blog.",
    imageUrl: "/recImg.png",
  },
  {
    id: 2,
    slug: "my-second-blog-post",
    title: "My Second Blog Post",
    title_fr: "Mon deuxième article de blog",
    excerpt: "This is the excerpt for my second blog post.",
    excerpt_fr: "Ceci est l'extrait de mon deuxième article de blog.",
    imageUrl: "/recImg.png",
  },
];

export const Route = createFileRoute("/blog")({
  component: RouteComponent,
});

import PageTitle from "@/components/page-title";

// ... other imports

function RouteComponent() {
  return (
    <div className="pb-16">
      <PageTitle title="Blog" title_fr="Blog" />
      <div className="pt-16">
        <Gutter>
          <SectionTitle title="All Posts" title_fr="Tous les articles" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <div
                key={post.id}
                className="border border-border rounded-lg overflow-hidden"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Button asChild variant="outline">
                    <Link to={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Gutter>
      </div>
    </div>
  );
}