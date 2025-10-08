import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const LocalSwitcher = () => {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();

  const toggleLanguage = () => {
    changeLanguage(language === "en" ? "fr" : "en");
  };

  return (
    <Button
      variant={"ghost"}
      size="icon"
      onClick={toggleLanguage}
      className="transition duration-200 ease-in-out"
    >
      {language === "en" ? "EN" : "FR"}
    </Button>
  );
};

export default LocalSwitcher;