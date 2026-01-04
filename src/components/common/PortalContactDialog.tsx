import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { MessageCircle } from "lucide-react";

export type ContactType = 
  | "office_rental" 
  | "therapist" 
  | "supervision" 
  | "training" 
  | "practicum";

interface PortalContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientId: string;
  recipientName: string;
  contactType: ContactType;
  itemName: string;
  customPlaceholder?: string;
}

const contactTypeLabels: Record<ContactType, { title: string; prefix: string }> = {
  office_rental: { title: "Wynajem gabinetu", prefix: "Zapytanie o gabinet" },
  therapist: { title: "Terapeuta", prefix: "Wiadomość do terapeuty" },
  supervision: { title: "Superwizja", prefix: "Zapytanie o superwizję" },
  training: { title: "Szkolenie", prefix: "Zapytanie o szkolenie" },
  practicum: { title: "Praktyki", prefix: "Zapytanie o praktyki" },
};

const PortalContactDialog = ({
  open,
  onOpenChange,
  recipientId,
  recipientName,
  contactType,
  itemName,
  customPlaceholder,
}: PortalContactDialogProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const { title, prefix } = contactTypeLabels[contactType];

  const defaultPlaceholders: Record<ContactType, string> = {
    office_rental: `Cześć! Chciałbym zapytać o możliwość wynajmu gabinetu ${itemName}...`,
    therapist: `Dzień dobry! Chciałbym umówić się na wizytę...`,
    supervision: `Dzień dobry! Jestem zainteresowany/a superwizją "${itemName}"...`,
    training: `Dzień dobry! Chciałbym zapytać o szkolenie "${itemName}"...`,
    practicum: `Dzień dobry! Jestem zainteresowany/a praktykami "${itemName}"...`,
  };

  const handleSendMessage = async () => {
    if (!user) {
      toast({
        title: "Zaloguj się",
        description: "Musisz być zalogowany, aby wysłać wiadomość.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Wpisz wiadomość",
        description: "Pole wiadomości nie może być puste.",
        variant: "destructive",
      });
      return;
    }

    if (user.id === recipientId) {
      toast({
        title: "Błąd",
        description: "Nie możesz wysłać wiadomości do siebie.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      // Check if conversation already exists between these users
      const { data: existingParticipation } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', user.id);

      let conversationId: string | null = null;

      if (existingParticipation && existingParticipation.length > 0) {
        // Check if any of these conversations include the recipient
        for (const p of existingParticipation) {
          const { data: otherParticipant } = await supabase
            .from('conversation_participants')
            .select('user_id')
            .eq('conversation_id', p.conversation_id)
            .eq('user_id', recipientId)
            .single();
          
          if (otherParticipant) {
            conversationId = p.conversation_id;
            break;
          }
        }
      }

      // Create new conversation if doesn't exist
      if (!conversationId) {
        const { data: newConversation, error: convError } = await supabase
          .from('conversations')
          .insert({})
          .select('id')
          .single();

        if (convError) throw convError;
        conversationId = newConversation.id;

        // Add both participants
        const { error: partError } = await supabase
          .from('conversation_participants')
          .insert([
            { conversation_id: conversationId, user_id: user.id },
            { conversation_id: conversationId, user_id: recipientId },
          ]);

        if (partError) throw partError;
      }

      // Send the message
      const { error: msgError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: `[${prefix}: ${itemName}]\n\n${message}`,
        });

      if (msgError) throw msgError;

      // Update conversation last_message_at
      await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId);

      toast({
        title: "Wiadomość wysłana!",
        description: `${recipientName} otrzyma Twoje zapytanie.`,
      });

      onOpenChange(false);
      setMessage("");
      
      // Navigate to messages
      navigate("/messages");
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się wysłać wiadomości. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Skontaktuj się przez portal</DialogTitle>
          <DialogDescription>
            Wyślij wiadomość do: {recipientName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-primary/5">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">{title}</span>
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                {itemName}
              </span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Twoja wiadomość</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={customPlaceholder || defaultPlaceholders[contactType]}
                rows={4}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Anuluj
          </Button>
          <Button onClick={handleSendMessage} disabled={sending || !message.trim()}>
            {sending ? "Wysyłanie..." : "Wyślij wiadomość"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PortalContactDialog;
