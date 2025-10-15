import { useTrans } from "@/hooks/use-trans";
import Gutter from "./gutter";
import { Separator } from "./ui/separator";

const PageTitle = ({
  title,
  title_fr,
  description,
  description_fr,
  separator,
}: {
  title: string;
  title_fr?: string;
  description?: string;
  description_fr?: string;
  separator?: boolean;
}) => {
  const t = useTrans();
  return (
    <div className="py-6">
      <Gutter className="text-center md:text-left">
        <h1 className="text-4xl font-bold ">{t(title, title_fr)}</h1>
        {description && (
          <p className="text-start text-sm md:text-base text-foreground/70">
            {t(description, description_fr)}
          </p>
        )}
        {separator && <Separator className="mt-4 md:mt-8" />}
      </Gutter>
    </div>
  );
};

export default PageTitle;
