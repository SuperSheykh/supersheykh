import { Link } from "@tanstack/react-router";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "./ui/item";

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
      >
        <ItemHeader>
          <img
            src={`/images/${blog.cover}`}
            alt={blog.title}
            className="w-full h-full object-cover aspect-video"
          />
        </ItemHeader>
        <ItemContent className="flex flex-col p-4">
          <ItemTitle className="text-lg line-clamp-1">
            {t(blog.title, blog.title_fr)}
          </ItemTitle>
          <ItemDescription className="line-clamp-2">
            {t(blog.content, blog.content_fr)}
          </ItemDescription>
          <ItemActions>
            <Button asChild>
              <a>{t("Read more", "Lire la suite")}</a>
            </Button>
          </ItemActions>
        </ItemContent>
      </Item>
    </Link>
  );
};

export default BlogCard;
