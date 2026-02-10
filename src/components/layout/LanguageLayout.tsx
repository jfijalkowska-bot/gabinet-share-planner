import { Outlet } from "react-router-dom";
import { useLanguagePrefix } from "@/hooks/useLanguagePrefix";

const LanguageLayout = () => {
  // This hook syncs URL lang param with i18n
  useLanguagePrefix();
  return <Outlet />;
};

export default LanguageLayout;
