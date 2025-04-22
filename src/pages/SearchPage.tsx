
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";

type SearchType = "office" | "specialist";

const SearchPage = () => {
  const [searchType, setSearchType] = useState<SearchType>("office");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (filters: any) => {
    setIsLoading(true);
    console.log("Search with filters:", filters);
    
    // This would be replaced with actual API call
    setTimeout(() => {
      // Mock results
      const mockResults = Array(6).fill(null).map((_, i) => ({
        id: i,
        name: searchType === "office" 
          ? `Gabinet ${i + 1}` 
          : `Specjalista ${i + 1}`,
        address: "ul. Przykładowa 123, Warszawa",
        distance: Math.floor(Math.random() * 10) + 1,
        equipment: searchType === "office" ? ["Kanapa", "Biurko", "Internet"] : [],
        capacity: searchType === "office" ? Math.floor(Math.random() * 5) + 1 : null,
        specialization: searchType === "specialist" ? ["Psychoterapia", "Terapia par"][i % 2] : null,
        price: (Math.floor(Math.random() * 10) + 15) * 10,
        rating: (Math.random() * 2 + 3).toFixed(1),
        image: `/placeholder.svg`,
        // New fields for specialists
        modality: searchType === "specialist" ? 
          ["Poznawczo-behawioralna (CBT)", "Psychodynamiczna", "Humanistyczna", "Systemowa"][i % 4] : null,
        experience: searchType === "specialist" ? 
          ["0-2 lata", "3-5 lat", "6-10 lat", "Powyżej 10 lat"][i % 4] : null,
        successAreas: searchType === "specialist" ? 
          [["Depresja", "Lęki"], ["Trauma", "Uzależnienia"], ["Problemy w związkach", "Samoocena"]][i % 3] : [],
        services: searchType === "specialist" ? 
          [["Terapia indywidualna", "Sesje online"], ["Terapia par", "Warsztaty"], ["Terapia grupowa", "Interwencja kryzysowa"]][i % 3] : [],
      }));
      
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <PageHeader 
          title="Wyszukiwarka" 
          description="Znajdź gabinet lub specjalistę dopasowanego do Twoich potrzeb"
        />

        <Tabs defaultValue="office" className="w-full" onValueChange={(value) => setSearchType(value as SearchType)}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="office">Wyszukaj gabinet</TabsTrigger>
            <TabsTrigger value="specialist">Wyszukaj specjalistę</TabsTrigger>
          </TabsList>
          
          <TabsContent value="office" className="mt-0">
            <SearchFilters 
              type="office" 
              onSearch={handleSearch}
            />
          </TabsContent>
          
          <TabsContent value="specialist" className="mt-0">
            <SearchFilters 
              type="specialist" 
              onSearch={handleSearch}
            />
          </TabsContent>
        </Tabs>

        <SearchResults 
          results={searchResults}
          isLoading={isLoading}
          type={searchType}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
