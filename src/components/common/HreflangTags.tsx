import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguagePrefix } from "@/hooks/useLanguagePrefix";

const HreflangTags = () => {
  const location = useLocation();
  const { currentLang, SUPPORTED_LANGS, PRIMARY_LANGS } = useLanguagePrefix();

  useEffect(() => {
    // Remove old hreflang links
    document.querySelectorAll('link[hreflang]').forEach(el => el.remove());

    const baseUrl = window.location.origin;
    // Get path without lang prefix
    const pathWithoutLang = location.pathname.replace(/^\/(pl|it|en|de|fr|es|ru|el|cs|pt|nl|sv|ja|ko|zh|uk)/, '') || '/';

    // Add hreflang for primary languages
    PRIMARY_LANGS.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = `${baseUrl}/${lang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
      document.head.appendChild(link);
    });

    // x-default points to root (which redirects based on browser)
    const xDefault = document.createElement('link');
    xDefault.rel = 'alternate';
    xDefault.hreflang = 'x-default';
    xDefault.href = `${baseUrl}/pl${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    document.head.appendChild(xDefault);

    return () => {
      document.querySelectorAll('link[hreflang]').forEach(el => el.remove());
    };
  }, [location.pathname, currentLang]);

  return null;
};

export default HreflangTags;
