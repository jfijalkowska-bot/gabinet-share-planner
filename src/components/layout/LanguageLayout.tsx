import { Outlet } from "react-router-dom";
import { useLanguagePrefix } from "@/hooks/useLanguagePrefix";
import HreflangTags from "@/components/common/HreflangTags";

const LanguageLayout = () => {
  // This hook syncs URL lang param with i18n
  useLanguagePrefix();
  return (
    <>
      <HreflangTags />
      <Outlet />
    </>
  );
};

export default LanguageLayout;
