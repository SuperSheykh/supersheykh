import { Link } from "@tanstack/react-router";
import SectionTitle from "./section-title";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/router";

const LatestBlogs = () => {
  const { data } = useQuery(trpc.blogs.getLatest.queryOptions());

  if (!data) return null;

  return (
    <section className="container mx-auto py-12">
      <SectionTitle title="Latest Blogs" title_fr="Derniers articles" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {data.map((blog) => (
          <div
            key={blog.id}
            className="bg-card rounded-lg shadow-lg overflow-hidden"
          >
            <Link to={"/blog/$slug"} params={{ slug: blog.slug }}>
              <img
                src={blog.cover ?? "/placeholder.svg"}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-primary hover:underline">Read more</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestBlogs;
