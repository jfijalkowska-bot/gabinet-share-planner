
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import { toast } from "@/components/ui/use-toast";

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
        // For time availability
        earliestAvailable: searchType === "specialist" ? 
          [`${i + 1} dni`, "Jutro", "Dziś", "Za 3 dni", "Za tydzień"][i % 5] : null,
        availableDays: searchType === "specialist" ? 
          ["Pon, Śr, Pt", "Wt, Czw", "Pon, Wt, Pt", "Śr, Czw, Pt", "Pon-Pt"][i % 5] : null,
        availableHours: searchType === "specialist" ? 
          ["8:00-12:00", "12:00-16:00", "16:00-20:00", "10:00-18:00", "8:00-16:00"][i % 5] : null,
      }));
      
      // Handle time availability filter if it exists
      if (searchType === "specialist" && filters.timeSlots?.length > 0) {
        toast({
          title: "Filtrowanie czasowe",
          description: `Zastosowano filtr dostępności czasowej: ${filters.timeSlots.join(", ")}`,
        });
      }
      
      if (searchType === "specialist" && filters.prioritizeEarliestSlot) {
        // Sort by earliest available
        mockResults.sort((a, b) => {
          const aValue = a.earliestAvailable === "Dziś" ? 0 : 
                         a.earliestAvailable === "Jutro" ? 1 : 
                         parseInt(a.earliestAvailable) || 100;
          const bValue = b.earliestAvailable === "Dziś" ? 0 : 
                         b.earliestAvailable === "Jutro" ? 1 :
                         parseInt(b.earliestAvailable) || 100;
          return aValue - bValue;
        });
        
        toast({
          title: "Sortowanie wyników",
          description: "Wyniki posortowane według najwcześniejszych dostępnych terminów",
        });
      }
      
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
