import { Navigate, useLocation } from "react-router-dom";
import { getDefaultLang, SUPPORTED_LANGS } from "@/hooks/useLanguagePrefix";

const LanguageRedirect = () => {
  const location = useLocation();
  const lang = getDefaultLang();
  
  // Check if the current path already starts with a supported language
  const pathSegments = location.pathname.split("/").filter(Boolean);
  if (pathSegments.length > 0 && SUPPORTED_LANGS.includes(pathSegments[0])) {
    return null;
  }
  
  // Redirect to the default language, preserving path
  const redirectPath = location.pathname === "/" 
    ? `/${lang}` 
    : `/${lang}${location.pathname}`;
    
  return <Navigate to={`${redirectPath}${location.search}${location.hash}`} replace />;
};

export default LanguageRedirect;
