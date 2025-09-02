import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface TherapistAdvancedServicesFilterProps {
  register: any;
}

const TherapistAdvancedServicesFilter = ({ register }: TherapistAdvancedServicesFilterProps) => (
  <div className="space-y-2">
    <Label className="mb-2 font-medium">Dodatkowe usługi</Label>
    
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="advanced-service-supervisions"
          {...register("advancedServices")}
          value="Superwizje"
        />
        <Label htmlFor="advanced-service-supervisions" className="cursor-pointer">
          Superwizje
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="advanced-service-trainings"
          {...register("advancedServices")}
          value="Szkolenia i warsztaty"
        />
        <Label htmlFor="advanced-service-trainings" className="cursor-pointer">
          Szkolenia i warsztaty
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="advanced-service-practicums"
          {...register("advancedServices")}
          value="Praktyki psychologiczne"
        />
        <Label htmlFor="advanced-service-practicums" className="cursor-pointer">
          Praktyki psychologiczne
        </Label>
      </div>
    </div>
  </div>
);

export default TherapistAdvancedServicesFilter;