
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

type AccountType = "owner" | "therapist" | "therapist-seeking" | "free" | "client";

interface AccountTypeSelectorProps {
  accountType: AccountType;
  onChange: (value: AccountType) => void;
}

const AccountTypeSelector = ({ accountType, onChange }: AccountTypeSelectorProps) => {
  const [expandedDetails, setExpandedDetails] = useState<string | null>(null);

  const toggleDetails = (type: string) => {
    if (expandedDetails === type) {
      setExpandedDetails(null);
    } else {
      setExpandedDetails(type);
    }
  };

  const planDetails = {
    owner: [
      "Zarządzanie gabinetem",
      "Wynajmowanie powierzchni",
      "Obsługa rezerwacji klientów",
      "Kalendarz wizyt",
      "Wizytówka w cenie",
      "Panel administracyjny",
      "Raportowanie i statystyki",
      "Zarabiaj na poleceniach (program partnerski)"
    ],
    therapist: [
      "Pełny dostęp do kalendarza wizyt",
      "Zarządzanie rezerwacjami",
      "Wizytówka terapeuty",
      "Powiadomienia o wizytach",
      "Historia spotkań z klientami",
      "Zarabiaj na poleceniach (program partnerski)"
    ],
    "therapist-seeking": [
      "Przeglądanie dostępnych gabinetów",
      "Kontakt z właścicielami gabinetów",
      "Filtrowanie według lokalizacji i wyposażenia",
      "Dostęp do szczegółów ofert wynajmu",
      "Zarabiaj na poleceniach (program partnerski)",
      "Możliwość rozszerzenia do pełnego planu"
    ],
    free: [
      "Podstawowa wizytówka terapeuty",
      "Profil w katalogu specjalistów",
      "Możliwość kontaktu przez platformę",
      "Brak ograniczeń czasowych",
      "Opcja rozszerzenia w przyszłości",
      "Zarabiaj na poleceniach (program partnerski)"
    ],
    client: [
      "Rezerwacja wizyt u specjalistów",
      "Wystawianie ocen i opinii",
      "Przeglądanie profili terapeutów",
      "Płatności online za wizyty",
      "Powiadomienia o terminach",
      "Historia wizyt",
      "Zarabiaj na poleceniach (program partnerski)"
    ]
  };

  return (
    <div className="space-y-4 mb-6">
      <Label className="text-base font-medium">Wybierz rodzaj konta</Label>
      <RadioGroup 
        defaultValue={accountType} 
        onValueChange={(value) => onChange(value as AccountType)} 
        className="grid grid-cols-1 gap-4"
      >
        <div className="flex flex-col border rounded-md p-3 hover:bg-gray-50">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="owner" id="owner" />
            <Label htmlFor="owner" className="flex flex-col cursor-pointer w-full">
              <span className="font-medium">Właściciel gabinetu</span>
              <span className="text-sm text-gray-500">Zarządzaj gabinetem, wynajmuj powierzchnię i obsługuj rezerwacje swoich klientów</span>
              <span className="text-sm text-gray-500">Kalendarz wizyt i wizytówka w cenie</span>
            </Label>
            <span className="font-medium text-therapy-600">59 zł/mies.</span>
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="mt-2 text-xs flex items-center w-fit"
            onClick={() => toggleDetails("owner")}
          >
            {expandedDetails === "owner" ? "Ukryj szczegóły" : "Zobacz co zawiera"} 
            {expandedDetails === "owner" ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
          </Button>
          {expandedDetails === "owner" && (
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
              {planDetails.owner.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col border rounded-md p-3 hover:bg-gray-50">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="therapist" id="therapist" />
            <Label htmlFor="therapist" className="flex flex-col cursor-pointer w-full">
              <span className="font-medium">Terapeuta z kalendarzem</span>
              <span className="text-sm text-gray-500">Pełny dostęp do rezerwacji, kalendarza wizyt i wizytówki w cenie</span>
            </Label>
            <span className="font-medium text-therapy-600">49 zł/mies.</span>
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="mt-2 text-xs flex items-center w-fit"
            onClick={() => toggleDetails("therapist")}
          >
            {expandedDetails === "therapist" ? "Ukryj szczegóły" : "Zobacz co zawiera"}
            {expandedDetails === "therapist" ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
          </Button>
          {expandedDetails === "therapist" && (
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
              {planDetails.therapist.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col border rounded-md p-3 hover:bg-gray-50 border-green-200 bg-green-50">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="therapist-seeking" id="therapist-seeking" />
            <Label htmlFor="therapist-seeking" className="flex flex-col cursor-pointer w-full">
              <span className="font-medium">Terapeuta poszukujący gabinetu</span>
              <span className="text-sm text-gray-500">Przeglądaj dostępne gabinety i kontaktuj się z właścicielami</span>
            </Label>
            <span className="font-medium text-green-600">Za darmo</span>
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="mt-2 text-xs flex items-center w-fit"
            onClick={() => toggleDetails("therapist-seeking")}
          >
            {expandedDetails === "therapist-seeking" ? "Ukryj szczegóły" : "Zobacz co zawiera"}
            {expandedDetails === "therapist-seeking" ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
          </Button>
          {expandedDetails === "therapist-seeking" && (
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
              {planDetails["therapist-seeking"].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col border rounded-md p-3 hover:bg-gray-50">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="free" id="free" />
            <Label htmlFor="free" className="flex flex-col cursor-pointer w-full">
              <span className="font-medium">Wizytówka terapeuty</span>
              <span className="text-sm text-gray-500">Podstawowa wizytówka bez kalendarza</span>
            </Label>
            <span className="font-medium text-green-600">49 zł jednorazowo</span>
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="mt-2 text-xs flex items-center w-fit"
            onClick={() => toggleDetails("free")}
          >
            {expandedDetails === "free" ? "Ukryj szczegóły" : "Zobacz co zawiera"}
            {expandedDetails === "free" ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
          </Button>
          {expandedDetails === "free" && (
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
              {planDetails.free.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col border rounded-md p-3 hover:bg-gray-50 border-therapy-200 bg-therapy-50">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="client" id="client" />
            <Label htmlFor="client" className="flex flex-col cursor-pointer w-full">
              <span className="font-medium">Klient (przeglądaj za darmo)</span>
              <span className="text-sm text-gray-500">Rezerwuj wizyty, wystawiaj opinie i zarabiaj na poleceniach</span>
            </Label>
            <span className="font-medium text-green-600">Za darmo</span>
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="mt-2 text-xs flex items-center w-fit"
            onClick={() => toggleDetails("client")}
          >
            {expandedDetails === "client" ? "Ukryj szczegóły" : "Zobacz co zawiera"}
            {expandedDetails === "client" ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
          </Button>
          {expandedDetails === "client" && (
            <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
              {planDetails.client.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </RadioGroup>
    </div>
  );
};

export default AccountTypeSelector;
