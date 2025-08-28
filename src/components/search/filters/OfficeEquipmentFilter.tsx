
import { Building, Coffee, Printer, Headphones, Wifi, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";

const officeEquipment = [
  { id: "desk", label: "Biurko", icon: null },
  { id: "couch", label: "Kanapa", icon: null },
  { id: "chairs", label: "Fotele", icon: null },
  { id: "table", label: "Stolik", icon: null },
  { id: "tissues", label: "Chusteczki :)", icon: null },
  { id: "bathroom", label: "Łazienka z natryskiem", icon: null },
  { id: "internet", label: "Internet", icon: <Wifi className="h-4 w-4" /> },
  { id: "ac", label: "Klimatyzacja", icon: null },
  { id: "projector", label: "Projektor", icon: null },
  { id: "waitingRoom", label: "Poczekalnia", icon: null },
  { id: "manualTherapyTable", label: "Stół do terapii manualnych", icon: null },
  { id: "workshopRoom", label: "Salka na warsztaty", icon: null },
  { id: "coffeeTea", label: "Kawa i herbata", icon: <Coffee className="h-4 w-4" /> },
  { id: "printer", label: "Drukarka", icon: <Printer className="h-4 w-4" /> },
  { id: "soundproof", label: "Wyciszenie", icon: <Headphones className="h-4 w-4" /> },
  { id: "biofeedback", label: "Sprzęt do biofeedback", icon: null },
  { id: "headphones", label: "Słuchawki", icon: <Headphones className="h-4 w-4" /> },
  { id: "groundOrElevator", label: "Parter lub winda", icon: <Building className="h-4 w-4" /> },
  { id: "flipchart", label: "Flipchart", icon: <Check className="h-4 w-4" /> },
];

interface OfficeEquipmentFilterProps {
  register: UseFormRegister<any>;
}

const OfficeEquipmentFilter = ({ register }: OfficeEquipmentFilterProps) => (
  <div className="space-y-2">
    <Label className="flex items-center gap-2 mb-2">
      <Building className="h-4 w-4" />
      Wyposażenie gabinetu
    </Label>
    <div className="grid grid-cols-2 gap-2">
      {officeEquipment.map((item) => (
        <div key={item.id} className="flex items-center space-x-2">
          <Checkbox
            id={item.id}
            {...register("equipment")}
            value={item.id}
          />
          <Label htmlFor={item.id} className="cursor-pointer flex items-center gap-1">
            {item.icon && item.icon}
            {item.label}
          </Label>
        </div>
      ))}
    </div>
    <div className="mt-2">
      <Label className="block mb-1">Inne wyposażenie</Label>
      <Input
        placeholder="Wpisz inne wyposażenie"
        {...register("otherEquipment")}
      />
    </div>
  </div>
);

export default OfficeEquipmentFilter;
