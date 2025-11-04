import { Link } from "@tanstack/react-router";
import { Item, ItemContent } from "./ui/item";

import { TrpcRouterOutputs } from "@/types";
import { useTrans } from "@/hooks/use-trans";
import { Button } from "./ui/button";

const BlogCard = (blog: TrpcRouterOutputs["blogs"]["getAll"][number]) => {
  const t = useTrans();
  return (
    <Link
      to={"/blog/$slug"}
      params={{ slug: blog.slug }}
      className="h-full group"
    >
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
              {t(blog.title, blog.title_fr)}
            </h3>
            <p className="text-muted-foreground line-clamp-3">
              {t(blog.content, blog.content_fr)}
            </p>
            <Button variant="outline" asChild>
              <Link
                to={`/blog/$slug`}
                params={{ slug: blog.slug }}
                className="text-primary hover:underline"
              >
                {t("Read more", "Lire l'article")}
              </Link>
            </Button>
          </div>
        </ItemContent>
      </Item>
    </Link>
  );
};

export default BlogCard;

