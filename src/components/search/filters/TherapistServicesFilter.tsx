
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Usługi terapeuty: popularne na górze, specjalistyczne na dole
const therapistServices = [
  { id: "individual", label: "Terapia indywidualna" },
  { id: "couples", label: "Terapia par" },
  { id: "group", label: "Terapia grupowa" },
  { id: "family", label: "Terapia rodzinna" },
  { id: "crisis", label: "Interwencja kryzysowa" },
  { id: "supportGroup", label: "Grupa wsparcia" },
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
    
    {/* Online Sessions option with special highlighting */}
    <div className="mb-4 border rounded-md p-3 bg-blue-50 border-blue-200">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="service-online"
          {...register("services")}
          value="Sesje online"
        />
        <Label htmlFor="service-online" className="cursor-pointer flex items-center">
          <Video className="h-4 w-4 mr-2 text-blue-600" />
          <span className="font-medium">Sesje online</span>
          <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700">Popularne</Badge>
        </Label>
      </div>
      <p className="text-sm text-gray-600 mt-2 pl-6">
        Zaznacz, jeśli szukasz specjalistów oferujących sesje zdalne przez internet
      </p>
    </div>
    
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
