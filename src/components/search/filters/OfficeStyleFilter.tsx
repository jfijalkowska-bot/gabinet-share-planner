
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

interface OfficeStyleFilterProps {
  control: Control<any>;
}

const officeStyles = [
  { value: "modern", label: "Nowoczesny" },
  { value: "classic", label: "Klasyczny" },
  { value: "scandinavian", label: "Skandynawski" },
  { value: "loft", label: "Loft" },
  { value: "home", label: "Domowy" },
  { value: "vintage", label: "Vintage" },
  { value: "boho", label: "Boho" },
  { value: "other", label: "Inny" }
];

const OfficeStyleFilter = ({ control }: OfficeStyleFilterProps) => (
  <FormField
    control={control}
    name="officeStyle"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Styl gabinetu</FormLabel>
        <FormControl>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wybierz styl" />
            </SelectTrigger>
            <SelectContent>
              {officeStyles.map(style => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    )}
  />
);

export default OfficeStyleFilter;
