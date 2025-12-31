import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Link as LinkIcon, CreditCard, Repeat } from "lucide-react";

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
            <h4 className="font-medium">1. Połącz konto Stripe</h4>
            <p className="text-sm text-gray-600">
              Aby otrzymywać automatyczne wypłaty prowizji, musisz połączyć swoje konto Stripe (lub utworzyć nowe). 
              Jest to bezpłatne i zajmuje kilka minut.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="bg-therapy-100 rounded-full p-2">
            <Check className="h-5 w-5 text-therapy-700" />
          </div>
          <div>
            <h4 className="font-medium">2. Udostępnij swój link</h4>
            <p className="text-sm text-gray-600">
              Podziel się swoim unikalnym linkiem afiliacyjnym z innymi terapeutami, właścicielami gabinetów lub potencjalnymi klientami.
              Kod polecający jest zapisywany przy rejestracji - nawet jeśli użytkownik nie dokona natychmiastowego zakupu.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="bg-therapy-100 rounded-full p-2">
            <CreditCard className="h-5 w-5 text-therapy-700" />
          </div>
          <div>
            <h4 className="font-medium">3. Otrzymuj prowizję automatycznie</h4>
            <p className="text-sm text-gray-600">
              <strong>7% prowizji</strong> jest automatycznie przelewane na Twoje konto Stripe przy każdej płatności poleconego użytkownika.
              Nie musisz nic robić - system sam rozlicza prowizje.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-therapy-100 rounded-full p-2">
            <Repeat className="h-5 w-5 text-therapy-700" />
          </div>
          <div>
            <h4 className="font-medium">4. Prowizja dożywotnia</h4>
            <p className="text-sm text-gray-600">
              Otrzymujesz 7% od <strong>każdej płatności</strong> poleconego użytkownika - nie tylko pierwszej! 
              Jeśli użytkownik płaci subskrypcję miesięczną, otrzymujesz prowizję co miesiąc.
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-md">
          <h3 className="font-medium text-green-800 mb-2">Automatyczne wypłaty przez Stripe Connect</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Prowizje są przelewane automatycznie po każdej płatności</li>
            <li>• Wypłaty na Twoje konto bankowe zgodnie z ustawieniami Stripe (zazwyczaj 2-7 dni roboczych)</li>
            <li>• Pełna transparentność - wszystkie transakcje widoczne w panelu Stripe</li>
            <li>• Rozliczenia podatkowe po Twojej stronie (dokumentacja dostępna w Stripe)</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-md">
          <h3 className="font-medium text-blue-800 mb-2">Przykład zarobków</h3>
          <p className="text-sm text-blue-700">
            Jeśli polecisz 10 terapeutów z planem za 49 zł/mies., otrzymasz <strong>34,30 zł miesięcznie</strong> (7% × 49 zł × 10 osób). 
            Rocznie to <strong>411,60 zł</strong> pasywnego dochodu - i to tylko od 10 użytkowników!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramInfoCard;
