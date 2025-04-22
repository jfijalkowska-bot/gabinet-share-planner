
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type SuccessArea = Database['public']['Tables']['therapist_success_areas']['Row'];

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  editingArea: SuccessArea | null;
}

const AREAS = [
  { value: 'depression', label: 'Depresja' },
  { value: 'anxiety_disorders', label: 'Zaburzenia lękowe' },
  { value: 'personality_disorders', label: 'Zaburzenia osobowości' },
  { value: 'psychosomatic_disorders', label: 'Zaburzenia psychosomatyczne' },
  { value: 'attachment_disorders', label: 'Zaburzenia więzi' },
  { value: 'relationship_issues', label: 'Problemy w związkach' },
  { value: 'sexual_problems', label: 'Problemy seksualne' },
  { value: 'eating_disorders', label: 'Zaburzenia odżywiania' },
  { value: 'addiction', label: 'Uzależnienia' },
  { value: 'trauma_ptsd', label: 'Trauma i PTSD' },
  { value: 'grief_loss', label: 'Żałoba i strata' },
  { value: 'self_esteem', label: 'Samoocena' },
  { value: 'stress_burnout', label: 'Stres i wypalenie' },
  { value: 'anger_management', label: 'Zarządzanie gniewem' },
  { value: 'sleep_disorders', label: 'Zaburzenia snu' },
  { value: 'ocd', label: 'Zaburzenia obsesyjno-kompulsyjne' },
  { value: 'bipolar_disorder', label: 'Choroba afektywna dwubiegunowa' },
  { value: 'phobias', label: 'Fobie' },
  { value: 'panic_attacks', label: 'Ataki paniki' },
  { value: 'social_anxiety', label: 'Lęk społeczny' },
  { value: 'family_conflicts', label: 'Konflikty rodzinne' },
  { value: 'parenting_issues', label: 'Problemy wychowawcze' },
  { value: 'identity_issues', label: 'Problemy z tożsamością' },
  { value: 'life_transitions', label: 'Zmiany życiowe' },
  { value: 'chronic_pain', label: 'Ból przewlekły' },
  { value: 'emotional_regulation', label: 'Regulacja emocji' },
];

export function TherapistSuccessAreaDialog({ open, onClose, onSave, editingArea }: Props) {
  const [area, setArea] = useState<string>("");
  const [experienceYears, setExperienceYears] = useState<string>("1");
  const [description, setDescription] = useState<string>("");
  const { user } = useAuth();

  useEffect(() => {
    if (editingArea) {
      setArea(editingArea.area);
      setExperienceYears(String(editingArea.experience_years));
      setDescription(editingArea.description || "");
    } else {
      resetForm();
    }
  }, [editingArea]);

  const resetForm = () => {
    setArea("");
    setExperienceYears("1");
    setDescription("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    const data = {
      user_id: user.id,
      area,
      experience_years: parseInt(experienceYears),
      description: description || null,
    };

    const { error } = editingArea
      ? await supabase
          .from('therapist_success_areas')
          .update(data)
          .eq('id', editingArea.id)
      : await supabase
          .from('therapist_success_areas')
          .insert([data]);

    if (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się zapisać obszaru",
        variant: "destructive",
      });
    } else {
      toast({
        description: `Obszar został ${editingArea ? 'zaktualizowany' : 'dodany'}`,
      });
      onSave();
      resetForm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingArea ? 'Edytuj obszar' : 'Dodaj nowy obszar'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="area">Obszar specjalizacji</Label>
            <Select
              value={area}
              onValueChange={setArea}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Wybierz obszar" />
              </SelectTrigger>
              <SelectContent>
                {AREAS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experienceYears">Lata doświadczenia</Label>
            <Input
              id="experienceYears"
              type="number"
              min="1"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Opis (opcjonalnie)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Opisz swoje doświadczenie w tym obszarze..."
              className="h-20"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Anuluj
            </Button>
            <Button type="submit">
              {editingArea ? 'Zapisz zmiany' : 'Dodaj obszar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TherapistSuccessAreaDialog;
