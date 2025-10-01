import { createFileRoute } from "@tanstack/react-router";
import PageTitle from "@/components/page-title";
import Gutter from "@/components/gutter";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageTitle title="Dashboard" title_fr="Tableau de bord" />
      <div className="py-16">
        <Gutter>
          <p>Welcome to your dashboard.</p>
        </Gutter>
      </div>
    </div>
  );
}