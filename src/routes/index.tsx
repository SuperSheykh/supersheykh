import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/hero";
import Quotes from "@/components/quotes";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import AboutMe from "@/components/about-section";
import Contact from "@/components/contact-section";
import { testing } from "@/actions/test";
export const Route = createFileRoute("/")({
  loader: async () => testing(),
  component: App,
});

function App() {
  return (
    <div className="space-y-12">
      <Hero />
      <Quotes />
      <Projects />
      <Skills />
      <AboutMe />
      <Contact />
    </div>
  );
}
