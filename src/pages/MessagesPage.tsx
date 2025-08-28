import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ConversationList from "@/components/messages/ConversationList";
import MessageThread from "@/components/messages/MessageThread";
import NewMessageDialog from "@/components/messages/NewMessageDialog";

const MessagesPage = () => {
  const { user } = useAuth();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-6 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Musisz się zalogować</h2>
            <p className="text-muted-foreground">Aby przeglądać wiadomości, musisz się najpierw zalogować.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <PageHeader 
            title="Wiadomości" 
            description="Prywatne rozmowy z innymi użytkownikami"
          />
          <Button 
            onClick={() => setIsNewMessageOpen(true)}
            className="bg-therapy-600 hover:bg-therapy-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nowa wiadomość
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          <div className="lg:col-span-1 border rounded-lg overflow-hidden">
            <ConversationList 
              selectedConversationId={selectedConversationId}
              onSelectConversation={setSelectedConversationId}
            />
          </div>
          
          <div className="lg:col-span-2 border rounded-lg overflow-hidden">
            {selectedConversationId ? (
              <MessageThread conversationId={selectedConversationId} />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Wybierz rozmowę</h3>
                  <p>Kliknij na rozmowę z lewej strony lub rozpocznij nową</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      
      <NewMessageDialog 
        open={isNewMessageOpen}
        onOpenChange={setIsNewMessageOpen}
        onConversationCreated={setSelectedConversationId}
      />
    </div>
  );
};

export default MessagesPage;