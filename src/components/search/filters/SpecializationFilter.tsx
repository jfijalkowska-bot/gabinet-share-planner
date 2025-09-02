
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { useSpecializations } from "@/hooks/useTherapistData";

interface SpecializationFilterProps {
  control: Control<any>;
}

const SpecializationFilter = ({ control }: SpecializationFilterProps) => {
  const specializations = useSpecializations();

  return (
  <FormField
    control={control}
    name="specialization"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Specjalizacja</FormLabel>
        <FormControl>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wybierz" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((spec) => (
                <SelectItem key={spec.value} value={spec.value}>
                  {spec.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
  );
};

export default SpecializationFilter;
