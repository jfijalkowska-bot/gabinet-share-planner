
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
import { it } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";
import { useTherapistServices, type TherapistService } from "@/hooks/useTherapistServices";
import { useCountryLogic } from "@/hooks/useCountryLogic";
import { useTranslation } from "react-i18next";
import { Clock, Monitor, MapPin, AlertCircle, CreditCard, Gift } from "lucide-react";

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
  const [isFreeConsultation, setIsFreeConsultation] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { t } = useTranslation();
  const { isItaly, requiresPaymentAtBooking, hasFreeConsultation, currentLang } = useCountryLogic();

  const dateLocale = currentLang === "it" ? it : pl;

  const { data: services } = useTherapistServices(selectedSlot?.providerId);
  const activeServices = services?.filter((s) => s.is_active) || [];

  const selectedService = activeServices.find((s) => s.id === selectedServiceId);

  const handleFreeConsultation = async () => {
    setIsFreeConsultation(true);
    setTitle(t("booking.freeConsultation"));
    // Auto-submit free consultation booking
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error(isItaly ? "Inserisci un titolo per la prenotazione" : "Proszę wypełnić tytuł rezerwacji");
      return;
    }

    if (!selectedSlot?.providerId) {
      toast.error(isItaly ? "Informazioni sul fornitore mancanti" : "Brak informacji o właścicielu terminu");
      return;
    }

    if (bookingType === "appointment" && !selectedServiceId && !isFreeConsultation) {
      toast.error(isItaly ? "Seleziona un servizio" : "Proszę wybrać usługę");
      return;
    }

    setLoading(true);

    try {
      if (!user) {
        toast.error(isItaly ? "Devi essere connesso" : "Musisz być zalogowany");
        return;
      }

      const durationMinutes = isFreeConsultation ? 15 : (selectedService?.duration_minutes || 60);
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
          service_id: isFreeConsultation ? null : (selectedServiceId || null),
          title,
          description,
          booking_type: bookingType,
          start_time: bookingDate.toISOString(),
          end_time: endTime.toISOString(),
          status: 'pending',
        } as any]);

      if (bookingError) throw bookingError;

      // For Italy: if not free consultation and payment required, redirect to payment
      if (requiresPaymentAtBooking && !isFreeConsultation && selectedService?.price) {
        const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment', {
          body: {
            appointmentId: conversation.id,
            amount: selectedService.price,
            currency: 'EUR',
          },
        });

        if (!paymentError && paymentData?.url) {
          toast.success(isItaly ? "Reindirizzamento al pagamento..." : "Przekierowanie do płatności...");
          window.open(paymentData.url, '_blank');
          onClose();
          return;
        }
      }

      const serviceName = isFreeConsultation 
        ? (isItaly ? 'Colloquio conoscitivo gratuito' : 'Rozmowa wstępna')
        : (selectedService?.name || (bookingType === 'rental' ? (isItaly ? 'Affitto' : 'Wynajem') : (isItaly ? 'Visita' : 'Wizyta')));
      
      const messageContent = isItaly
        ? `📅 **Richiesta di prenotazione**\n\n**${title}**\n**Servizio:** ${serviceName} (${durationMinutes} min)\n${description ? description + '\n\n' : ''}**Tipo:** ${bookingType === 'appointment' ? 'Appuntamento' : 'Affitto'}\n**Data:** ${format(bookingDate, "d MMMM yyyy, HH:mm", { locale: it })} - ${format(endTime, "HH:mm", { locale: it })}\n${selectedService?.note_for_client ? `\n⚠️ **Nota:** ${selectedService.note_for_client}\n` : ''}${isFreeConsultation ? '\n🆓 Colloquio conoscitivo gratuito di 15 minuti.\n' : ''}\nSi prega di confermare la disponibilità.`
        : `📅 **Prośba o rezerwację**\n\n**${title}**\n**Usługa:** ${serviceName} (${durationMinutes} min)\n${description ? description + '\n\n' : ''}**Typ:** ${bookingType === 'appointment' ? 'Wizyta' : 'Wynajem'}\n**Termin:** ${format(bookingDate, "d MMMM yyyy, HH:mm", { locale: pl })} - ${format(endTime, "HH:mm", { locale: pl })}\n${selectedService?.note_for_client ? `\n⚠️ **Uwaga:** ${selectedService.note_for_client}\n` : ''}\nProszę o potwierdzenie dostępności i ustalenie szczegółów płatności.`;

      const { error: messageError } = await supabase
        .from('messages')
        .insert([{
          conversation_id: conversation.id,
          sender_id: user.id,
          content: messageContent
        }]);

      if (messageError) throw messageError;

      toast.success(isItaly ? "Prenotazione creata! Conversazione avviata." : "Rezerwacja utworzona! Rozpoczęto rozmowę z właścicielem.");
      onClose();
      window.location.href = `/messages?conversation=${conversation.id}`;
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error(isItaly ? "Impossibile creare la prenotazione" : "Nie udało się utworzyć rezerwacji");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isItaly ? "Nuova prenotazione" : "Nowa rezerwacja"} - {selectedSlot && format(selectedSlot.date, "d MMMM yyyy", { locale: dateLocale })} {selectedSlot?.hour}:00
          </DialogTitle>
        </DialogHeader>

        {/* Italy: Free consultation option */}
        {hasFreeConsultation && bookingType === "appointment" && !isFreeConsultation && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">{t("booking.freeConsultation")}</span>
            </div>
            <p className="text-sm text-green-700">{t("booking.freeConsultationDesc")}</p>
            <Button 
              type="button" 
              variant="outline" 
              className="border-green-300 text-green-700 hover:bg-green-100"
              onClick={() => {
                setIsFreeConsultation(true);
                setTitle(isItaly ? "Colloquio conoscitivo gratuito" : "Rozmowa wstępna");
              }}
              disabled={loading}
            >
              <Gift className="w-4 h-4 mr-2" />
              {t("booking.slot15min")} - {t("booking.freeConsultation")}
            </Button>
          </div>
        )}

        {isFreeConsultation && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">{t("booking.freeConsultation")} - 15 min</span>
              </div>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setIsFreeConsultation(false);
                  setTitle("");
                }}
              >
                {t("common.cancel")}
              </Button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isFreeConsultation && (
            <>
              <div className="space-y-2">
                <Label>{isItaly ? "Tipo di prenotazione" : "Typ rezerwacji"}</Label>
                <Select value={bookingType} onValueChange={(value: "appointment" | "rental") => setBookingType(value)} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue placeholder={isItaly ? "Seleziona tipo" : "Wybierz typ rezerwacji"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appointment">{isItaly ? "Appuntamento" : "Wizyta"}</SelectItem>
                    <SelectItem value="rental">{isItaly ? "Affitto studio" : "Wynajem gabinetu"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {bookingType === "appointment" && activeServices.length > 0 && (
                <div className="space-y-2">
                  <Label>{isItaly ? "Seleziona servizio *" : "Wybierz usługę *"}</Label>
                  <Select value={selectedServiceId} onValueChange={setSelectedServiceId} disabled={loading}>
                    <SelectTrigger>
                      <SelectValue placeholder={isItaly ? "Seleziona tipo di sessione" : "Wybierz rodzaj sesji"} />
                    </SelectTrigger>
                    <SelectContent>
                      {activeServices.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          <span className="flex items-center gap-2">
                            {s.name} — {s.duration_minutes} min
                            {s.price && <span className="text-muted-foreground">({s.price} {isItaly ? 'EUR' : 'PLN'})</span>}
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
                          <Badge variant="secondary" className="text-xs gap-1"><Monitor className="w-3 h-3" />{isItaly ? "Online" : "Zdalna"}</Badge>
                        ) : selectedService.service_type === "in_person" ? (
                          <Badge variant="secondary" className="text-xs gap-1"><MapPin className="w-3 h-3" />{isItaly ? "In sede" : "Stacjonarna"}</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">{isItaly ? "In sede/Online" : "Stacjonarna/Zdalna"}</Badge>
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
                      {requiresPaymentAtBooking && selectedService.price && (
                        <div className="flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50 p-2 rounded mt-2">
                          <CreditCard className="w-3.5 h-3.5 shrink-0" />
                          {t("booking.paymentRequired")} — {selectedService.price} EUR
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">{isItaly ? "Titolo" : "Tytuł"}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={isFreeConsultation 
                ? (isItaly ? "Colloquio conoscitivo" : "Rozmowa wstępna")
                : (bookingType === "appointment" 
                  ? (isItaly ? "Appuntamento - Mario Rossi" : "Wizyta - Jan Kowalski") 
                  : (isItaly ? "Affitto - Dr. Anna Bianchi" : "Wynajem - Dr Anna Nowak"))
              }
              required
              disabled={loading || isFreeConsultation}
            />
          </div>

          {!isFreeConsultation && (
            <div className="space-y-2">
              <Label htmlFor="description">{isItaly ? "Descrizione (opzionale)" : "Opis (opcjonalnie)"}</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={isItaly ? "Informazioni aggiuntive..." : "Dodatkowe informacje..."}
                disabled={loading}
              />
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              {t("common.cancel")}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading 
                ? (isItaly ? "Salvataggio..." : "Zapisywanie...") 
                : requiresPaymentAtBooking && !isFreeConsultation && selectedService?.price
                  ? (isItaly ? "Prenota e paga" : "Zarezerwuj i zapłać")
                  : (isItaly ? "Conferma prenotazione" : "Zapisz rezerwację")
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
