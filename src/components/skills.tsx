import Gutter from "./gutter";
import SectionTitle from "./section-title";

const SKILLS_DATA = {
  Languages: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"],
  Frameworks: ["React", "Next.js", "Node.js", "Express", "FastAPI"],
  Databases: ["PostgreSQL", "MongoDB", "Redis", "SQLite"],
  Tools: ["Docker", "Git", "Webpack", "Vite", "tRPC"],
  Platforms: ["Cloudflare", "Vercel", "AWS", "DigitalOcean"],
};

const Skills = () => {
  return (
    <section className="py-16">
      <Gutter className="space-y-10">
        <SectionTitle title="Skills" title_fr="Compétences" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(SKILLS_DATA).map(([category, skills]) => (
            <div
              key={category}
              className="border border-border p-4 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-4">{category}</h3>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Gutter>
    </section>
  );
};

export default Skills;