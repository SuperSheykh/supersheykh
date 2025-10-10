import { getAllBillboards, getAllQuotes, getAllSkills } from "@/actions";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Quotes from "@/components/quotes";
import Skills from "@/components/skills";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  // loader: async () => {
  //   const billboards = await getAllBillboards();
  //   const quotes = await getAllQuotes();
  //   const skills = await getAllSkills();
  //
  //   return { billboards, quotes, skills };
  // },
});

function RouteComponent() {
  // const { billboards } = useLoaderData({ from: "/" });
  return (
    <div className="space-y-24">
      <Hero billboards={[]} />
      <Projects />
      {/* <Skills /> */}
      {/* <Quotes /> */}
    </div>
  );
}
