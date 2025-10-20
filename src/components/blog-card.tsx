import { shortenText } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Item, ItemContent } from "./ui/item";

import { TrpcRouterOutputs } from "@/types";

const BlogCard = (blog: TrpcRouterOutputs["blogs"]["getAll"][number]) => {
  return (
    <Link to={"/blog/$slug"} params={{ slug: blog.slug }} className="h-full group">
      <Item
        key={blog.id}
        className="p-0 hover:shadow-md border-border rounded-none h-full hover:border-primary transition ease-in group "
        asChild
      >
        <ItemContent className="flex flex-col">
          <div className="w-full h-48 aspect-video">
            <img
              src={`/images/${blog.cover}`}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-1">
            <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:underline">
              {shortenText(blog.title, 50)}
            </h3>
            <p className="text-muted-foreground line-clamp-3">
              {shortenText(blog.content, 100)}
            </p>
            <p className="text-primary hover:underline mt-auto group-hover:underline">Read more</p>
          </div>
        </ItemContent>
      </Item>
    </Link>
  );
};

export default BlogCard;
