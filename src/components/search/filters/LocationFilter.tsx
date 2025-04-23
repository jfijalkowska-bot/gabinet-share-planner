
import { MapPin, Compass } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

interface LocationFilterProps {
  control: any;
  distance: number;
  setDistance: (distance: number) => void;
}

const LocationFilter = ({ control, distance, setDistance }: LocationFilterProps) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <FormField
        control={control}
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
        defaultValue={[distance]}
        max={50}
        step={1}
        onValueChange={(value) => setDistance(value[0])}
        className="w-full"
      />
    </div>
  </div>
);

export default LocationFilter;
