import { createFileRoute } from "@tanstack/react-router";
import ContactSection from "@/components/contact-section";
import PageTitle from "@/components/page-title";

export const Route = createFileRoute("/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageTitle title="Contact" title_fr="Contact" />
      <ContactSection />
    </div>
  );
}