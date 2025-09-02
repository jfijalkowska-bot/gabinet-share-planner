
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import { toast } from "@/components/ui/use-toast";

type SearchType = "office" | "specialist" | "practicum";

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
          : searchType === "specialist"
          ? `Specjalista ${i + 1}`
          : `Praktyki w ${["Szpitalu Uniwersyteckim", "Poradni Zdrowia Psychicznego", "Ośrodku Terapii", "Centrum Diagnostycznym", "Klinice Prywatnej", "Fundacji"][i]}`,
        address: "ul. Przykładowa 123, Warszawa",
        distance: Math.floor(Math.random() * 10) + 1,
        equipment: searchType === "office" ? ["Kanapa", "Biurko", "Internet"] : [],
        capacity: searchType === "office" ? Math.floor(Math.random() * 5) + 1 : null,
        specialization: searchType === "specialist" ? ["Psychoterapia", "Terapia par"][i % 2] : null,
        price: searchType === "practicum" ? null : (Math.floor(Math.random() * 10) + 15) * 10,
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
        // Languages for specialists
        languages: searchType === "specialist" ? 
          [["Polski", "Angielski"], ["Polski", "Niemiecki"], ["Polski", "Francuski", "Angielski"], ["Polski"], ["Polski", "Hiszpański"]][i % 5] : [],
        // Reviews count
        reviewsCount: searchType === "specialist" ? Math.floor(Math.random() * 20) : undefined,
        // For time availability
        earliestAvailable: searchType === "specialist" ? 
          [`${i + 1} dni`, "Jutro", "Dziś", "Za 3 dni", "Za tydzień"][i % 5] : null,
        availableDays: searchType === "specialist" ? 
          ["Pon, Śr, Pt", "Wt, Czw", "Pon, Wt, Ft", "Śr, Czw, Pt", "Pon-Pt"][i % 5] : null,
        availableHours: searchType === "specialist" ? 
          ["8:00-12:00", "12:00-16:00", "16:00-20:00", "10:00-18:00", "8:00-16:00"][i % 5] : null,
        // Practicum specific fields
        compensationType: searchType === "practicum" ? 
          ["paid", "unpaid", "compensated"][i % 3] : null,
        duration: searchType === "practicum" ? 
          [8, 12, 16, 20, 26][i % 5] : null,
        hoursPerWeek: searchType === "practicum" ? 
          [15, 20, 25, 30, 40][i % 5] : null,
        isOnline: searchType === "practicum" ? Math.random() > 0.7 : null,
      }));
      
      // Handle language filter
      if (searchType === "specialist" && filters.languages?.length > 0) {
        toast({
          title: "Filtrowanie językowe",
          description: `Zastosowano filtr językowy: ${filters.languages.join(", ")}`,
        });
      }
      
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
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="office">Wyszukaj gabinet</TabsTrigger>
            <TabsTrigger value="specialist">Wyszukaj specjalistę</TabsTrigger>
            <TabsTrigger value="practicum">Praktyki/Staże</TabsTrigger>
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
          
          <TabsContent value="practicum" className="mt-0">
            <SearchFilters 
              type="practicum" 
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
