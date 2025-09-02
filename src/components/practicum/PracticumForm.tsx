import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PracticumFormData {
  title: string;
  description: string;
  location: string;
  isOnline: boolean;
  compensationType: 'paid' | 'unpaid' | 'compensated';
  compensationAmount?: number;
  durationWeeks?: number;
  hoursPerWeek?: number;
  requirements: string;
  responsibilities: string;
  startDate?: string;
  applicationDeadline?: string;
  contactEmail: string;
  contactPhone?: string;
}

const PracticumForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, setValue, watch } = useForm<PracticumFormData>();

  const compensationType = watch('compensationType');
  const isOnline = watch('isOnline');

  const onSubmit = async (data: PracticumFormData) => {
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Błąd",
          description: "Musisz być zalogowany, aby dodać praktyki.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('practicums')
        .insert({
          organization_id: user.id,
          title: data.title,
          description: data.description,
          location: data.isOnline ? null : data.location,
          is_online: data.isOnline,
          compensation_type: data.compensationType,
          compensation_amount: data.compensationAmount,
          duration_weeks: data.durationWeeks,
          hours_per_week: data.hoursPerWeek,
          requirements: data.requirements,
          responsibilities: data.responsibilities,
          start_date: data.startDate,
          application_deadline: data.applicationDeadline,
          contact_email: data.contactEmail,
          contact_phone: data.contactPhone,
        });

      if (error) throw error;

      toast({
        title: "Sukces!",
        description: "Praktyki zostały dodane do bazy.",
      });
      
      reset();
    } catch (error) {
      console.error('Error adding practicum:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się dodać praktyk. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dodaj praktyki psychologiczne</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Tytuł praktyk *</Label>
                <Input
                  id="title"
                  {...register("title", { required: true })}
                  placeholder="np. Praktyki w Poradni Zdrowia Psychicznego"
                />
              </div>

              <div>
                <Label htmlFor="description">Opis</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Opisz czego dotyczą praktyki, jakie umiejętności rozwijają..."
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isOnline"
                  onCheckedChange={(checked) => setValue('isOnline', !!checked)}
                />
                <Label htmlFor="isOnline">Praktyki online</Label>
              </div>

              {!isOnline && (
                <div>
                  <Label htmlFor="location">Lokalizacja</Label>
                  <Input
                    id="location"
                    {...register("location")}
                    placeholder="Miasto, adres"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="compensationType">Typ wynagrodzenia *</Label>
                <Select onValueChange={(value) => setValue('compensationType', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz typ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Płatny</SelectItem>
                    <SelectItem value="unpaid">Bezpłatny</SelectItem>
                    <SelectItem value="compensated">Dofinansowany</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {compensationType === 'paid' && (
                <div>
                  <Label htmlFor="compensationAmount">Wysokość wynagrodzenia (zł/miesiąc)</Label>
                  <Input
                    id="compensationAmount"
                    type="number"
                    {...register("compensationAmount")}
                    placeholder="np. 1500"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="durationWeeks">Czas trwania (tygodnie)</Label>
                  <Input
                    id="durationWeeks"
                    type="number"
                    {...register("durationWeeks")}
                    placeholder="np. 12"
                  />
                </div>
                <div>
                  <Label htmlFor="hoursPerWeek">Godziny tygodniowo</Label>
                  <Input
                    id="hoursPerWeek"
                    type="number"
                    {...register("hoursPerWeek")}
                    placeholder="np. 20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Data rozpoczęcia</Label>
                  <Input
                    id="startDate"
                    type="date"
                    {...register("startDate")}
                  />
                </div>
                <div>
                  <Label htmlFor="applicationDeadline">Termin aplikacji</Label>
                  <Input
                    id="applicationDeadline"
                    type="date"
                    {...register("applicationDeadline")}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="requirements">Wymagania</Label>
                <Textarea
                  id="requirements"
                  {...register("requirements")}
                  placeholder="np. Student psychologii, ukończone 3 lata studiów..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="responsibilities">Obowiązki</Label>
                <Textarea
                  id="responsibilities"
                  {...register("responsibilities")}
                  placeholder="np. Wsparcie w prowadzeniu terapii, dokumentacja..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactEmail">Email kontaktowy *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    {...register("contactEmail", { required: true })}
                    placeholder="kontakt@firma.pl"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Telefon kontaktowy</Label>
                  <Input
                    id="contactPhone"
                    {...register("contactPhone")}
                    placeholder="+48 123 456 789"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Dodawanie..." : "Dodaj praktyki"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PracticumForm;