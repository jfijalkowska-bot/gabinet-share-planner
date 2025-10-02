import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Check, X, Clock, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface Booking {
  id: string;
  title: string;
  description: string | null;
  booking_type: string;
  start_time: string;
  end_time: string;
  status: string;
  user_id: string;
  provider_id: string;
  conversation_id: string | null;
}

export default function BookingRequestsList() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['booking-requests'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get bookings where user is the provider (receiving bookings)
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('provider_id', user.id)
        .order('start_time', { ascending: true });

      if (error) throw error;
      return data as Booking[];
    }
  });

  const updateBookingStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ['booking-requests'] });
      toast.success(
        status === 'confirmed' 
          ? "Rezerwacja potwierdzona" 
          : "Rezerwacja odrzucona"
      );
    },
    onError: () => {
      toast.error("Nie udało się zaktualizować rezerwacji");
    }
  });

  const handleOpenChat = (conversationId: string) => {
    navigate(`/messages?conversation=${conversationId}`);
  };

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  const pendingBookings = bookings?.filter(b => b.status === 'pending');
  const confirmedBookings = bookings?.filter(b => b.status === 'confirmed');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Oczekujące rezerwacje</CardTitle>
          <CardDescription>
            Zaakceptuj lub odrzuć nowe prośby o rezerwację
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!pendingBookings?.length ? (
            <p className="text-muted-foreground text-center py-8">
              Brak oczekujących rezerwacji
            </p>
          ) : (
            <div className="space-y-4">
              {pendingBookings.map(booking => (
                <div 
                  key={booking.id}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{booking.title}</h4>
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          Oczekuje
                        </Badge>
                      </div>
                      {booking.description && (
                        <p className="text-sm text-muted-foreground">
                          {booking.description}
                        </p>
                      )}
                    </div>
                    <Badge>
                      {booking.booking_type === 'appointment' ? 'Wizyta' : 'Wynajem'}
                    </Badge>
                  </div>

                  <div className="text-sm">
                    <span className="text-muted-foreground">Termin: </span>
                    <span className="font-medium">
                      {format(new Date(booking.start_time), "d MMMM yyyy, HH:mm", { locale: pl })}
                      {' - '}
                      {format(new Date(booking.end_time), "HH:mm", { locale: pl })}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {booking.conversation_id ? (
                      <Button
                        size="sm"
                        onClick={() => handleOpenChat(booking.conversation_id!)}
                      >
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Otwórz czat
                      </Button>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Brak konwersacji
                      </p>
                    )}
                    <Button
                      size="sm"
                      onClick={() => updateBookingStatus.mutate({ 
                        id: booking.id, 
                        status: 'confirmed' 
                      })}
                      disabled={updateBookingStatus.isPending}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Potwierdź
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateBookingStatus.mutate({ 
                        id: booking.id, 
                        status: 'rejected' 
                      })}
                      disabled={updateBookingStatus.isPending}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Odrzuć
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Potwierdzone rezerwacje</CardTitle>
          <CardDescription>
            Lista zaakceptowanych rezerwacji
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!confirmedBookings?.length ? (
            <p className="text-muted-foreground text-center py-8">
              Brak potwierdzonych rezerwacji
            </p>
          ) : (
            <div className="space-y-3">
              {confirmedBookings.map(booking => (
                <div 
                  key={booking.id}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{booking.title}</h4>
                    <Badge variant="secondary">
                      <Check className="w-3 h-3 mr-1" />
                      Potwierdzona
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(booking.start_time), "d MMMM yyyy, HH:mm", { locale: pl })}
                    {' - '}
                    {format(new Date(booking.end_time), "HH:mm", { locale: pl })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
