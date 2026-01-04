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
import { MessageCircle, Mail, Phone } from "lucide-react";

interface RentalContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  officeOwnerId: string;
  officeName: string;
  ownerEmail?: string;
  ownerPhone?: string;
}

const RentalContactDialog = ({
  open,
  onOpenChange,
  officeOwnerId,
  officeName,
  ownerEmail,
  ownerPhone,
}: RentalContactDialogProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

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

    setSending(true);
    try {
      // Check if conversation already exists between these users
      const { data: existingParticipation } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', user.id);

      let conversationId: string | null = null;

      if (existingParticipation && existingParticipation.length > 0) {
        // Check if any of these conversations include the office owner
        for (const p of existingParticipation) {
          const { data: otherParticipant } = await supabase
            .from('conversation_participants')
            .select('user_id')
            .eq('conversation_id', p.conversation_id)
            .eq('user_id', officeOwnerId)
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
            { conversation_id: conversationId, user_id: officeOwnerId },
          ]);

        if (partError) throw partError;
      }

      // Send the message
      const { error: msgError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: user.id,
          content: `[Zapytanie o gabinet: ${officeName}]\n\n${message}`,
        });

      if (msgError) throw msgError;

      // Update conversation last_message_at
      await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId);

      toast({
        title: "Wiadomość wysłana!",
        description: "Właściciel gabinetu otrzyma Twoje zapytanie.",
      });

      onOpenChange(false);
      setMessage("");
      
      // Optionally navigate to messages
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
          <DialogTitle>Skontaktuj się z właścicielem</DialogTitle>
          <DialogDescription>
            Wyślij wiadomość przez portal lub skorzystaj z danych kontaktowych.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Portal messaging - preferred */}
          <div className="p-4 border rounded-lg bg-primary/5">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="font-medium">Wyślij wiadomość przez portal</span>
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Zalecane</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Twoja wiadomość</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Cześć! Chciałbym zapytać o możliwość wynajmu gabinetu ${officeName}...`}
                rows={4}
              />
            </div>
          </div>

          {/* Alternative contact methods */}
          {(ownerEmail || ownerPhone) && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Lub skontaktuj się bezpośrednio:</p>
              <div className="flex flex-wrap gap-2">
                {ownerEmail && (
                  <a
                    href={`mailto:${ownerEmail}?subject=Zapytanie o gabinet ${officeName}`}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-muted"
                  >
                    <Mail className="h-4 w-4" />
                    {ownerEmail}
                  </a>
                )}
                {ownerPhone && (
                  <a
                    href={`tel:${ownerPhone}`}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-muted"
                  >
                    <Phone className="h-4 w-4" />
                    {ownerPhone}
                  </a>
                )}
              </div>
            </div>
          )}
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

export default RentalContactDialog;
