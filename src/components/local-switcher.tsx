import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
const LocalSwitcher = () => {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();

  const toogleLanguage = () => {
    changeLanguage(language === "en" ? "fr" : "en");
  };

  return (
    <Button variant={"ghost"} size="icon" asChild>
      <p
        onClick={toogleLanguage}
        className="transition duration-200 ease-in-out"
      >
        {language === "en" ? "EN" : "FR"}
      </p>
    </Button>
  );
};

export default LocalSwitcher;
