import { Mail, Phone } from "lucide-react";
import Gutter from "./gutter";
import SectionTitle from "./section-title";

const ContactSection = () => {
  return (
    <section className="py-16">
      <Gutter className="space-y-12">
        <SectionTitle title="Contact" title_fr="Contact" />
        <div className="text-lg max-w-2xl mx-auto text-center space-y-4">
          <p>
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of an ambitious vision. Feel free to reach
            out to me.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
            <Mail className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-xl font-bold">Email</h3>
              <a
                href="mailto:contact@example.com"
                className="text-muted-foreground hover:text-primary transition"
              >
                contact@example.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
            <Phone className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-xl font-bold">Phone</h3>
              <p className="text-muted-foreground">(123) 456-7890</p>
            </div>
          </div>
        </div>
      </Gutter>
    </section>
  );
};

export default ContactSection;