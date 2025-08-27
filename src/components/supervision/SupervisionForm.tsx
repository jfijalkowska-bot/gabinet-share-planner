import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from 'sonner';
import { UserCheck, Plus } from 'lucide-react';
import { useManagedSupervisions } from '@/hooks/useSupervisions';

export const SupervisionForm = () => {
  const { user } = useAuth();
  const { refetch } = useManagedSupervisions();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    supervision_type: 'individual' as 'individual' | 'group',
    format: 'online' as 'online' | 'stationary',
    location: '',
    max_participants: 6,
    price_per_session: 150,
    therapy_approach: '',
    required_experience: '',
    required_preparation: '',
    is_active: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Musisz być zalogowany');
      return;
    }

    setLoading(true);

    try {
      const supervisionData = {
        supervisor_id: user.id,
        title: formData.title,
        description: formData.description || null,
        supervision_type: formData.supervision_type,
        format: formData.format,
        location: formData.format === 'stationary' ? formData.location : null,
        max_participants: formData.supervision_type === 'group' ? formData.max_participants : null,
        price_per_session: formData.price_per_session,
        therapy_approach: formData.therapy_approach || null,
        required_experience: formData.required_experience || null,
        required_preparation: formData.required_preparation || null,
        is_active: formData.is_active
      };

      const { error } = await supabase
        .from('supervisions')
        .insert(supervisionData);

      if (error) throw error;

      toast.success('Superwizja została dodana pomyślnie!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        supervision_type: 'individual',
        format: 'online',
        location: '',
        max_participants: 6,
        price_per_session: 150,
        therapy_approach: '',
        required_experience: '',
        required_preparation: '',
        is_active: true
      });

      refetch();
    } catch (error) {
      console.error('Error creating supervision:', error);
      toast.error('Błąd podczas dodawania superwizji');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Dodaj nową superwizję
        </CardTitle>
        <CardDescription>
          Stwórz ogłoszenie o superwizji, aby pomóc innym terapeutom w rozwoju zawodowym
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="title">Tytuł superwizji *</Label>
              <Input
                id="title"
                required
                placeholder="np. Superwizja dla terapeutów CBT"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supervision_type">Typ superwizji *</Label>
              <Select 
                value={formData.supervision_type} 
                onValueChange={(value: 'individual' | 'group') => 
                  setFormData(prev => ({ ...prev, supervision_type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Indywidualna</SelectItem>
                  <SelectItem value="group">Grupowa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Format *</Label>
              <Select 
                value={formData.format} 
                onValueChange={(value: 'online' | 'stationary') => 
                  setFormData(prev => ({ ...prev, format: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="stationary">Stacjonarnie</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.format === 'stationary' && (
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="location">Lokalizacja *</Label>
                <Input
                  id="location"
                  required={formData.format === 'stationary'}
                  placeholder="Adres lub miasto"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            )}

            {formData.supervision_type === 'group' && (
              <div className="space-y-2">
                <Label htmlFor="max_participants">Maksymalna liczba uczestników</Label>
                <Input
                  id="max_participants"
                  type="number"
                  min="2"
                  max="20"
                  value={formData.max_participants}
                  onChange={(e) => setFormData(prev => ({ ...prev, max_participants: parseInt(e.target.value) }))}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="price_per_session">Cena za sesję (PLN) *</Label>
              <Input
                id="price_per_session"
                type="number"
                min="0"
                step="0.01"
                required
                value={formData.price_per_session}
                onChange={(e) => setFormData(prev => ({ ...prev, price_per_session: parseFloat(e.target.value) }))}
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="therapy_approach">Nurt terapeutyczny</Label>
              <Input
                id="therapy_approach"
                placeholder="np. CBT, Psychodynamiczny, Systemowy"
                value={formData.therapy_approach}
                onChange={(e) => setFormData(prev => ({ ...prev, therapy_approach: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Opis superwizji</Label>
            <Textarea
              id="description"
              placeholder="Opisz czego dotyczy superwizja, jak będzie przebiegać, jakie korzyści przyniesie..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="required_experience">Wymagane doświadczenie</Label>
            <Textarea
              id="required_experience"
              placeholder="Jakie doświadczenie powinni mieć uczestnicy?"
              value={formData.required_experience}
              onChange={(e) => setFormData(prev => ({ ...prev, required_experience: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="required_preparation">Wymagane przygotowanie</Label>
            <Textarea
              id="required_preparation"
              placeholder="Jakie przygotowanie jest wymagane? Materiały do przeczytania, przypadki do przygotowania?"
              value={formData.required_preparation}
              onChange={(e) => setFormData(prev => ({ ...prev, required_preparation: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
            <Label htmlFor="is_active">Aktywne ogłoszenie</Label>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Dodawanie...' : 'Dodaj superwizję'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};