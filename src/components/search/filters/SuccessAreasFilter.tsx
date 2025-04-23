
import { Star } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormItem, FormLabel } from "@/components/ui/form";
import { UseFormRegister } from "react-hook-form";

interface SuccessAreasFilterProps {
  register: UseFormRegister<any>;
}

const customSuccessAreas = [
  { value: "depresja", label: "Depresja" },
  { value: "leki", label: "Lęki" },
  { value: "terapia_par", label: "Terapia par" },
  { value: "terapia_rodzinna", label: "Terapia rodzinna" },
  { value: "terapia_traumy", label: "Terapia traumy" },
  { value: "terapia_dzieci", label: "Terapia dzieci" },
  { value: "terapia_mlodziezy", label: "Terapia młodzieży" },
  { value: "zaburzenia_psychosomatyczne", label: "Zaburzenia psychosomatyczne" },
  { value: "zaburzenia_osobowosci", label: "Zaburzenia osobowości" }
];

const SuccessAreasFilter = ({ register }: SuccessAreasFilterProps) => (
  <FormItem>
    <FormLabel className="flex items-center gap-2 mb-2">
      <Star className="h-4 w-4" />
      Obszary sukcesów
    </FormLabel>
    <div className="grid grid-cols-2 gap-2">
      {customSuccessAreas.map((area) => (
        <div key={`area-${area.value}`} className="flex items-center space-x-2">
          <Checkbox
            id={`area-${area.value}`}
            {...register("successAreas")}
            value={area.value}
          />
          <Label 
            htmlFor={`area-${area.value}`} 
            className="cursor-pointer"
          >
            {area.label}
          </Label>
        </div>
      ))}
    </div>
  </FormItem>
);

export default SuccessAreasFilter;
