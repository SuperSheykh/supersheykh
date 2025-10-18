import Hero from "@/components/hero";
import LatestBlogs from "@/components/latest-blogs";
import Projects from "@/components/projects";
import Quotes from "@/components/quotes";
import Skills from "@/components/skills";
import { createFileRoute } from "@tanstack/react-router";
import { getLiveBillboards } from "actions/billboards";

export const Route = createFileRoute("/")({
  loader: () => getLiveBillboards(),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-24">
      <Hero />
      <Projects />
      <Skills />
      <Quotes />
      <LatestBlogs />
    </div>
  );
}
