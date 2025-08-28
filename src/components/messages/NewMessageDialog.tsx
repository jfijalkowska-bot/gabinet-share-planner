import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface NewMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConversationCreated: (conversationId: string) => void;
}

const NewMessageDialog = ({ open, onOpenChange, onConversationCreated }: NewMessageDialogProps) => {
  const { user } = useAuth();
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreateConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipientEmail.trim() || !message.trim() || !user) return;

    setCreating(true);
    try {
      // First, check if recipient exists by email (simplified - in real app you'd have a profiles table)
      // For now, we'll assume the email format corresponds to a user ID pattern
      // In a production app, you'd want to have a proper user search system
      
      const recipientId = `user-${recipientEmail.split('@')[0]}`;
      
      // Check if conversation already exists between these users
      const { data: existingConversations } = await supabase
        .from('conversation_participants')
        .select(`
          conversation_id,
          conversations!inner(id)
        `)
        .eq('user_id', user.id);

      if (existingConversations) {
        for (const conv of existingConversations) {
          const { data: otherParticipant } = await supabase
            .from('conversation_participants')
            .select('user_id')
            .eq('conversation_id', conv.conversation_id)
            .eq('user_id', recipientId);

          if (otherParticipant && otherParticipant.length > 0) {
            // Conversation already exists
            onConversationCreated(conv.conversation_id);
            onOpenChange(false);
            resetForm();
            return;
          }
        }
      }

      // Create new conversation
      const { data: conversation, error: conversationError } = await supabase
        .from('conversations')
        .insert({})
        .select()
        .single();

      if (conversationError) throw conversationError;

      // Add participants
      const { error: participantsError } = await supabase
        .from('conversation_participants')
        .insert([
          { conversation_id: conversation.id, user_id: user.id },
          { conversation_id: conversation.id, user_id: recipientId }
        ]);

      if (participantsError) throw participantsError;

      // Send first message
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversation.id,
          sender_id: user.id,
          content: message.trim(),
        });

      if (messageError) throw messageError;

      // Update conversation's last_message_at
      await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversation.id);

      toast({
        title: "Sukces",
        description: "Rozmowa została rozpoczęta",
      });

      onConversationCreated(conversation.id);
      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się rozpocząć rozmowy. Sprawdź czy adres email jest poprawny.",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  const resetForm = () => {
    setRecipientEmail("");
    setMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nowa wiadomość</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleCreateConversation} className="space-y-4">
          <div>
            <Label htmlFor="recipient">Adres email odbiorcy</Label>
            <Input
              id="recipient"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="user@example.com"
              type="email"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Wpisz adres email użytkownika, do którego chcesz napisać
            </p>
          </div>
          
          <div>
            <Label htmlFor="message">Wiadomość</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Wpisz swoją wiadomość..."
              required
              rows={4}
              maxLength={1000}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={creating}
            >
              Anuluj
            </Button>
            <Button
              type="submit"
              disabled={!recipientEmail.trim() || !message.trim() || creating}
              className="bg-therapy-600 hover:bg-therapy-700"
            >
              {creating ? "Wysyłanie..." : "Wyślij"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewMessageDialog;