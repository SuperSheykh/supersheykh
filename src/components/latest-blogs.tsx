import SectionTitle from "./section-title";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/router";
import BlogCard from "./blog-card";
import Gutter from "./gutter";

const LatestBlogs = () => {
  const { data } = useQuery(trpc.blogs.getLatest.queryOptions());

  if (!data) return null;

  return (
    <section className="container mx-auto py-12">
      <Gutter>
        <SectionTitle title="Latest Blogs" title_fr="Derniers articles" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {data.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </Gutter>
    </section>
  );
};

export default LatestBlogs;
