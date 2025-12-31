import React from "react";
import AffiliateLinkCard from "./AffiliateLinkCard";
import AffiliateEarningsCard from "./AffiliateEarningsCard";
import ProgramInfoCard from "./ProgramInfoCard";
import StripeConnectCard from "./StripeConnectCard";
import ReferredUsersList from "./ReferredUsersList";

interface AffiliateLoggedInContentProps {
  affiliateLink: string;
}

const AffiliateLoggedInContent: React.FC<AffiliateLoggedInContentProps> = ({ affiliateLink }) => {
  return (
    <div className="space-y-8">
      <StripeConnectCard />
      <AffiliateLinkCard affiliateLink={affiliateLink} />
      <AffiliateEarningsCard />
      <ReferredUsersList />
      <ProgramInfoCard />
    </div>
  );
};

export default AffiliateLoggedInContent;
