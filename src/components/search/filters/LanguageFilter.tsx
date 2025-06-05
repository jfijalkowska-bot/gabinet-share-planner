
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";

interface LanguageFilterProps {
  control: Control<any>;
}

const LANGUAGES = [
  { code: "pl", name: "Polski" },
  { code: "en", name: "Angielski" },
  { code: "de", name: "Niemiecki" },
  { code: "fr", name: "Francuski" },
  { code: "es", name: "Hiszpański" },
  { code: "it", name: "Włoski" },
  { code: "ru", name: "Rosyjski" },
  { code: "uk", name: "Ukraiński" },
];

const LanguageFilter = ({ control }: LanguageFilterProps) => {
  return (
    <FormField
      control={control}
      name="languages"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Języki terapii</FormLabel>
          <div className="grid grid-cols-2 gap-2">
            {LANGUAGES.map((language) => (
              <FormField
                key={language.code}
                control={control}
                name="languages"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={language.code}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(language.code)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, language.code])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== language.code
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {language.name}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </FormItem>
      )}
    />
  );
};

export default LanguageFilter;
