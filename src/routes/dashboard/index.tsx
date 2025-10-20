import { redirect, useRouter } from "@tanstack/react-router";
import Gutter from "@/components/gutter";
import PageTitle from "@/components/page-title";
import { createFileRoute } from "@tanstack/react-router";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { ListChecks, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: async ({ context }) => {
    if (!context.auth.user) throw redirect({ to: "/login", search: { type: "signin" } });
  },
  component: RouteComponent,
});

const DASHBOARD_SECTIONS = [
  {
    title: "Projects",
    path: "/dashboard/projects",
    description: "All of projects built or in progress",
    newPath: "/dashboard/projects/new",
  },
  {
    title: "Billboards",
    path: "/dashboard/billboards",
    description: "website hero billboards",
    newPath: "/dashboard/billboards/new",
  },
  {
    title: "Blogs",
    path: "/dashboard/blogs",
    description: "Articles I've written or chosen to publish.",
    newPath: "/dashboard/blogs/new",
  },
  {
    title: "Skills & Experience",
    path: "/dashboard/skills",
    description: "My skills and working tools",
    newPath: "/dashboard/skills/new",
  },
  {
    title: "Quotes",
    path: "/dashboard/quotes",
    description: "Quotes that inspire me in day to day life",
    newPath: "/dashboard/quotes/new",
  },
  {
    title: "Socials",
    path: "/dashboard/socials",
    description: "Where people can find me on the web",
    newPath: "/dashboard/socials/new",
  },
  {
    title: "Images",
    path: "/dashboard/images",
    description: "Images I've uploaded on the project",
    newPath: "",
  },

  {
    title: "Users",
    path: "/dashboard/users",
    description: "Users of the website and their roles",
    newPath: "",
  },
];

function RouteComponent() {
  const router = useRouter();
  const { data } = useSession.get();
  if (!data) redirect({ to: "/login", search: { type: "signin" } });

  return (
    <Gutter className='space-y-16'>
      <PageTitle title="Dashboard" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {DASHBOARD_SECTIONS.map((section) => (
          <Item
            key={section.path}
            variant="outline"
            className="hover:border-accent hover:shadow-md hover:bg-card rounded-none"
          >
            <ItemHeader>
              <ItemTitle className="text-xl md:text-2xl">
                {section.title}
              </ItemTitle>
            </ItemHeader>
            <ItemContent>
              <ItemDescription>{section.description}</ItemDescription>
            </ItemContent>
            <ItemFooter className="flex gap-x-2 items-center justify-start flex-wrap">
              <Button
                onClick={() => router.navigate({ to: section.path })}
                className="w-full aspect-auto cursor-pointer md:w-auto"
              >
                <span className="flex gap-x-2">
                  <ListChecks className="mr-2" />
                  View
                </span>
              </Button>
              <Button
                variant="outline"
                className="hover:text-primary w-full aspect-auto cursor-pointer md:w-auto"
                onClick={() => router.navigate({ to: section.newPath })}
              >
                <span className="flex gap-x-2">
                  <Plus className="mr-2" />
                  Add
                </span>
              </Button>
            </ItemFooter>
          </Item>
        ))}
      </div>
    </Gutter>
  );
}
