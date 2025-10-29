import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useTrans = () => {
  const [mounted, setMounted] = React.useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    setMounted(true)
  }, [setMounted])

  const t = (name: string, nameFr?: string | null) => {
    if (mounted)
      return i18n.language === "fr" ? nameFr || name : name;
  };

  return t;
};
