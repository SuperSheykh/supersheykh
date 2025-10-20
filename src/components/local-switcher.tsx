import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "./ui/spinner";
import ReactCountryFlag from "react-country-flag";

const LocalSwitcher = () => {
  const [mounted, setMounted] = React.useState(false);
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Spinner />;
  }

  return (
    <Select value={language} onValueChange={changeLanguage}>
      <SelectTrigger className="w-fit border-none" >
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <div className="flex items-center gap-2">
            <ReactCountryFlag countryCode="GB" svg />
            <span>EN</span>
          </div>
        </SelectItem>
        <SelectItem value="fr">
          <div className="flex items-center gap-2">
            <ReactCountryFlag countryCode="FR" svg />
            <span>FR</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LocalSwitcher;
