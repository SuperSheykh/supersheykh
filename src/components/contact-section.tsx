import { Mail, Phone, Wheat } from "lucide-react";
import Gutter from "./gutter";
import SectionTitle from "./section-title";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/router";
import { useTrans } from "@/hooks/use-trans";
import { Button } from "./ui/button";
import { SocialIcon } from "react-social-icons";

const ContactSection = () => {
  const { data: socials } = useQuery(trpc.socials.getAll.queryOptions());
  const t = useTrans();

  const messages = {
    en: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. Feel free to reach out to me.",
    fr: "Je suis toujours ouvert à discuter de nouveaux projets, d'idées créatives ou d'opportunités de faire partie d'une vision ambitieuse. N'hésitez pas à me contacter.",
  };

  return (
    <section className="pt-16">
      <Gutter className="space-y-12">
        <SectionTitle title="Message me" title_fr="Ecrivez-moi" />
        <div className="text-lg max-w-2xl mx-auto text-center space-y-4">
          <p>{t(messages.en, messages.fr)}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <Button asChild variant={"outline"} size={"lg"}>
            <a
              href="mailto:me@example.com"
              className="flex items-center gap-2 p-4 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              <Mail className="w-8 h-8 text-primary" />
              <h3>Email</h3>
            </a>
          </Button>
          <Button asChild variant={"outline"}>
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 p-4 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              <Phone className="w-8 h-8 text-primary" />
              <h3>Phone</h3>
            </a>
          </Button>
          <Button asChild variant={"outline"}>
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 p-4 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              <Wheat className="w-8 h-8 text-primary" />
              <h3>Whatsapp</h3>
            </a>
          </Button>
        </div>
        <SectionTitle title="Follow-me" title_fr="Suivez-moi" />
        <p className="text-lg max-w-2xl mx-auto text-center">
          {t(
            `Feel free to follow me on social media to stay up to date with my latest projects, creative ideas, and opportunities to be part of an ambitious vision.`,
            `N'hésitez pas à me suivre sur les réseaux sociaux pour rester à jour sur mes derniers projets, idées créatives et opportunités de faire partie d'une vision ambitieuse.`,
          )}
        </p>
        <div className="flex flex-wrap gap-8 justify-center items-center">
          {socials?.map((social) => (
            <Button key={social.id} asChild variant="outline" size="icon">
              <SocialIcon
                url={social.url}
                fgColor="var(--primary)"
                bgColor="transparent"
                style={{ width: "2rem", height: "2rem" }}
              />
            </Button>
          ))}
        </div>
      </Gutter>
    </section>
  );
};

export default ContactSection;
