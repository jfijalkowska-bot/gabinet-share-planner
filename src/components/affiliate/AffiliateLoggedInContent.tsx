
import React from "react";
import AffiliateLinkCard from "./AffiliateLinkCard";
import AffiliateEarningsCard from "./AffiliateEarningsCard";
import ProgramInfoCard from "./ProgramInfoCard";

interface AffiliateLoggedInContentProps {
  affiliateLink: string;
}

const AffiliateLoggedInContent: React.FC<AffiliateLoggedInContentProps> = ({ affiliateLink }) => {
  return (
    <div className="space-y-8">
      <AffiliateLinkCard affiliateLink={affiliateLink} />
      <AffiliateEarningsCard />
      <ProgramInfoCard />
    </div>
  );
};

export default AffiliateLoggedInContent;
