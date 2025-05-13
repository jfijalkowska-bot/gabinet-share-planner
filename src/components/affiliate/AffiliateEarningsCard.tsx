
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AffiliateEarningsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Twoje zarobki</CardTitle>
        <CardDescription>
          Statystyki Twojego programu partnerskiego
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-therapy-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Łączne zarobki</p>
            <p className="text-2xl font-bold text-therapy-700">0,00 zł</p>
          </div>
          <div className="bg-therapy-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Kliknięcia</p>
            <p className="text-2xl font-bold text-therapy-700">0</p>
          </div>
          <div className="bg-therapy-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Konwersje</p>
            <p className="text-2xl font-bold text-therapy-700">0</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Statystyki są aktualizowane raz dziennie. Panel statystyk będzie dostępny wkrótce.
        </p>
      </CardContent>
    </Card>
  );
};

export default AffiliateEarningsCard;
