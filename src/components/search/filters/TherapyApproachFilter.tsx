
import { Sparkle } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

interface TherapyApproachFilterProps {
  control: Control<any>;
}

const therapyApproaches = [
  { value: "systemowa", label: "Systemowa" },
  { value: "ericsonowska", label: "Ericsonowska" },
  { value: "gestalt", label: "Gestalt" },
  { value: "psychoanaliza", label: "Psychoanaliza" },
  { value: "psychodynamiczna", label: "Psychodynamiczna" },
  { value: "cbt", label: "Poznawczo-behawioralna (CBT)" },
  { value: "schematy", label: "Terapia schematów" },
  { value: "act", label: "ACT" },
  { value: "bioenergetyka", label: "Bioenergetyka Lowena" },
  { value: "bodywork", label: "Praca z ciałem" },
  { value: "inne", label: "Inne" }
];

const TherapyApproachFilter = ({ control }: TherapyApproachFilterProps) => (
  <FormField
    control={control}
    name="therapyApproach"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="flex items-center gap-2">
          <Sparkle className="h-4 w-4" />
          Nurt terapeutyczny
        </FormLabel>
        <FormControl>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wybierz nurt" />
            </SelectTrigger>
            <SelectContent>
              {therapyApproaches.map((approach) => (
                <SelectItem key={approach.value} value={approach.value}>
                  {approach.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);

export default TherapyApproachFilter;
