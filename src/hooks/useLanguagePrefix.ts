import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const SUPPORTED_LANGS = ["pl", "it", "en", "de", "fr", "es", "ru", "el", "cs", "pt", "nl", "sv", "ja", "ko", "zh", "uk"];
const PRIMARY_LANGS = ["pl", "it"];

export const useLanguagePrefix = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const location = useLocation();

  const currentLang = lang && SUPPORTED_LANGS.includes(lang) ? lang : "pl";

  useEffect(() => {
    if (currentLang !== i18n.language) {
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang, i18n]);

  const localizedPath = (path: string) => {
    // If path already starts with a lang prefix, return as-is
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 0 && SUPPORTED_LANGS.includes(segments[0])) {
      return path;
    }
    return `/${currentLang}${path.startsWith("/") ? path : `/${path}`}`;
  };

  return { currentLang, localizedPath, PRIMARY_LANGS, SUPPORTED_LANGS };
};

export const getDefaultLang = (): string => {
  const browserLang = navigator.language?.split("-")[0]?.toLowerCase();
  if (browserLang === "it") return "it";
  return "pl";
};

export { SUPPORTED_LANGS, PRIMARY_LANGS };
