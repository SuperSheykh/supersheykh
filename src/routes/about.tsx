import AboutSection from "@/components/about-section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
  handle: {
    crumb: () => "About",
  },
});

function RouteComponent() {
  return <AboutSection />;
}
