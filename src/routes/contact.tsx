import { createFileRoute } from "@tanstack/react-router";
import ContactSection from "@/components/contact-section";
import PageTitle from "@/components/page-title";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  component: RouteComponent,
  validateSearch: z.object({
    lang: z.enum(["en", "fr"]).optional(),
  }),
});

function RouteComponent() {
  return (
    <div>
      <PageTitle title="Contact" title_fr="Contact" />
      <ContactSection />
    </div>
  );
}

