
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister, UseFormReturn, Control } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PriceFilterProps {
  register: UseFormRegister<any>;
  control?: Control<any>;
  type: "office" | "specialist" | "practicum";
}

const getOfficeTypes = [
  { value: "hour", label: "Za godzinę" },
  { value: "block-morning", label: "Blok przedpołudniowy (6.00 - 14.00)" },
  { value: "block-afternoon", label: "Blok popołudniowy (14.00 - 22.00)" }
];

const getTherapistTypes = [
  { value: "session", label: "Za spotkanie" },
  { value: "custom", label: "Za spotkanie (czas określony przez terapeutę)" }
];

const PriceFilter = ({ register, control, type }: PriceFilterProps) => {
  const priceTypes = type === "office" ? getOfficeTypes : 
                     type === "specialist" ? getTherapistTypes : [];
  
  // Don't show price filter for practicum as compensation is handled separately
  if (type === "practicum") {
    return null;
  }
  
  return (
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
      <div className="mt-2">
        <FormField
          control={control}
          name="priceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sposób rozliczenia ceny</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz sposób rozliczenia" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceTypes.map((pt) => (
                      <SelectItem key={pt.value} value={pt.value}>
                        {pt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
