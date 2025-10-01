import Gutter from "./gutter";
import SectionTitle from "./section-title";

const AboutSection = () => {
  return (
    <section>
      <Gutter>
        <SectionTitle title="About Me" title_fr="A propos de moi" />
        <div className="space-y-4 text-lg">
          <p>
            Hello! I'm a passionate full-stack developer with a knack for
            building elegant and efficient web applications. My journey in tech
            started with a deep curiosity for how things work, and it has
            evolved into a career where I get to solve real-world problems with
            code.
          </p>
          <p>
            I specialize in React, Node.js, and the entire TypeScript ecosystem.
            I'm also proficient in database management with PostgreSQL and have
            experience deploying scalable applications.
          </p>
          <p>
            When I'm not coding, you can find me exploring the latest tech
            trends, contributing to open-source projects, or enjoying a good cup
            of coffee.
          </p>
        </div>
      </Gutter>
    </section>
  );
};

export default AboutSection;

