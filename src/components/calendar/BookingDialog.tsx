
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSlot?: {
    date: Date;
    hour: number;
  };
}

const BookingDialog = ({ isOpen, onClose, selectedSlot }: BookingDialogProps) => {
  const [bookingType, setBookingType] = useState<"appointment" | "rental">("appointment");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tu będzie logika zapisywania do bazy danych
    console.log({
      type: bookingType,
      title,
      description,
      date: selectedSlot?.date,
      hour: selectedSlot?.hour
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Nowa rezerwacja - {selectedSlot && format(selectedSlot.date, "d MMMM yyyy", { locale: pl })} {selectedSlot?.hour}:00
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bookingType">Typ rezerwacji</Label>
            <Select value={bookingType} onValueChange={(value: "appointment" | "rental") => setBookingType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz typ rezerwacji" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="appointment">Wizyta</SelectItem>
                <SelectItem value="rental">Wynajem gabinetu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Tytuł</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={bookingType === "appointment" ? "Wizyta - Jan Kowalski" : "Wynajem - Dr Anna Nowak"}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Opis (opcjonalnie)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Dodatkowe informacje..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Anuluj
            </Button>
            <Button type="submit">Zapisz rezerwację</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
