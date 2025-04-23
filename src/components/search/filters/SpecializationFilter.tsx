
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

interface SpecializationFilterProps {
  control: Control<any>;
}

const specialistSpecializations = [
  { value: "psychoterapeuta", label: "Psychoterapeuta" },
  { value: "psycholog", label: "Psycholog" },
  { value: "logopeda", label: "Logopeda" },
  { value: "doradca_zawodowy", label: "Doradca zawodowy" },
  { value: "dietetyk", label: "Dietetyk" },
  { value: "terapeuta_manualny", label: "Terapeuta manualny" },
  { value: "terapeuta_ruchem", label: "Terapeuta ruchem" },
  { value: "psychoonkolog", label: "Psychoonkolog" },
  { value: "coach", label: "Coach" },
  { value: "mentor", label: "Mentor" },
  { value: "terapeuta_uzaleznien", label: "Terapeuta uzależnień" },
  { value: "psychotraumatolog", label: "Psychotraumatolog" },
  { value: "psychoseksuolog", label: "Psychoseksuolog" },
  { value: "psycholog_diagnosta", label: "Psycholog - diagnosta" }
];

const SpecializationFilter = ({ control }: SpecializationFilterProps) => (
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
              {specialistSpecializations.map((spec) => (
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

export default SpecializationFilter;
