import { createFileRoute } from "@tanstack/react-router";
import Gutter from "@/components/gutter";

const BLOG_POSTS = [
  {
    id: 1,
    slug: "my-first-blog-post",
    title: "My First Blog Post",
    content: "This is the full content of my first blog post.",
    imageUrl: "/recImg.png",
  },
  {
    id: 2,
    slug: "my-second-blog-post",
    title: "My Second Blog Post",
    content: "This is the full content of my second blog post.",
    imageUrl: "/recImg.png",
  },
];

export const Route = createFileRoute("/blog/$slug")({
  component: RouteComponent,
  loader: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
    return { post };
  },
});

import PageTitle from "@/components/page-title";

// ... other imports

function RouteComponent() {
  const { post } = Route.useLoaderData();

  if (!post) {
    return <div>Post not found!</div>;
  }

  return (
    <div className="pb-16">
      <PageTitle title={post.title} />
      <div className="pt-16">
        <Gutter>
          <div className="max-w-4xl mx-auto">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
            <div className="prose dark:prose-invert max-w-none">
              <p>{post.content}</p>
            </div>
          </div>
        </Gutter>
      </div>
    </div>
  );
}
