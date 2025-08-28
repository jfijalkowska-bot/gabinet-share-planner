import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";

interface TrainingFiltersProps {
  onSearch: (params: any) => void;
}

const TrainingFilters = ({ onSearch }: TrainingFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const { register, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      keywords: "",
      topic: "",
      format: "",
      location: "",
      priceMin: "",
      priceMax: "",
      startDate: "",
      endDate: "",
      instructor: "",
      organizer: "",
      certificateAvailable: false,
    }
  });

  const onSubmit = (data: any) => {
    const params = {
      ...data,
      priceMin: data.priceMin ? parseFloat(data.priceMin) : undefined,
      priceMax: data.priceMax ? parseFloat(data.priceMax) : undefined,
    };
    onSearch(params);
  };

  const handleReset = () => {
    const form = {
      keywords: "",
      topic: "",
      format: "",
      location: "",
      priceMin: "",
      priceMax: "",
      startDate: "",
      endDate: "",
      instructor: "",
      organizer: "",
      certificateAvailable: false,
    };
    
    Object.entries(form).forEach(([key, value]) => {
      setValue(key as any, value);
    });
    
    onSearch({});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtry wyszukiwania
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Keywords */}
          <div>
            <Label htmlFor="keywords">Słowa kluczowe</Label>
            <Input
              id="keywords"
              placeholder="np. terapia poznawcza, mindfulness"
              {...register("keywords")}
            />
          </div>

          {/* Topic */}
          <div>
            <Label htmlFor="topic">Tematyka</Label>
            <Select onValueChange={(value) => setValue("topic", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz tematykę" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Wszystkie</SelectItem>
                <SelectItem value="therapy">Terapia</SelectItem>
                <SelectItem value="counseling">Poradnictwo</SelectItem>
                <SelectItem value="psychology">Psychologia</SelectItem>
                <SelectItem value="psychiatry">Psychiatria</SelectItem>
                <SelectItem value="neurology">Neurologia</SelectItem>
                <SelectItem value="rehabilitation">Rehabilitacja</SelectItem>
                <SelectItem value="coaching">Coaching</SelectItem>
                <SelectItem value="supervision">Superwizja</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Format */}
          <div>
            <Label htmlFor="format">Format</Label>
            <Select onValueChange={(value) => setValue("format", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Wszystkie</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Stacjonarne</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location (for offline trainings) */}
          <div>
            <Label htmlFor="location">Lokalizacja</Label>
            <Input
              id="location"
              placeholder="Miasto"
              {...register("location")}
            />
          </div>

          {/* Advanced Filters Toggle */}
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full"
          >
            {showAdvanced ? "Ukryj" : "Pokaż"} zaawansowane filtry
          </Button>

          {showAdvanced && (
            <>
              {/* Price Range */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="priceMin">Cena od (PLN)</Label>
                  <Input
                    id="priceMin"
                    type="number"
                    placeholder="0"
                    {...register("priceMin")}
                  />
                </div>
                <div>
                  <Label htmlFor="priceMax">Cena do (PLN)</Label>
                  <Input
                    id="priceMax"
                    type="number"
                    placeholder="1000"
                    {...register("priceMax")}
                  />
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="startDate">Data od</Label>
                  <Input
                    id="startDate"
                    type="date"
                    {...register("startDate")}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Data do</Label>
                  <Input
                    id="endDate"
                    type="date"
                    {...register("endDate")}
                  />
                </div>
              </div>

              {/* Instructor */}
              <div>
                <Label htmlFor="instructor">Prowadzący</Label>
                <Input
                  id="instructor"
                  placeholder="Imię i nazwisko"
                  {...register("instructor")}
                />
              </div>

              {/* Organizer */}
              <div>
                <Label htmlFor="organizer">Organizator</Label>
                <Input
                  id="organizer"
                  placeholder="Nazwa organizatora"
                  {...register("organizer")}
                />
              </div>

              {/* Certificate Available */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="certificate"
                  onCheckedChange={(checked) => setValue("certificateAvailable", !!checked)}
                />
                <Label htmlFor="certificate">Z certyfikatem</Label>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button type="submit" className="flex-1 bg-therapy-600 hover:bg-therapy-700">
              <Search className="h-4 w-4 mr-2" />
              Szukaj
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              Wyczyść
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TrainingFilters;