
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Link as LinkIcon } from "lucide-react";

const ProgramInfoCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jak to działa?</CardTitle>
        <CardDescription>
          Poznaj zasady programu partnerskiego GabinetShare
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="bg-therapy-100 rounded-full p-2">
            <LinkIcon className="h-5 w-5 text-therapy-700" />
          </div>
          <div>
            <h4 className="font-medium">Udostępnij swój link</h4>
            <p className="text-sm text-gray-600">Podziel się swoim unikalnym linkiem afiliacyjnym z innymi terapeutami, właścicielami gabinetów lub potencjalnymi klientami.</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="bg-therapy-100 rounded-full p-2">
            <Check className="h-5 w-5 text-therapy-700" />
          </div>
          <div>
            <h4 className="font-medium">Zyskaj nowych użytkowników</h4>
            <p className="text-sm text-gray-600">Gdy ktoś zarejestruje się i wykupi abonament przez Twój link, zostaje przypisany do Twojego konta partnerskiego.</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="bg-therapy-100 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-therapy-700">
              <circle cx="12" cy="12" r="10" />
              <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
              <path d="M12 18V6" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium">Otrzymuj prowizję</h4>
            <p className="text-sm text-gray-600">Zarabiaj 10% prowizji od każdego zakupu dokonanego przez osoby, które skorzystały z Twojego linka. <strong>Program partnerski dostępny dla wszystkich typów kont!</strong></p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-md">
          <h3 className="font-medium text-green-800 mb-2">Nowość: Program partnerski dla klientów!</h3>
          <p className="text-sm text-green-700">
            Teraz każdy może zarabiać na poleceniach - również klienci! Wystarczy, że zarejestrujesz się jako klient, a Twój link afiliacyjny będzie aktywny. Zapraszaj innych do skorzystania z GabinetShare i zarabiaj 10% prowizji od ich płatnych planów.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramInfoCard;
