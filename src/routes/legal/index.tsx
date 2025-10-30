import { createFileRoute } from "@tanstack/react-router";
import { getAllPolicies } from "actions/policies/get-all";
import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";

export const Route = createFileRoute("/legal/")({
  loader: () => getAllPolicies(),
  component: RouteComponent,
});

function RouteComponent() {
  const policies = Route.useLoaderData();

  return (
    <Gutter>
      <PageTitle
        title="Legal"
        title_fr="Mentions legales"
        description="All the legals policies of SuperSheykh"
        description_fr="Tous les documents de mentions légales de SuperSheykh"
      />
      <section>
        {policies.length > 0 &&
          policies.map((policy) => (
            <Item>
              <ItemContent>
                <ItemTitle>{policy.title}</ItemTitle>
              </ItemContent>
            </Item>
          ))}
      </section>
    </Gutter>
  );
}
