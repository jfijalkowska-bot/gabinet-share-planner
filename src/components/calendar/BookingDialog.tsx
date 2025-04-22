
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSlot?: {
    date: Date;
    hour: number;
  };
}

type BookingType = "appointment" | "rental";

const BookingDialog = ({ isOpen, onClose, selectedSlot }: BookingDialogProps) => {
  const [bookingType, setBookingType] = useState<BookingType>("appointment");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSlot || !user) return;
    
    setLoading(true);

    try {
      const bookingDate = new Date(selectedSlot.date);
      bookingDate.setHours(selectedSlot.hour, 0, 0, 0);
      
      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          title,
          description,
          booking_type: bookingType,
          start_time: bookingDate.toISOString(),
          end_time: new Date(bookingDate.getTime() + 60 * 60 * 1000).toISOString(),
        } as Database['public']['Tables']['bookings']['Insert']);

      if (error) {
        console.error("Błąd zapisu rezerwacji:", error);
        toast({
          title: "Błąd rezerwacji",
          description: "Nie udało się zapisać rezerwacji. Spróbuj ponownie.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Rezerwacja utworzona",
          description: "Rezerwacja została pomyślnie zapisana."
        });
        onClose();
      }
    } catch (error) {
      console.error("Wystąpił błąd:", error);
      toast({
        title: "Wystąpił błąd",
        description: "Nie udało się zapisać rezerwacji. Spróbuj ponownie później.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
            <Select value={bookingType} onValueChange={(value: "appointment" | "rental") => setBookingType(value)} disabled={loading}>
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
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Opis (opcjonalnie)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Dodatkowe informacje..."
              disabled={loading}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Anuluj
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Zapisywanie..." : "Zapisz rezerwację"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
