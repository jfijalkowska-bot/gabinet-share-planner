import React, { useState } from "react";
import { format, addDays, startOfWeek, getDay, subWeeks, addWeeks } from "date-fns";
import { pl } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookingDialog from "./BookingDialog";

// Przykładowe dane
const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7:00 - 20:00
const WEEKDAYS = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"];

type SlotStatus = "available" | "booked" | "rental" | "unavailable";

interface TimeSlot {
  id: string;
  date: Date;
  hour: number;
  status: SlotStatus;
  clientName?: string;
  therapistName?: string;
}

// Generowanie przykładowych danych
const generateTimeSlots = (startDate: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const start = startOfWeek(startDate, { weekStartsOn: 1 });
  
  for (let day = 0; day < 7; day++) {
    const date = addDays(start, day);
    
    for (let hour of HOURS) {
      // Losowy status dla przykładu
      const statuses: SlotStatus[] = ["available", "booked", "rental", "unavailable"];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      slots.push({
        id: `${format(date, 'yyyy-MM-dd')}-${hour}`,
        date,
        hour,
        status: randomStatus,
        clientName: randomStatus === "booked" ? "Jan Kowalski" : undefined,
        therapistName: randomStatus === "rental" ? "Dr Anna Nowak" : undefined
      });
    }
  }
  
  return slots;
};

const CalendarView: React.FC = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots(currentWeekStart));
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; hour: number } | undefined>();
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  const handlePrevWeek = () => {
    const newWeekStart = subWeeks(currentWeekStart, 1);
    setCurrentWeekStart(newWeekStart);
    setTimeSlots(generateTimeSlots(newWeekStart));
  };

  const handleNextWeek = () => {
    const newWeekStart = addWeeks(currentWeekStart, 1);
    setCurrentWeekStart(newWeekStart);
    setTimeSlots(generateTimeSlots(newWeekStart));
  };

  const handleSlotClick = (slot: TimeSlot) => {
    if (slot.status === "available") {
      setSelectedSlot({ date: slot.date, hour: slot.hour });
      setIsBookingDialogOpen(true);
    }
  };

  const getSlotClass = (status: SlotStatus) => {
    switch (status) {
      case "available":
        return "bg-green-100 border-green-300 text-green-800";
      case "booked":
        return "bg-red-100 border-red-300 text-red-800";
      case "rental":
        return "bg-therapy-200 border-therapy-300 text-therapy-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-400";
    }
  };

  const getWeekDates = () => {
    return Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  };

  const weekDates = getWeekDates();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {format(currentWeekStart, "d MMMM", { locale: pl })} - {format(addDays(currentWeekStart, 6), "d MMMM yyyy", { locale: pl })}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handlePrevWeek}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Poprzedni tydzień
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextWeek}>
            Następny tydzień <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="calendar-grid">
            {/* Nagłówki dni tygodnia */}
            <div className="bg-gray-50 p-2 text-center font-medium text-gray-700 border-b"></div>
            {weekDates.map((date, index) => (
              <div key={index} className="bg-gray-50 p-2 text-center font-medium text-gray-700 border-b">
                <div>{WEEKDAYS[getDay(date) - 1 >= 0 ? getDay(date) - 1 : 6]}</div>
                <div>{format(date, "d.MM")}</div>
              </div>
            ))}

            {/* Godziny i sloty */}
            {HOURS.map((hour) => (
              <React.Fragment key={hour}>
                {/* Kolumna godzin */}
                <div className="p-2 border-b border-r text-center text-sm text-gray-500 font-medium">
                  {hour}:00
                </div>

                {/* Sloty dla każdego dnia w tygodniu */}
                {weekDates.map((date, dayIndex) => {
                  const slot = timeSlots.find(
                    (s) => s.hour === hour && format(s.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                  );

                  return (
                    <div
                      key={`${hour}-${dayIndex}`}
                      className={cn(
                        "p-2 border text-sm cursor-pointer time-slot",
                        slot ? getSlotClass(slot.status) : "bg-gray-100"
                      )}
                      onClick={() => slot && handleSlotClick(slot)}
                    >
                      {slot?.status === "booked" && (
                        <div className="font-medium">Wizyta: {slot.clientName}</div>
                      )}
                      {slot?.status === "rental" && (
                        <div className="font-medium">Wynajem: {slot.therapistName}</div>
                      )}
                      {slot?.status === "available" && (
                        <div className="font-medium">Dostępne</div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 flex gap-4 justify-end">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-100 border border-green-300 mr-2"></div>
          <span className="text-sm text-gray-600">Dostępne</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-100 border border-red-300 mr-2"></div>
          <span className="text-sm text-gray-600">Zarezerwowane</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-therapy-200 border border-therapy-300 mr-2"></div>
          <span className="text-sm text-gray-600">Wynajęte</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-100 border border-gray-300 mr-2"></div>
          <span className="text-sm text-gray-600">Niedostępne</span>
        </div>
      </div>

      <BookingDialog
        isOpen={isBookingDialogOpen}
        onClose={() => {
          setIsBookingDialogOpen(false);
          setSelectedSlot(undefined);
        }}
        selectedSlot={selectedSlot}
      />
    </div>
  );
};

export default CalendarView;
