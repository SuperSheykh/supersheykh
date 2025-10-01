import { Mail, Phone } from "lucide-react";
import Gutter from "./gutter";
import SectionTitle from "./section-title";

const ContactSection = () => {
  return (
    <section>
      <Gutter className="space-y-12">
        <SectionTitle
          title="Contact"
          title_fr="Contact"
          action="Follow me"
          actionLink="/socials"
        />
        <div className="text-lg max-w-2xl mx-auto text-center space-y-4">
          <p>
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of an ambitious vision. Feel free to reach
            out to me.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <a className="">
            <span className="flex items-center gap-2">
              <Mail className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold">Email</h3>
            </span>
          </a>
          <a className="">
            <span className="flex items-center gap-2">
              <Phone className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold">Phone</h3>
            </span>
          </a>
        </div>
      </Gutter>
    </section>
  );
};

export default ContactSection;
