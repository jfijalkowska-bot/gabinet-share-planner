import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from 'sonner';
import { type Supervision } from '@/hooks/useSupervisions';

interface SupervisionApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supervision: Supervision;
}

export const SupervisionApplicationDialog = ({ 
  open, 
  onOpenChange, 
  supervision 
}: SupervisionApplicationDialogProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    message: '',
    contact_email: user?.email || '',
    contact_phone: '',
    experience_description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Musisz być zalogowany, aby aplikować');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('supervision_applications')
        .insert({
          supervision_id: supervision.id,
          applicant_id: user.id,
          message: formData.message,
          contact_email: formData.contact_email,
          contact_phone: formData.contact_phone,
          experience_description: formData.experience_description
        });

      if (error) {
        if (error.code === '23505') {
          toast.error('Już aplikowałeś/aś do tej superwizji');
        } else {
          throw error;
        }
      } else {
        toast.success('Aplikacja została wysłana pomyślnie!');
        onOpenChange(false);
        // Reset form
        setFormData({
          message: '',
          contact_email: user.email || '',
          contact_phone: '',
          experience_description: ''
        });
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Błąd podczas wysyłania aplikacji');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Aplikuj do superwizji</DialogTitle>
          <DialogDescription>
            {supervision.title} - {supervision.supervisor_profile?.first_name} {supervision.supervisor_profile?.last_name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact_email">Email kontaktowy *</Label>
            <Input
              id="contact_email"
              type="email"
              required
              value={formData.contact_email}
              onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_phone">Telefon kontaktowy</Label>
            <Input
              id="contact_phone"
              type="tel"
              value={formData.contact_phone}
              onChange={(e) => setFormData(prev => ({ ...prev, contact_phone: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience_description">Opis swojego doświadczenia *</Label>
            <Textarea
              id="experience_description"
              required
              placeholder="Opisz swoje doświadczenie zawodowe, wykształcenie, dotychczasowe praktyki..."
              value={formData.experience_description}
              onChange={(e) => setFormData(prev => ({ ...prev, experience_description: e.target.value }))}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Dodatkowa wiadomość</Label>
            <Textarea
              id="message"
              placeholder="Dodatkowe informacje, pytania lub komentarze..."
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              rows={3}
            />
          </div>

          {supervision.required_experience && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Wymagane doświadczenie:</h4>
              <p className="text-sm text-muted-foreground">{supervision.required_experience}</p>
            </div>
          )}

          {supervision.required_preparation && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Wymagane przygotowanie:</h4>
              <p className="text-sm text-muted-foreground">{supervision.required_preparation}</p>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Anuluj
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Wysyłanie...' : 'Wyślij aplikację'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};