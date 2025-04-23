
import { Users } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

interface OfficeCapacityFilterProps {
  control: Control<any>;
}

const OfficeCapacityFilter = ({ control }: OfficeCapacityFilterProps) => (
  <FormField
    control={control}
    name="capacity"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Pojemność (liczba osób)
        </FormLabel>
        <FormControl>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wybierz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 osoba</SelectItem>
              <SelectItem value="2">2 osoby</SelectItem>
              <SelectItem value="3">3-4 osoby</SelectItem>
              <SelectItem value="5+">5+ osób</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);

export default OfficeCapacityFilter;
