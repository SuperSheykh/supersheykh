import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
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
      <AboutSection />
      <Quotes />
      <Projects />
      <Skills />
      <LatestBlogs />
      <ContactSection />
    </div>
  );
}
