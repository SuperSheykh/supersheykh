import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Quotes from "@/components/quotes";
import Skills from "@/components/skills";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  // const { billboards } = useLoaderData({ from: "/" });
  return (
    <div className="space-y-24">
      <Hero billboards={[]} />
      <Projects />
      <Skills />
      <Quotes />
    </div>
  );
}
