import { useQuery } from "@tanstack/react-query";
import Gutter from "./gutter";
import SectionTitle from "./section-title";
import { trpc } from "@/router";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "./ui/item";
import { useTrans } from "@/hooks/use-trans";

const Skills = () => {
  const t = useTrans();
  const { data } = useQuery(
    trpc.skillCategories.getAllWithSkills.queryOptions(),
  );

  return (
    <section>
      <Gutter className="space-y-10">
        <SectionTitle title="Skills" title_fr="Compétences" />
        <ItemGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map(({ name, name_fr, id, skills }) => (
            <Item
              key={id}
              className="group border border-border p-4 rounded-none hover:border-accent"
            >
              <ItemContent>
                <ItemTitle className="text-xl font-bold">
                  {t(name, name_fr)}
                </ItemTitle>
                <ItemSeparator className="" />
                <ul className="flex flex-wrap gap-2">
                  {skills &&
                    skills?.map((skill) => (
                      <li
                        key={skill.id}
                        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md"
                      >
                        {t(skill.name, skill.name_fr)}
                      </li>
                    ))}
                </ul>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </Gutter>
    </section>
  );
};

export default Skills;
