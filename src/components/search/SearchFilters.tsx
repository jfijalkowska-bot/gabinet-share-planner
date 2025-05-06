
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { 
  Form
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

// Import filter components
import LocationFilter from "./filters/LocationFilter";
import PriceFilter from "./filters/PriceFilter";
import OfficeEquipmentFilter from "./filters/OfficeEquipmentFilter";
import TherapistServicesFilter from "./filters/TherapistServicesFilter";
import TrainingStatusFilter from "./filters/TrainingStatusFilter";
import OfficeStyleFilter from "./filters/OfficeStyleFilter";
import OfficeColorFilter from "./filters/OfficeColorFilter";
import OfficeCapacityFilter from "./filters/OfficeCapacityFilter";
import SpecializationFilter from "./filters/SpecializationFilter";
import SuccessAreasFilter from "./filters/SuccessAreasFilter";
import KeywordsFilter from "./filters/KeywordsFilter";
import TherapyApproachFilter from "./filters/TherapyApproachFilter";

interface SearchFiltersProps {
  type: "office" | "specialist";
  onSearch: (filters: any) => void;
}

const SearchFilters = ({ type, onSearch }: SearchFiltersProps) => {
  const [distance, setDistance] = useState<number>(5);

  const form = useForm({
    defaultValues: {
      location: "",
      distance: 5,
      priceMin: "",
      priceMax: "",
      priceType: "",
      capacity: "",
      equipment: [] as string[],
      otherEquipment: "",
      officeStyle: "",
      officeColor: "",
      specialization: "",
      modality: "",
      experience: "",
      therapyApproach: [],
      successAreas: [] as string[],
      otherSuccessAreas: "",
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
                <PriceFilter 
                  register={form.register}
                  control={form.control}
                  type={type}
                />
                {type === "office" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OfficeStyleFilter control={form.control} />
                    <OfficeColorFilter control={form.control} />
                  </div>
                )}
                {type === "specialist" && (
                  <>
                    <KeywordsFilter register={form.register} />
                    <TherapyApproachFilter control={form.control} />
                  </>
                )}
              </div>

              <div className="space-y-4">
                {type === "office" && (
                  <>
                    <OfficeCapacityFilter control={form.control} />
                    <OfficeEquipmentFilter register={form.register} />
                  </>
                )}

                {type === "specialist" && (
                  <>
                    <SpecializationFilter control={form.control} />
                    <SuccessAreasFilter register={form.register} />
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
