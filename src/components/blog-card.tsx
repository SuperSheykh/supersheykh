import { shortenText } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Item } from "./ui/item";

import { TrpcRouterOutputs } from "@/types";

const BlogCard = (blog: TrpcRouterOutputs["blogs"]["getAll"][number]) => {
  return (
    <Item
      key={blog.id}
      className="hover:shadow-md border-border hover:border-accent rounded-none"
    >
      <Link to={"/blog/$slug"} params={{ slug: blog.slug }}>
        <img
          src={blog.cover ?? "/placeholder.svg"}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
          <p className="text-muted-foreground">
            {shortenText(blog.content, 100)}
          </p>
          <p className="text-primary hover:underline mt-4">Read more</p>
        </div>
      </Link>
    </Item>
  );
};

export default BlogCard;
