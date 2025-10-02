
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

type CommunityTab = "wszystkie" | "pytania" | "inspiracje" | "szkolenia" | "recenzje" | "sekcje-jezykowe";

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState<CommunityTab>("wszystkie");
  const { user } = useAuth();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);

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
          <TabsList className="mb-6 grid grid-cols-6">
            <TabsTrigger value="wszystkie">Wszystkie</TabsTrigger>
            <TabsTrigger value="pytania">Pytania</TabsTrigger>
            <TabsTrigger value="inspiracje">Inspiracje</TabsTrigger>
            <TabsTrigger value="szkolenia">Szkolenia</TabsTrigger>
            <TabsTrigger value="recenzje">Recenzje</TabsTrigger>
            <TabsTrigger value="sekcje-jezykowe">Sekcje językowe</TabsTrigger>
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
          
          <TabsContent value="sekcje-jezykowe">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={languageFilter === null ? "default" : "outline"}
                  onClick={() => setLanguageFilter(null)}
                  size="sm"
                >
                  🌍 Międzynarodowa
                </Button>
                <Button
                  variant={languageFilter === "pl" ? "default" : "outline"}
                  onClick={() => setLanguageFilter("pl")}
                  size="sm"
                >
                  🇵🇱 Polski
                </Button>
                <Button
                  variant={languageFilter === "en" ? "default" : "outline"}
                  onClick={() => setLanguageFilter("en")}
                  size="sm"
                >
                  🇬🇧 English
                </Button>
                <Button
                  variant={languageFilter === "de" ? "default" : "outline"}
                  onClick={() => setLanguageFilter("de")}
                  size="sm"
                >
                  🇩🇪 Deutsch
                </Button>
                <Button
                  variant={languageFilter === "it" ? "default" : "outline"}
                  onClick={() => setLanguageFilter("it")}
                  size="sm"
                >
                  🇮🇹 Italiano
                </Button>
                <Button
                  variant={languageFilter === "fr" ? "default" : "outline"}
                  onClick={() => setLanguageFilter("fr")}
                  size="sm"
                >
                  🇫🇷 Français
                </Button>
                <Button
                  variant={languageFilter === "es" ? "default" : "outline"}
                  onClick={() => setLanguageFilter("es")}
                  size="sm"
                >
                  🇪🇸 Español
                </Button>
                <Button
                  variant={languageFilter === "ru" ? "default" : "outline"}
                  onClick={() => setLanguageFilter("ru")}
                  size="sm"
                >
                  🇷🇺 Русский
                </Button>
                <Button
                  variant={languageFilter === "el" ? "default" : "outline"}
                  onClick={() => setLanguageFilter("el")}
                  size="sm"
                >
                  🇬🇷 Ελληνικά
                </Button>
                <Button
                  variant={languageFilter === "cs" ? "default" : "outline"}
                  onClick={() => setLanguageFilter("cs")}
                  size="sm"
                >
                  🇨🇿 Čeština
                </Button>
                <Button
                  variant={languageFilter === "pt" ? "default" : "outline"}
                  onClick={() => setLanguageFilter("pt")}
                  size="sm"
                >
                  🇵🇹 Português
                </Button>
                <Button
                  variant={languageFilter === "nl" ? "default" : "outline"}
                  onClick={() => setLanguageFilter("nl")}
                  size="sm"
                >
                  🇳🇱 Nederlands
                </Button>
                <Button
                  variant={languageFilter === "sv" ? "default" : "outline"}
                  onClick={() => setLanguageFilter("sv")}
                  size="sm"
                >
                  🇸🇪 Svenska
                </Button>
                <Button
                  variant={languageFilter === "ja" ? "default" : "outline"}
                  onClick={() => setLanguageFilter("ja")}
                  size="sm"
                >
                  🇯🇵 日本語
                </Button>
                <Button
                  variant={languageFilter === "ko" ? "default" : "outline"}
                  onClick={() => setLanguageFilter("ko")}
                  size="sm"
                >
                  🇰🇷 한국어
                </Button>
                <Button
                  variant={languageFilter === "zh" ? "default" : "outline"}
                  onClick={() => setLanguageFilter("zh")}
                  size="sm"
                >
                  🇨🇳 中文
                </Button>
              </div>
            </div>
            <CommunityPosts 
              category={null} 
              searchQuery={searchQuery}
              languageFilter={languageFilter}
            />
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
