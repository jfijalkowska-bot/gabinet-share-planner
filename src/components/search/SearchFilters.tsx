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
import LocationFilter from "./filters/LocationFilter";
import PriceFilter from "./filters/PriceFilter";
import OfficeEquipmentFilter from "./filters/OfficeEquipmentFilter";
import TherapistServicesFilter from "./filters/TherapistServicesFilter";
import TrainingStatusFilter from "./filters/TrainingStatusFilter";

interface SearchFiltersProps {
  type: "office" | "specialist";
  onSearch: (filters: any) => void;
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

const customSuccessAreas = [
  { value: "terapia_par", label: "Terapia par" },
  { value: "terapia_rodzinna", label: "Terapia rodzinna" },
  { value: "terapia_traumy", label: "Terapia traumy" },
  { value: "terapia_dzieci", label: "Terapia dzieci" },
  { value: "terapia_mlodziezy", label: "Terapia młodzieży" },
  { value: "zaburzenia_psychosomatyczne", label: "Zaburzenia psychosomatyczne" },
  { value: "zaburzenia_osobowosci", label: "Zaburzenia osobowości" }
];

const officeEquipment = [
  { id: "desk", label: "Biurko", icon: null },
  { id: "couch", label: "Kanapa", icon: null },
  { id: "internet", label: "Internet", icon: null },
  { id: "ac", label: "Klimatyzacja", icon: null },
  { id: "projector", label: "Projektor", icon: null },
  { id: "waitingRoom", label: "Poczekalnia", icon: null },
  { id: "therapeuticBed", label: "Łóżko terapeutyczne", icon: <Bed className="h-4 w-4" /> },
  { id: "manualTherapyTable", label: "Stół do terapii manualnych", icon: null },
  { id: "workshopRoom", label: "Salka na warsztaty", icon: null }
];

const SearchFilters = ({ type, onSearch }: SearchFiltersProps) => {
  const [distance, setDistance] = useState<number>(5);

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
      keywords: "",
      otherServices: "",
      trainingStatus: [] as string[]
    }
  });

  const onSubmit = (data: any) => {
    onSearch({
      ...data,
      distance
    });
  };

  const trainingStatuses = [
    { id: "training", label: "W trakcie szkolenia" },
    { id: "certification", label: "W trakcie certyfikacji" },
    { id: "certificate", label: "Posiada certyfikat" }
  ];

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <LocationFilter 
                  control={form.control} 
                  distance={distance}
                  setDistance={setDistance}
                />
                <PriceFilter register={form.register} />
                {type === "specialist" && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Słowa kluczowe (np. metoda, problem, nazwisko)
                    </Label>
                    <Input
                      placeholder="Wpisz słowa kluczowe"
                      {...form.register("keywords")}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {type === "office" && (
                  <>
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
                    <OfficeEquipmentFilter register={form.register} />
                  </>
                )}

                {type === "specialist" && (
                  <>
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
                            {customSuccessAreas.map((area) => (
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
                    <TherapistServicesFilter register={form.register} />
                    <TrainingStatusFilter register={form.register} />
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
