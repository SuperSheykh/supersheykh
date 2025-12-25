import { useRouter } from "@tanstack/react-router";
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
import { DASHBOARD_SECTIONS } from "@/lib/constants";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  return (
    <Gutter className="space-y-16">
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
