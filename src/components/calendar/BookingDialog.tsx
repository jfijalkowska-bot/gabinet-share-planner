
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
import { toast } from "sonner";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSlot?: {
    date: Date;
    hour: number;
    providerId?: string;
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
    
    if (!title.trim()) {
      toast.error("Proszę wypełnić tytuł rezerwacji");
      return;
    }

    if (!selectedSlot?.providerId) {
      toast.error("Brak informacji o właścicielu terminu");
      return;
    }

    setLoading(true);

    try {
      if (!user) {
        toast.error("Musisz być zalogowany");
        return;
      }

      const bookingDate = new Date(selectedSlot.date);
      bookingDate.setHours(selectedSlot.hour, 0, 0, 0);
      const endTime = new Date(bookingDate.getTime() + 60 * 60 * 1000);

      // Najpierw tworzymy konwersację
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .insert([{}])
        .select()
        .single();

      if (convError) throw convError;

      // Dodajemy uczestników do konwersacji
      const { error: participantsError } = await supabase
        .from('conversation_participants')
        .insert([
          { conversation_id: conversation.id, user_id: user.id },
          { conversation_id: conversation.id, user_id: selectedSlot.providerId }
        ]);

      if (participantsError) throw participantsError;

      // Tworzymy rezerwację z linkiem do konwersacji
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert([{
          user_id: user.id,
          provider_id: selectedSlot.providerId,
          conversation_id: conversation.id,
          title,
          description,
          booking_type: bookingType,
          start_time: bookingDate.toISOString(),
          end_time: endTime.toISOString(),
          status: 'pending',
        } as any]);

      if (bookingError) throw bookingError;

      // Wysyłamy automatyczną wiadomość z detalami rezerwacji
      const messageContent = `📅 **Prośba o rezerwację**\n\n**${title}**\n${description ? description + '\n\n' : ''}**Typ:** ${bookingType === 'appointment' ? 'Wizyta' : 'Wynajem'}\n**Termin:** ${format(bookingDate, "d MMMM yyyy, HH:mm", { locale: pl })} - ${format(endTime, "HH:mm", { locale: pl })}\n\nProszę o potwierdzenie dostępności i ustalenie szczegółów płatności.`;

      const { error: messageError } = await supabase
        .from('messages')
        .insert([{
          conversation_id: conversation.id,
          sender_id: user.id,
          content: messageContent
        }]);

      if (messageError) throw messageError;

      toast.success("Rezerwacja utworzona! Rozpoczęto rozmowę z właścicielem.");
      onClose();
      
      // Opcjonalnie przekieruj do czatu
      window.location.href = `/messages?conversation=${conversation.id}`;
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error("Nie udało się utworzyć rezerwacji");
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
