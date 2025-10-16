import { useTranslation } from "react-i18next";

export const useTrans = () => {
  const { i18n } = useTranslation();

  const t = (name: string, nameFr?: string | null) => {
    return i18n.language === "fr" ? nameFr || name : name;
  };

  return t;
};
