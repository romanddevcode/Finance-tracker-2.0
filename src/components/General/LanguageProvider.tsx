import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "@/services/store/languageStore";

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { i18n } = useTranslation();
  const { selectedLanguage } = useLanguageStore();

  useEffect(() => {
    if (selectedLanguage && i18n.language !== selectedLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
  }, [selectedLanguage, i18n]);

  return <>{children}</>;
};
