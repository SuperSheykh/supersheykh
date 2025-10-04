import { createFileRoute } from "@tanstack/react-router";
import AboutSection from "@/components/about-section";
import PageTitle from "@/components/page-title";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageTitle title="About Me" title_fr="À propos de moi" />
      <AboutSection />
    </div>
  );
}
