
import { Sparkle } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TherapyApproachFilterProps {
  control: Control<any>;
}

const therapyApproaches = [
  { value: "systemowa", label: "Systemowa" },
  { value: "integracyjny", label: "Integracyjny" },
  { value: "ericsonowska", label: "Ericsonowska" },
  { value: "gestalt", label: "Gestalt" },
  { value: "psychoanaliza", label: "Psychoanaliza" },
  { value: "psychodynamiczna", label: "Psychodynamiczna" },
  { value: "cbt", label: "Poznawczo-behawioralna (CBT)" },
  { value: "schematy", label: "Terapia schematów" },
  { value: "act", label: "ACT" },
  { value: "bioenergetyka", label: "Bioenergetyka Lowena" },
  { value: "bodywork", label: "Praca z ciałem" },
  { value: "dowolny", label: "Dowolny" },
  { value: "inne", label: "Inne" }
];

const TherapyApproachFilter = ({ control }: TherapyApproachFilterProps) => {
  const [selectedApproaches, setSelectedApproaches] = useState<string[]>([]);

  return (
    <FormField
      control={control}
      name="therapyApproach"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="flex items-center gap-2">
            <Sparkle className="h-4 w-4" />
            Nurt terapeutyczny
          </FormLabel>
          <FormControl>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {selectedApproaches.length > 0 
                    ? `${selectedApproaches.length} wybrane` 
                    : "Wybierz nurty"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                {therapyApproaches.map((approach) => (
                  <DropdownMenuCheckboxItem
                    key={approach.value}
                    checked={selectedApproaches.includes(approach.value)}
                    onCheckedChange={(checked) => {
                      const newValue = checked 
                        ? [...selectedApproaches, approach.value] 
                        : selectedApproaches.filter(item => item !== approach.value);
                      
                      setSelectedApproaches(newValue);
                      field.onChange(newValue.length ? newValue : undefined);
                    }}
                  >
                    {approach.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default TherapyApproachFilter;
