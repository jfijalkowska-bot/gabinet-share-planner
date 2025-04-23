
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";

interface PriceFilterProps {
  register: UseFormRegister<any>;
}

const PriceFilter = ({ register }: PriceFilterProps) => (
  <div className="space-y-2">
    <Label className="mb-2 font-medium">Przedział cenowy</Label>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Cena od (zł)</Label>
        <Input 
          type="number"
          placeholder="Min"
          {...register("priceMin")}
          min="0"
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Label>Cena do (zł)</Label>
        <Input 
          type="number"
          placeholder="Max"
          {...register("priceMax")}
          min="0"
          className="w-full"
        />
      </div>
    </div>
  </div>
);

export default PriceFilter;
