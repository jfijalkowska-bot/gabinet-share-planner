import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  MapPin, Compass, Users, Building, Bed, Search, Clock, User, Star 
} from "lucide-react";
import { useSpecializations, useSuccessAreas } from "@/hooks/useTherapistData";

interface SearchFiltersProps {
  type: "office" | "specialist";
  onSearch: (filters: any) => void;
}

const SearchFilters = ({ type, onSearch }: SearchFiltersProps) => {
  const [distance, setDistance] = useState<number>(5);
  
  const specializations = useSpecializations();
  const successAreas = useSuccessAreas();
  
  const form = useForm({
    defaultValues: {
      location: "",
      distance: 5,
      priceMin: "",
      priceMax: "",
      capacity: "",
      equipment: [] as string[],
      specialization: "",
      modality: "",
      experience: "",
      successAreas: [] as string[],
      services: [] as string[],
    }
  });

  const onSubmit = (data: any) => {
    onSearch({
      ...data,
      distance
    });
  };

  const officeEquipment = [
    { id: "desk", label: "Biurko", icon: null },
    { id: "couch", label: "Kanapa", icon: null },
    { id: "internet", label: "Internet", icon: null },
    { id: "ac", label: "Klimatyzacja", icon: null },
    { id: "projector", label: "Projektor", icon: null },
    { id: "waitingRoom", label: "Poczekalnia", icon: null },
    { id: "therapeuticBed", label: "Łóżko terapeutyczne", icon: <Bed className="h-4 w-4" /> },
  ];

  const modalitiesStatic = [
    { value: "cbt", label: "Poznawczo-behawioralna (CBT)" },
    { value: "psychodynamic", label: "Psychodynamiczna" },
    { value: "humanistic", label: "Humanistyczna" },
    { value: "systemic", label: "Systemowa" }
  ];

  const experienceLevels = [
    { value: "0-2", label: "0-2 lata" },
    { value: "3-5", label: "3-5 lat" },
    { value: "6-10", label: "6-10 lat" },
    { value: "10+", label: "Powyżej 10 lat" },
  ];

  const services = [
    { id: "individual", label: "Terapia indywidualna" },
    { id: "couples", label: "Terapia par" },
    { id: "family", label: "Terapia rodzinna" },
    { id: "group", label: "Terapia grupowa" },
    { id: "online", label: "Sesje online" },
    { id: "crisis", label: "Interwencja kryzysowa" },
    { id: "workshops", label: "Warsztaty" },
  ];

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Lokalizacja
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Wpisz adres" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Compass className="h-4 w-4" />
                      Maksymalna odległość: {distance} km
                    </Label>
                  </div>
                  <Slider
                    defaultValue={[5]}
                    max={50}
                    step={1}
                    onValueChange={(value) => setDistance(value[0])}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Cena od (zł)</Label>
                    <Input 
                      type="number" 
                      placeholder="Min"
                      {...form.register("priceMin")} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cena do (zł)</Label>
                    <Input 
                      type="number" 
                      placeholder="Max"
                      {...form.register("priceMax")} 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {type === "office" && (
                  <>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
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
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2 mb-2">
                        <Building className="h-4 w-4" />
                        Wyposażenie gabinetu
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {officeEquipment.map((item) => (
                          <div key={item.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={item.id}
                              {...form.register("equipment")}
                              value={item.id}
                            />
                            <Label htmlFor={item.id} className="cursor-pointer flex items-center gap-1">
                              {item.icon && item.icon}
                              {item.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {type === "specialist" && (
                  <>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
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
                    </div>
                    
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="successAreas"
                        render={() => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 mb-2">
                              <Star className="h-4 w-4" />
                              Obszary sukcesów
                            </FormLabel>
                            <div className="grid grid-cols-2 gap-2">
                              {successAreas.map((area) => (
                                <div key={`area-${area.value}`} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`area-${area.value}`}
                                    {...form.register("successAreas")}
                                    value={area.value}
                                  />
                                  <Label 
                                    htmlFor={`area-${area.value}`} 
                                    className="cursor-pointer"
                                  >
                                    {area.label}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="bg-therapy-600 hover:bg-therapy-700 w-full md:w-auto"
            >
              Wyszukaj
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
