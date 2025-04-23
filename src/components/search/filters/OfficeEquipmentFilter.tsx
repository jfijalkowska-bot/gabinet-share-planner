
import { Building, Bed } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormRegister } from "react-hook-form";

const officeEquipment = [
  { id: "desk", label: "Biurko", icon: null },
  { id: "couch", label: "Kanapa", icon: null },
  { id: "internet", label: "Internet", icon: null },
  { id: "ac", label: "Klimatyzacja", icon: null },
  { id: "projector", label: "Projektor", icon: null },
  { id: "waitingRoom", label: "Poczekalnia", icon: null },
  { id: "therapeuticBed", label: "Łóżko terapeutyczne", icon: <Bed className="h-4 w-4" /> },
  { id: "manualTherapyTable", label: "Stół do terapii manualnych", icon: null },
  { id: "workshopRoom", label: "Salka na warsztaty", icon: null }
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
  </div>
);

export default OfficeEquipmentFilter;
