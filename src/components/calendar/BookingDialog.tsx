
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";
import { useTherapistServices, type TherapistService } from "@/hooks/useTherapistServices";
import { Clock, Monitor, MapPin, AlertCircle } from "lucide-react";

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
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const { data: services } = useTherapistServices(selectedSlot?.providerId);
  const activeServices = services?.filter((s) => s.is_active) || [];

  const selectedService = activeServices.find((s) => s.id === selectedServiceId);

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

    if (bookingType === "appointment" && !selectedServiceId) {
      toast.error("Proszę wybrać usługę");
      return;
    }

    setLoading(true);

    try {
      if (!user) {
        toast.error("Musisz być zalogowany");
        return;
      }

      const durationMinutes = selectedService?.duration_minutes || 60;
      const bookingDate = new Date(selectedSlot.date);
      bookingDate.setHours(selectedSlot.hour, 0, 0, 0);
      const endTime = new Date(bookingDate.getTime() + durationMinutes * 60 * 1000);

      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .insert([{}])
        .select()
        .single();

      if (convError) throw convError;

      const { error: participantsError } = await supabase
        .from('conversation_participants')
        .insert([
          { conversation_id: conversation.id, user_id: user.id },
          { conversation_id: conversation.id, user_id: selectedSlot.providerId }
        ]);

      if (participantsError) throw participantsError;

      const { error: bookingError } = await supabase
        .from('bookings')
        .insert([{
          user_id: user.id,
          provider_id: selectedSlot.providerId,
          conversation_id: conversation.id,
          service_id: selectedServiceId || null,
          title,
          description,
          booking_type: bookingType,
          start_time: bookingDate.toISOString(),
          end_time: endTime.toISOString(),
          status: 'pending',
        } as any]);

      if (bookingError) throw bookingError;

      const serviceName = selectedService?.name || (bookingType === 'rental' ? 'Wynajem' : 'Wizyta');
      const messageContent = `📅 **Prośba o rezerwację**\n\n**${title}**\n**Usługa:** ${serviceName} (${durationMinutes} min)\n${description ? description + '\n\n' : ''}**Typ:** ${bookingType === 'appointment' ? 'Wizyta' : 'Wynajem'}\n**Termin:** ${format(bookingDate, "d MMMM yyyy, HH:mm", { locale: pl })} - ${format(endTime, "HH:mm", { locale: pl })}\n${selectedService?.note_for_client ? `\n⚠️ **Uwaga:** ${selectedService.note_for_client}\n` : ''}\nProszę o potwierdzenie dostępności i ustalenie szczegółów płatności.`;

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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Nowa rezerwacja - {selectedSlot && format(selectedSlot.date, "d MMMM yyyy", { locale: pl })} {selectedSlot?.hour}:00
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Typ rezerwacji</Label>
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

          {bookingType === "appointment" && activeServices.length > 0 && (
            <div className="space-y-2">
              <Label>Wybierz usługę *</Label>
              <Select value={selectedServiceId} onValueChange={setSelectedServiceId} disabled={loading}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz rodzaj sesji" />
                </SelectTrigger>
                <SelectContent>
                  {activeServices.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      <span className="flex items-center gap-2">
                        {s.name} — {s.duration_minutes} min
                        {s.price && <span className="text-muted-foreground">({s.price} PLN)</span>}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedService && (
                <div className="rounded-md border p-3 space-y-1 bg-muted/30">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedService.duration_minutes} min</span>
                    {selectedService.service_type === "remote" ? (
                      <Badge variant="secondary" className="text-xs gap-1"><Monitor className="w-3 h-3" />Zdalna</Badge>
                    ) : selectedService.service_type === "in_person" ? (
                      <Badge variant="secondary" className="text-xs gap-1"><MapPin className="w-3 h-3" />Stacjonarna</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">Stacjonarna/Zdalna</Badge>
                    )}
                  </div>
                  {selectedService.description && (
                    <p className="text-xs text-muted-foreground">{selectedService.description}</p>
                  )}
                  {selectedService.note_for_client && (
                    <div className="flex items-start gap-1.5 text-xs text-destructive bg-destructive/10 p-2 rounded">
                      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      {selectedService.note_for_client}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

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
