import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Spinner } from "./ui/spinner";

const LocalSwitcher = () => {
  const [mounted, setMounted] = React.useState(false);
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();

  const toggleLanguage = () => {
    changeLanguage(language === "en" ? "fr" : "en");
  };

  useEffect(() => setMounted(true), []);

  return (
    <Button
      variant={"ghost"}
      size="icon"
      onClick={toggleLanguage}
      className="cursor-pointer transition duration-200 ease-in-out"
    >
      {!mounted ? <Spinner /> : language === "en" ? "EN" : "FR"}
    </Button>
  );
};

export default LocalSwitcher;
