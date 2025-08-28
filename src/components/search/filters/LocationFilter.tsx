
import { MapPin, Compass, Map } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import MapboxMap from "@/components/map/MapboxMap";
import { useState } from "react";

interface LocationFilterProps {
  control: any;
  distance: number;
  setDistance: (distance: number) => void;
}

const LocationFilter = ({ control, distance, setDistance }: LocationFilterProps) => {
  const [showMap, setShowMap] = useState(false);
  
  const handleLocationSelect = (location: { lat: number; lng: number; address?: string }) => {
    // Tutaj można dodać logikę do zapisania współrzędnych i użycia ich w wyszukiwaniu
    console.log('Wybrana lokalizacja:', location);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Lokalizacja
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMap(!showMap)}
                >
                  <Map className="h-4 w-4" />
                  {showMap ? 'Ukryj mapę' : 'Pokaż mapę'}
                </Button>
              </FormLabel>
              <FormControl>
                <Input placeholder="Wpisz adres" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <Collapsible open={showMap} onOpenChange={setShowMap}>
        <CollapsibleContent className="space-y-2">
          <MapboxMap
            height="300px"
            onLocationSelect={handleLocationSelect}
          />
        </CollapsibleContent>
      </Collapsible>

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
};

export default LocationFilter;
