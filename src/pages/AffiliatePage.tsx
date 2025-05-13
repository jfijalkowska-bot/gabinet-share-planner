
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AffiliateHeader from "@/components/affiliate/AffiliateHeader";
import AffiliateSignupCard from "@/components/affiliate/AffiliateSignupCard";
import AffiliateLoggedInContent from "@/components/affiliate/AffiliateLoggedInContent";

const AffiliatePage = () => {
  const { user } = useAuth();
  const affiliateId = user?.id?.slice(0, 8) || "";
  
  const baseUrl = window.location.origin;
  const affiliateLink = `${baseUrl}/?ref=${affiliateId}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <AffiliateHeader />
          
          {user ? <AffiliateLoggedInContent affiliateLink={affiliateLink} /> : <AffiliateSignupCard />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AffiliatePage;
