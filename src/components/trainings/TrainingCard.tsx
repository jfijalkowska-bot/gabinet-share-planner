import { useState } from "react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users, Clock, Award, Globe, Building } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface Training {
  id: string;
  title: string;
  description: string;
  topic: string;
  keywords: string[];
  format: string;
  location?: string;
  price: number;
  currency: string;
  max_participants: number;
  current_participants: number;
  start_date: string;
  end_date?: string;
  registration_deadline?: string;
  instructor_name?: string;
  instructor_bio?: string;
  requirements?: string;
  certificate_available: boolean;
  organizer_id: string;
  created_at: string;
}

interface TrainingCardProps {
  training: Training;
}

const TrainingCard = ({ training }: TrainingCardProps) => {
  const { user } = useAuth();
  const [registering, setRegistering] = useState(false);

  const isRegistrationOpen = () => {
    if (!training.registration_deadline) return true;
    return new Date(training.registration_deadline) > new Date();
  };

  const isFull = () => {
    return training.current_participants >= training.max_participants;
  };

  const handleRegister = async () => {
    if (!user) {
      toast({
        title: "Wymagane logowanie",
        description: "Aby zapisać się na szkolenie, musisz się najpierw zalogować.",
        variant: "destructive",
      });
      return;
    }

    setRegistering(true);
    try {
      const { error } = await supabase
        .from('training_registrations')
        .insert({
          training_id: training.id,
          participant_id: user.id,
          status: 'pending',
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Już zapisany",
            description: "Jesteś już zapisany na to szkolenie.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Sukces!",
          description: "Zostałeś zapisany na szkolenie. Sprawdź swoją skrzynkę mailową.",
        });
        
        // Update current participants count (this would be better done with a database trigger)
        await supabase
          .from('trainings')
          .update({ 
            current_participants: training.current_participants + 1 
          })
          .eq('id', training.id);
      }
    } catch (error) {
      console.error('Error registering for training:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się zapisać na szkolenie. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
      setRegistering(false);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{training.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary">
                {training.format === 'online' ? (
                  <>
                    <Globe className="h-3 w-3 mr-1" />
                    Online
                  </>
                ) : (
                  <>
                    <Building className="h-3 w-3 mr-1" />
                    Stacjonarnie
                  </>
                )}
              </Badge>
              {training.certificate_available && (
                <Badge variant="outline">
                  <Award className="h-3 w-3 mr-1" />
                  Certyfikat
                </Badge>
              )}
              {training.topic && (
                <Badge variant="outline">{training.topic}</Badge>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-therapy-600">
              {training.price} {training.currency}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {training.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <CalendarDays className="h-4 w-4 mr-2" />
              {format(new Date(training.start_date), "d MMMM yyyy 'o' HH:mm", { locale: pl })}
              {training.end_date && (
                <span> - {format(new Date(training.end_date), "HH:mm", { locale: pl })}</span>
              )}
            </div>
            
            {training.format === 'offline' && training.location && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {training.location}
              </div>
            )}

            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              {training.current_participants} / {training.max_participants} uczestników
            </div>
          </div>

          <div className="space-y-2">
            {training.instructor_name && (
              <div className="text-sm">
                <span className="font-medium">Prowadzący:</span> {training.instructor_name}
              </div>
            )}

            {training.registration_deadline && (
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                Zapisy do: {format(new Date(training.registration_deadline), "d MMMM yyyy", { locale: pl })}
              </div>
            )}
          </div>
        </div>

        {training.keywords && training.keywords.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Słowa kluczowe:</div>
            <div className="flex flex-wrap gap-1">
              {training.keywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {training.requirements && (
          <div className="mb-4">
            <div className="text-sm font-medium mb-1">Wymagania:</div>
            <p className="text-sm text-gray-600">{training.requirements}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {isFull() ? (
              <span className="text-red-600 font-medium">Brak miejsc</span>
            ) : !isRegistrationOpen() ? (
              <span className="text-red-600 font-medium">Zapisy zakończone</span>
            ) : (
              <span className="text-green-600 font-medium">Dostępne miejsca</span>
            )}
          </div>

          <Button
            onClick={handleRegister}
            disabled={!isRegistrationOpen() || isFull() || registering}
            className="bg-therapy-600 hover:bg-therapy-700"
          >
            {registering ? "Zapisywanie..." : "Zapisz się"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingCard;