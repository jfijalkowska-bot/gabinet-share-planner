
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

// Nowa kolejność usług: popularne na górze, specjalistyczne na dole
const therapistServices = [
  { id: "individual", label: "Terapia indywidualna" },
  { id: "couples", label: "Terapia par" },
  { id: "group", label: "Terapia grupowa" },
  { id: "family", label: "Terapia rodzinna" },
  { id: "online", label: "Sesje online" },
  { id: "crisis", label: "Interwencja kryzysowa" },
  { id: "emdr", label: "EMDR" },
  { id: "brainspotting", label: "Brainspotting" },
  { id: "se", label: "SE" },
  { id: "si", label: "Terapia SI" },
  { id: "tre", label: "TRE" },
  { id: "bowen", label: "Terapia Bowena" },
  { id: "accessBars", label: "Access Bars" },
  { id: "craniosacral", label: "Terapia czaszkowo-krzyżowa" },
  { id: "workshops", label: "Warsztaty" }
];

interface TherapistServicesFilterProps {
  register: any;
}

const TherapistServicesFilter = ({ register }: TherapistServicesFilterProps) => (
  <div className="space-y-2">
    <Label className="mb-2 font-medium">Usługi terapeuty</Label>
    <div className="grid grid-cols-2 gap-2">
      {therapistServices.map((service) => (
        <div key={service.id} className="flex items-center space-x-2">
          <Checkbox
            id={`service-${service.id}`}
            {...register("services")}
            value={service.label}
          />
          <Label htmlFor={`service-${service.id}`} className="cursor-pointer">
            {service.label}
          </Label>
        </div>
      ))}
    </div>
    <div className="mt-2">
      <Label className="block mb-1">Inne usługi</Label>
      <Input
        placeholder="Wpisz inne usługi"
        {...register("otherServices")}
      />
    </div>
  </div>
);

export default TherapistServicesFilter;
