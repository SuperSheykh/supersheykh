import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Quotes from "@/components/quotes";
import Skills from "@/components/skills";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  handle: {
    crumb: () => "Home",
  },
});

function RouteComponent() {
  return (
    <div className="space-y-24">
      <Hero />
      <Projects />
      <Skills />
      <Quotes />
    </div>
  );
}
