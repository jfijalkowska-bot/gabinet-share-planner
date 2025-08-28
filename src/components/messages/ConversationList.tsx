import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { MessageCircle } from "lucide-react";

interface Conversation {
  id: string;
  last_message_at: string;
  other_participant?: {
    id: string;
    email: string;
  };
  last_message?: {
    content: string;
    sender_id: string;
  };
  unread_count?: number;
}

interface ConversationListProps {
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

const ConversationList = ({ selectedConversationId, onSelectConversation }: ConversationListProps) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetchConversations();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('conversations')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'conversations' 
      }, () => {
        fetchConversations();
      })
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'messages' 
      }, () => {
        fetchConversations();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchConversations = async () => {
    if (!user) return;

    try {
      // Fetch conversations where user is a participant
      const { data: participantData, error } = await supabase
        .from('conversation_participants')
        .select(`
          conversation_id,
          conversations!inner (
            id,
            last_message_at,
            created_at
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const conversationIds = participantData.map(p => p.conversation_id);
      
      if (conversationIds.length === 0) {
        setConversations([]);
        setLoading(false);
        return;
      }

      // Get other participants and last messages for each conversation
      const conversationsWithDetails = await Promise.all(
        conversationIds.map(async (convId) => {
          // Get other participant
          const { data: otherParticipants } = await supabase
            .from('conversation_participants')
            .select('user_id')
            .eq('conversation_id', convId)
            .neq('user_id', user.id)
            .limit(1);

          let otherParticipant = null;
          if (otherParticipants?.[0]) {
            // Get user details from auth.users (this is a simplified approach)
            // In a real app, you might want to create a profiles table
            otherParticipant = {
              id: otherParticipants[0].user_id,
              email: `user-${otherParticipants[0].user_id.slice(0, 8)}@example.com` // Placeholder
            };
          }

          // Get last message
          const { data: lastMessage } = await supabase
            .from('messages')
            .select('content, sender_id, created_at')
            .eq('conversation_id', convId)
            .order('created_at', { ascending: false })
            .limit(1);

          // Get conversation details
          const { data: conversation } = await supabase
            .from('conversations')
            .select('id, last_message_at, created_at')
            .eq('id', convId)
            .single();

          return {
            id: convId,
            last_message_at: conversation?.last_message_at || conversation?.created_at || '',
            other_participant: otherParticipant,
            last_message: lastMessage?.[0] || null,
          };
        })
      );

      // Sort by last message time
      conversationsWithDetails.sort((a, b) => 
        new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()
      );

      setConversations(conversationsWithDetails);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-3 animate-pulse">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Nie masz jeszcze żadnych rozmów</p>
        <p className="text-sm mt-1">Rozpocznij nową rozmowę klikając "Nowa wiadomość"</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="font-medium mb-3">Rozmowy</h3>
      <div className="space-y-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted ${
              selectedConversationId === conversation.id ? 'bg-muted' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-therapy-100 text-therapy-700">
                  {conversation.other_participant?.email?.charAt(0).toUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm truncate">
                    {conversation.other_participant?.email?.split('@')[0] || 'Nieznany użytkownik'}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(conversation.last_message_at), { 
                      addSuffix: true, 
                      locale: pl 
                    })}
                  </span>
                </div>
                {conversation.last_message && (
                  <p className="text-sm text-muted-foreground truncate mt-1">
                    {conversation.last_message.sender_id === user?.id ? 'Ty: ' : ''}
                    {conversation.last_message.content}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;