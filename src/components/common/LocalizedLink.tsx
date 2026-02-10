import { Link, LinkProps } from "react-router-dom";
import { useLanguagePrefix } from "@/hooks/useLanguagePrefix";
import { forwardRef } from "react";

interface LocalizedLinkProps extends Omit<LinkProps, "to"> {
  to: string;
}

const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ to, ...props }, ref) => {
    const { localizedPath } = useLanguagePrefix();

    // Don't localize external links or hash-only links
    const isExternal = to.startsWith("http") || to.startsWith("mailto:");
    const finalTo = isExternal ? to : localizedPath(to);

    return <Link ref={ref} to={finalTo} {...props} />;
  }
);

LocalizedLink.displayName = "LocalizedLink";

export default LocalizedLink;
