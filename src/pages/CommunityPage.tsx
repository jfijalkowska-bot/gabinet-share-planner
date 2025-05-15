
import { useState, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import CommunityPosts from "@/components/community/CommunityPosts";
import CreatePostDialog from "@/components/community/CreatePostDialog";
import SearchBar from "@/components/community/SearchBar";
import { toast } from "@/components/ui/use-toast";

type CommunityTab = "wszystkie" | "pytania" | "inspiracje" | "szkolenia" | "recenzje";

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState<CommunityTab>("wszystkie");
  const { user } = useAuth();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreatePost = () => {
    if (user) {
      setIsCreatePostOpen(true);
    } else {
      toast({
        title: "Wymagane logowanie",
        description: "Aby dodać post, musisz się najpierw zalogować.",
        variant: "destructive",
      });
    }
  };

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <PageHeader 
            title="Społeczność" 
            description="Dołącz do dyskusji, dziel się wiedzą i inspiracjami"
          />
          <Button 
            onClick={handleCreatePost} 
            className="bg-therapy-600 hover:bg-therapy-700"
          >
            Dodaj post
          </Button>
        </div>

        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        <Tabs 
          defaultValue="wszystkie" 
          className="w-full mb-8"
          onValueChange={(value) => setActiveTab(value as CommunityTab)}
        >
          <TabsList className="mb-6 grid grid-cols-5">
            <TabsTrigger value="wszystkie">Wszystkie</TabsTrigger>
            <TabsTrigger value="pytania">Pytania</TabsTrigger>
            <TabsTrigger value="inspiracje">Inspiracje</TabsTrigger>
            <TabsTrigger value="szkolenia">Szkolenia</TabsTrigger>
            <TabsTrigger value="recenzje">Recenzje</TabsTrigger>
          </TabsList>
          
          <TabsContent value="wszystkie">
            <CommunityPosts category={null} searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="pytania">
            <CommunityPosts category="pytania" searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="inspiracje">
            <CommunityPosts category="inspiracje" searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="szkolenia">
            <CommunityPosts category="szkolenia" searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="recenzje">
            <CommunityPosts category="recenzje" searchQuery={searchQuery} />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
      
      <CreatePostDialog 
        open={isCreatePostOpen} 
        onOpenChange={setIsCreatePostOpen} 
      />
    </div>
  );
};

export default CommunityPage;
