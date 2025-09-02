import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface OfficeServicesFilterProps {
  register: any;
}

const OfficeServicesFilter = ({ register }: OfficeServicesFilterProps) => (
  <div className="space-y-2">
    <Label className="mb-2 font-medium">Oferowane usługi</Label>
    
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="service-supervisions"
          {...register("officeServices")}
          value="Superwizje"
        />
        <Label htmlFor="service-supervisions" className="cursor-pointer">
          Superwizje
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="service-trainings"
          {...register("officeServices")}
          value="Szkolenia i warsztaty"
        />
        <Label htmlFor="service-trainings" className="cursor-pointer">
          Szkolenia i warsztaty
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="service-practicums"
          {...register("officeServices")}
          value="Praktyki psychologiczne"
        />
        <Label htmlFor="service-practicums" className="cursor-pointer">
          Praktyki psychologiczne
        </Label>
      </div>
    </div>
  </div>
);

export default OfficeServicesFilter;