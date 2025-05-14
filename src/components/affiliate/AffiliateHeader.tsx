
import React from "react";

interface AffiliateHeaderProps {
  isClientAccount?: boolean;
}

const AffiliateHeader: React.FC<AffiliateHeaderProps> = ({ isClientAccount = false }) => {
  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
        Program Partnerski GabinetShare
      </h1>
      <p className="text-xl text-gray-600">
        Zarabiaj 10% prowizji polecając naszą platformę innym
      </p>
      {isClientAccount && (
        <p className="text-md text-therapy-600 mt-2 font-medium">
          Nowość: Program partnerski dostępny również dla klientów!
        </p>
      )}
    </div>
  );
};

export default AffiliateHeader;
