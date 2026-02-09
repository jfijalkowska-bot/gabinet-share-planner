import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useTherapistServices } from "@/hooks/useTherapistServices";

interface AvailabilitySlot {
  id?: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  provider_type: 'therapist' | 'office';
}

const DAYS = [
  { value: 0, label: "Niedziela" },
  { value: 1, label: "Poniedziałek" },
  { value: 2, label: "Wtorek" },
  { value: 3, label: "Środa" },
  { value: 4, label: "Czwartek" },
  { value: 5, label: "Piątek" },
  { value: 6, label: "Sobota" },
];

const HOURS = Array.from({ length: 24 }, (_, i) => 
  `${i.toString().padStart(2, '0')}:00`
);

export default function AvailabilityManager() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlotServices, setSelectedSlotServices] = useState<Record<string, string[]>>({});
  const [newSlot, setNewSlot] = useState<Partial<AvailabilitySlot>>({
    day_of_week: 1,
    start_time: "09:00",
    end_time: "17:00",
    is_active: true,
    provider_type: "therapist"
  });
  const [newSlotServiceIds, setNewSlotServiceIds] = useState<string[]>([]);

  const { data: services } = useTherapistServices();
  const activeServices = services?.filter(s => s.is_active) || [];

  const { data: slots, isLoading } = useQuery({
    queryKey: ['availability-slots'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('availability_slots')
        .select('*')
        .eq('provider_id', user.id)
        .order('day_of_week')
        .order('start_time');

      if (error) throw error;
      return data as AvailabilitySlot[];
    }
  });

  // Fetch slot-service links
  const { data: slotServicesData } = useQuery({
    queryKey: ['availability-slot-services'],
    queryFn: async () => {
      if (!slots?.length) return [];
      const slotIds = slots.map(s => s.id).filter(Boolean) as string[];
      if (!slotIds.length) return [];
      
      const { data, error } = await supabase
        .from('availability_slot_services')
        .select('*')
        .in('availability_slot_id', slotIds);
      
      if (error) throw error;
      return data as { id: string; availability_slot_id: string; service_id: string }[];
    },
    enabled: !!slots?.length
  });

  const getServicesForSlot = (slotId: string) => {
    return slotServicesData?.filter(ss => ss.availability_slot_id === slotId) || [];
  };

  const createSlot = useMutation({
    mutationFn: async (slot: Partial<AvailabilitySlot>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('availability_slots')
        .insert([{
          provider_id: user.id,
          day_of_week: slot.day_of_week!,
          start_time: slot.start_time!,
          end_time: slot.end_time!,
          is_active: slot.is_active ?? true,
          provider_type: slot.provider_type!
        }] as any)
        .select()
        .single();

      if (error) throw error;

      // Link services if selected
      if (newSlotServiceIds.length > 0 && data) {
        const links = newSlotServiceIds.map(serviceId => ({
          availability_slot_id: data.id,
          service_id: serviceId
        }));
        const { error: linkError } = await supabase
          .from('availability_slot_services')
          .insert(links);
        if (linkError) throw linkError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability-slots'] });
      queryClient.invalidateQueries({ queryKey: ['availability-slot-services'] });
      toast.success("Slot dostępności dodany");
      setIsOpen(false);
      setNewSlotServiceIds([]);
      setNewSlot({
        day_of_week: 1,
        start_time: "09:00",
        end_time: "17:00",
        is_active: true,
        provider_type: "therapist"
      });
    },
    onError: () => {
      toast.error("Nie udało się dodać slotu");
    }
  });

  const deleteSlot = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('availability_slots')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability-slots'] });
      queryClient.invalidateQueries({ queryKey: ['availability-slot-services'] });
      toast.success("Slot usunięty");
    },
    onError: () => {
      toast.error("Nie udało się usunąć slotu");
    }
  });

  const toggleSlot = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('availability_slots')
        .update({ is_active })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability-slots'] });
    }
  });

  const toggleServiceForNewSlot = (serviceId: string) => {
    setNewSlotServiceIds(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Zarządzanie dostępnością</CardTitle>
            <CardDescription>
              Zdefiniuj swoje godziny dostępności i przypisz dozwolone usługi do każdego slotu.
            </CardDescription>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Dodaj slot
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dodaj nowy slot dostępności</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Dzień tygodnia</Label>
                  <Select
                    value={newSlot.day_of_week?.toString()}
                    onValueChange={(value) => setNewSlot({ ...newSlot, day_of_week: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS.map(day => (
                        <SelectItem key={day.value} value={day.value.toString()}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Od godziny</Label>
                    <Select
                      value={newSlot.start_time}
                      onValueChange={(value) => setNewSlot({ ...newSlot, start_time: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {HOURS.map(hour => (
                          <SelectItem key={hour} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Do godziny</Label>
                    <Select
                      value={newSlot.end_time}
                      onValueChange={(value) => setNewSlot({ ...newSlot, end_time: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {HOURS.map(hour => (
                          <SelectItem key={hour} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Typ</Label>
                  <Select
                    value={newSlot.provider_type}
                    onValueChange={(value: 'therapist' | 'office') => 
                      setNewSlot({ ...newSlot, provider_type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="therapist">Wizyty terapeutyczne</SelectItem>
                      <SelectItem value="office">Wynajem gabinetu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {activeServices.length > 0 && newSlot.provider_type === 'therapist' && (
                  <div className="space-y-2">
                    <Label>Dozwolone usługi w tym slocie</Label>
                    <p className="text-xs text-muted-foreground">
                      Pozostaw puste, aby zezwolić na wszystkie usługi. Zaznacz konkretne, aby ograniczyć.
                    </p>
                    <div className="space-y-2 max-h-48 overflow-y-auto border rounded p-3">
                      {activeServices.map(s => (
                        <div key={s.id} className="flex items-center gap-2">
                          <Checkbox
                            id={`new-slot-service-${s.id}`}
                            checked={newSlotServiceIds.includes(s.id)}
                            onCheckedChange={() => toggleServiceForNewSlot(s.id)}
                          />
                          <label htmlFor={`new-slot-service-${s.id}`} className="text-sm cursor-pointer">
                            {s.name} ({s.duration_minutes} min)
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  onClick={() => createSlot.mutate(newSlot)}
                  disabled={createSlot.isPending}
                  className="w-full"
                >
                  Dodaj slot
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {slots?.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nie masz jeszcze zdefiniowanych slotów dostępności. Dodaj pierwszy slot, aby klienci mogli dokonywać rezerwacji.
            </p>
          ) : (
            <div className="space-y-2">
              {DAYS.map(day => {
                const daySlots = slots?.filter(s => s.day_of_week === day.value);
                if (!daySlots?.length) return null;

                return (
                  <div key={day.value} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{day.label}</h4>
                    <div className="space-y-2">
                      {daySlots.map(slot => {
                        const linkedServices = getServicesForSlot(slot.id!);
                        const linkedServiceNames = linkedServices
                          .map(ls => activeServices.find(s => s.id === ls.service_id)?.name)
                          .filter(Boolean);

                        return (
                          <div 
                            key={slot.id} 
                            className="flex items-center justify-between bg-muted/50 p-3 rounded"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-4">
                                <span className="font-medium">
                                  {slot.start_time} - {slot.end_time}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {slot.provider_type === 'therapist' ? 'Wizyty' : 'Wynajem'}
                                </span>
                              </div>
                              {linkedServiceNames.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {linkedServiceNames.map((name, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                      {name}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              {linkedServiceNames.length === 0 && slot.provider_type === 'therapist' && (
                                <span className="text-xs text-muted-foreground">Wszystkie usługi dozwolone</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={slot.is_active}
                                onCheckedChange={(checked) => 
                                  toggleSlot.mutate({ id: slot.id!, is_active: checked })
                                }
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteSlot.mutate(slot.id!)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
