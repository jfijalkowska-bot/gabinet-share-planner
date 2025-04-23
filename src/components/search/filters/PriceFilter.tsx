
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";

interface PriceFilterProps {
  register: UseFormRegister<any>;
}

const PriceFilter = ({ register }: PriceFilterProps) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label>Cena od (zł)</Label>
      <Input 
        type="number"
        placeholder="Min"
        {...register("priceMin")}
      />
    </div>
    <div className="space-y-2">
      <Label>Cena do (zł)</Label>
      <Input 
        type="number"
        placeholder="Max"
        {...register("priceMax")}
      />
    </div>
  </div>
);

export default PriceFilter;
