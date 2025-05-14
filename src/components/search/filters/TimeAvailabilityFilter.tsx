
import { useState } from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { UseFormRegister } from "react-hook-form";

interface TimeAvailabilityFilterProps {
  register: UseFormRegister<any>;
}

const timeSlots = [
  { value: "morning", label: "Poranne (8:00 - 12:00)" },
  { value: "afternoon", label: "Popołudniowe (12:00 - 16:00)" },
  { value: "evening", label: "Wieczorne (16:00 - 20:00)" }
];

const daysOfWeek = [
  { value: "monday", label: "Poniedziałek" },
  { value: "tuesday", label: "Wtorek" },
  { value: "wednesday", label: "Środa" },
  { value: "thursday", label: "Czwartek" },
  { value: "friday", label: "Piątek" },
  { value: "saturday", label: "Sobota" },
  { value: "sunday", label: "Niedziela" }
];

const TimeAvailabilityFilter = ({ register }: TimeAvailabilityFilterProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  return (
    <div className="space-y-4">
      <div>
        <Label className="flex items-center gap-2 mb-2">
          <Clock className="h-4 w-4" />
          Dostępność czasowa
        </Label>
        
        <div className="space-y-2">
          <Label className="text-sm font-normal">Preferowane pory dnia</Label>
          <div className="grid grid-cols-1 gap-2">
            {timeSlots.map((slot) => (
              <div key={slot.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`timeSlots-${slot.value}`}
                  {...register("timeSlots")}
                  value={slot.value}
                />
                <Label htmlFor={`timeSlots-${slot.value}`} className="cursor-pointer">
                  {slot.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-3 space-y-2">
          <Label className="text-sm font-normal">Preferowane dni tygodnia</Label>
          <div className="grid grid-cols-2 gap-2">
            {daysOfWeek.map((day) => (
              <div key={day.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`daysOfWeek-${day.value}`}
                  {...register("daysOfWeek")}
                  value={day.value}
                />
                <Label htmlFor={`daysOfWeek-${day.value}`} className="cursor-pointer">
                  {day.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <Label className="text-sm font-normal">Najwcześniejszy termin</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: pl }) : "Wybierz datę"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={pl}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="mt-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="prioritizeEarliestSlot"
              {...register("prioritizeEarliestSlot")}
            />
            <Label htmlFor="prioritizeEarliestSlot" className="cursor-pointer">
              Pokaż terapeutów z najszybszymi dostępnymi terminami
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeAvailabilityFilter;
