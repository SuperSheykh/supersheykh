import { useTrans } from "@/hooks/use-trans";
import Gutter from "./gutter";

const PageTitle = ({
  title,
  title_fr,
}: {
  title: string;
  title_fr?: string;
}) => {
  const t = useTrans();
  return (
    <div className="py-8">
      <Gutter className="text-center md:text-left">
        <h1 className="text-4xl font-bold ">{t(title, title_fr)}</h1>
      </Gutter>
    </div>
  );
};

export default PageTitle;
