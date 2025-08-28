import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

interface TrainingFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface TrainingFormData {
  title: string;
  description: string;
  topic: string;
  keywords: string;
  format: string;
  location?: string;
  price: string;
  currency: string;
  max_participants: string;
  start_date: string;
  start_time: string;
  end_date?: string;
  end_time?: string;
  registration_deadline?: string;
  instructor_name?: string;
  instructor_bio?: string;
  requirements?: string;
  certificate_available: boolean;
}

const TrainingForm = ({ onSuccess, onCancel }: TrainingFormProps) => {
  const { user } = useAuth();
  const [creating, setCreating] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<TrainingFormData>({
    defaultValues: {
      format: "online",
      currency: "PLN",
      certificate_available: false,
    }
  });

  const watchFormat = watch("format");

  const onSubmit = async (data: TrainingFormData) => {
    if (!user) return;

    setCreating(true);
    try {
      const startDateTime = new Date(`${data.start_date}T${data.start_time}`);
      let endDateTime = null;
      
      if (data.end_date && data.end_time) {
        endDateTime = new Date(`${data.end_date}T${data.end_time}`);
      }

      const keywordsArray = data.keywords.split(',').map(k => k.trim()).filter(k => k);

      const trainingData = {
        organizer_id: user.id,
        title: data.title,
        description: data.description,
        topic: data.topic,
        keywords: keywordsArray,
        format: data.format,
        location: data.format === 'offline' ? data.location : null,
        price: parseFloat(data.price),
        currency: data.currency,
        max_participants: parseInt(data.max_participants),
        start_date: startDateTime.toISOString(),
        end_date: endDateTime?.toISOString() || null,
        registration_deadline: data.registration_deadline 
          ? new Date(data.registration_deadline).toISOString() 
          : null,
        instructor_name: data.instructor_name || null,
        instructor_bio: data.instructor_bio || null,
        requirements: data.requirements || null,
        certificate_available: data.certificate_available,
        current_participants: 0,
        is_active: true,
      };

      const { error } = await supabase
        .from('trainings')
        .insert(trainingData);

      if (error) throw error;

      toast({
        title: "Sukces!",
        description: "Szkolenie zostało dodane pomyślnie.",
      });

      onSuccess();
    } catch (error) {
      console.error('Error creating training:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się dodać szkolenia. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Dodaj nowe szkolenie</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="title">Tytuł szkolenia *</Label>
            <Input
              id="title"
              {...register("title", { required: "Tytuł jest wymagany" })}
              placeholder="Wprowadź tytuł szkolenia"
            />
            {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="description">Opis</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Opisz szkolenie, jego cele i korzyści"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="topic">Tematyka</Label>
            <Select onValueChange={(value) => setValue("topic", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz tematykę" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="therapy">Terapia</SelectItem>
                <SelectItem value="counseling">Poradnictwo</SelectItem>
                <SelectItem value="psychology">Psychologia</SelectItem>
                <SelectItem value="psychiatry">Psychiatria</SelectItem>
                <SelectItem value="neurology">Neurologia</SelectItem>
                <SelectItem value="rehabilitation">Rehabilitacja</SelectItem>
                <SelectItem value="coaching">Coaching</SelectItem>
                <SelectItem value="supervision">Superwizja</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="keywords">Słowa kluczowe</Label>
            <Input
              id="keywords"
              {...register("keywords")}
              placeholder="np. CBT, mindfulness, trauma (oddziel przecinkami)"
            />
          </div>
        </div>

        {/* Format and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="format">Format *</Label>
            <Select onValueChange={(value) => setValue("format", value)} defaultValue="online">
              <SelectTrigger>
                <SelectValue placeholder="Wybierz format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Stacjonarne</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {watchFormat === "offline" && (
            <div>
              <Label htmlFor="location">Lokalizacja *</Label>
              <Input
                id="location"
                {...register("location", { 
                  required: watchFormat === "offline" ? "Lokalizacja jest wymagana dla szkoleń stacjonarnych" : false 
                })}
                placeholder="Miasto, adres"
              />
              {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>}
            </div>
          )}
        </div>

        {/* Price and Participants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="price">Cena *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { required: "Cena jest wymagana" })}
              placeholder="0.00"
            />
            {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <Label htmlFor="currency">Waluta</Label>
            <Select onValueChange={(value) => setValue("currency", value)} defaultValue="PLN">
              <SelectTrigger>
                <SelectValue placeholder="Waluta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PLN">PLN</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="max_participants">Max uczestników *</Label>
            <Input
              id="max_participants"
              type="number"
              {...register("max_participants", { required: "Liczba uczestników jest wymagana" })}
              placeholder="20"
            />
            {errors.max_participants && <p className="text-sm text-red-600 mt-1">{errors.max_participants.message}</p>}
          </div>
        </div>

        {/* Dates and Times */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="start_date">Data rozpoczęcia *</Label>
            <Input
              id="start_date"
              type="date"
              {...register("start_date", { required: "Data rozpoczęcia jest wymagana" })}
            />
            {errors.start_date && <p className="text-sm text-red-600 mt-1">{errors.start_date.message}</p>}
          </div>

          <div>
            <Label htmlFor="start_time">Godzina rozpoczęcia *</Label>
            <Input
              id="start_time"
              type="time"
              {...register("start_time", { required: "Godzina rozpoczęcia jest wymagana" })}
            />
            {errors.start_time && <p className="text-sm text-red-600 mt-1">{errors.start_time.message}</p>}
          </div>

          <div>
            <Label htmlFor="end_date">Data zakończenia</Label>
            <Input
              id="end_date"
              type="date"
              {...register("end_date")}
            />
          </div>

          <div>
            <Label htmlFor="end_time">Godzina zakończenia</Label>
            <Input
              id="end_time"
              type="time"
              {...register("end_time")}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="registration_deadline">Termin zapisów</Label>
            <Input
              id="registration_deadline"
              type="date"
              {...register("registration_deadline")}
            />
          </div>
        </div>

        {/* Instructor Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="instructor_name">Prowadzący</Label>
            <Input
              id="instructor_name"
              {...register("instructor_name")}
              placeholder="Imię i nazwisko prowadzącego"
            />
          </div>

          <div>
            <Label htmlFor="requirements">Wymagania</Label>
            <Input
              id="requirements"
              {...register("requirements")}
              placeholder="np. doświadczenie w terapii"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="instructor_bio">Bio prowadzącego</Label>
            <Textarea
              id="instructor_bio"
              {...register("instructor_bio")}
              placeholder="Krótkie bio prowadzącego"
              rows={3}
            />
          </div>
        </div>

        {/* Certificate */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="certificate"
            onCheckedChange={(checked) => setValue("certificate_available", !!checked)}
          />
          <Label htmlFor="certificate">Szkolenie z certyfikatem</Label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={creating}
          >
            Anuluj
          </Button>
          <Button
            type="submit"
            disabled={creating}
            className="bg-therapy-600 hover:bg-therapy-700"
          >
            {creating ? "Dodawanie..." : "Dodaj szkolenie"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TrainingForm;