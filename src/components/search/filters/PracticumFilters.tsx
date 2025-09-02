import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control, UseFormRegister } from "react-hook-form";

interface PracticumFiltersProps {
  control: Control<any>;
  register: UseFormRegister<any>;
}

const PracticumFilters = ({ control, register }: PracticumFiltersProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Miejsce praktyk</label>
        <Input 
          {...register("location")}
          placeholder="Miasto lub 'online'"
        />
      </div>

      <FormField
        control={control}
        name="compensationType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Typ wynagrodzenia</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz typ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Płatny</SelectItem>
                  <SelectItem value="unpaid">Bezpłatny</SelectItem>
                  <SelectItem value="compensated">Dofinansowany</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Min. tygodnie</label>
          <Input 
            {...register("minDuration")}
            type="number"
            placeholder="np. 4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Max. tygodnie</label>
          <Input 
            {...register("maxDuration")}
            type="number"
            placeholder="np. 26"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Godziny tygodniowo</label>
        <Input 
          {...register("hoursPerWeek")}
          type="number"
          placeholder="np. 20"
        />
      </div>
    </div>
  );
};

export default PracticumFilters;