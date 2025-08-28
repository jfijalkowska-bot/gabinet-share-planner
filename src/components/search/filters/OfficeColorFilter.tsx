
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

interface OfficeColorFilterProps {
  control: Control<any>;
}

const officeColors = [
  { value: "calming-blue", label: "Uspokajający niebieski" },
  { value: "nature-green", label: "Naturalny zielony" },
  { value: "warm-beige", label: "Ciepły beż" },
  { value: "soft-gray", label: "Miękki szary" },
  { value: "therapeutic-white", label: "Terapeutyczna biel" },
  { value: "earth-brown", label: "Ziemisty brąz" }
];

const OfficeColorFilter = ({ control }: OfficeColorFilterProps) => (
  <FormField
    control={control}
    name="officeColor"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Barwy gabinetu</FormLabel>
        <FormControl>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wybierz barwy" />
            </SelectTrigger>
            <SelectContent>
              {officeColors.map(color => (
                <SelectItem key={color.value} value={color.value}>
                  {color.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);

export default OfficeColorFilter;
