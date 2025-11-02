
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

type SearchType = "office" | "specialist";

const SearchPage = () => {
  const [searchType, setSearchType] = useState<SearchType>("office");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (filters: any) => {
    setIsLoading(true);
    console.log("Search with filters:", filters);
    
    try {
      if (searchType === "office") {
        let query = supabase
          .from('office_profiles_public')
          .select('*');

        // Apply filters
        if (filters.city) {
          query = query.ilike('city', `%${filters.city}%`);
        }
        
        if (filters.minPrice || filters.maxPrice) {
          if (filters.minPrice) query = query.gte('price_per_hour', filters.minPrice);
          if (filters.maxPrice) query = query.lte('price_per_hour', filters.maxPrice);
        }

        if (filters.capacity) {
          query = query.gte('capacity', filters.capacity);
        }

        if (filters.style) {
          query = query.eq('style', filters.style);
        }

        if (filters.equipment && filters.equipment.length > 0) {
          query = query.contains('equipment', filters.equipment);
        }

        const { data, error } = await query;
        
        if (error) throw error;

        setSearchResults(data || []);
      } else {
        // Therapist search
        let query = supabase
          .from('therapist_profiles_public')
          .select(`
            *,
            therapist_languages(language_name, language_code)
          `);

        // Apply filters
        if (filters.specialization) {
          query = query.eq('specialization', filters.specialization);
        }

        if (filters.minPrice || filters.maxPrice) {
          if (filters.minPrice) query = query.gte('price_per_hour', filters.minPrice);
          if (filters.maxPrice) query = query.lte('price_per_hour', filters.maxPrice);
        }

        if (filters.experience) {
          const expMap: Record<string, [number, number]> = {
            '0-2': [0, 2],
            '3-5': [3, 5],
            '6-10': [6, 10],
            '10+': [10, 100],
          };
          const [min, max] = expMap[filters.experience] || [0, 100];
          query = query.gte('experience_years', min).lte('experience_years', max);
        }

        const { data, error } = await query;
        
        if (error) throw error;

        // Filter by languages if specified
        let results = data || [];
        if (filters.languages && filters.languages.length > 0) {
          results = results.filter((therapist: any) => {
            const therapistLangs = therapist.therapist_languages?.map((l: any) => l.language_code) || [];
            return filters.languages.some((lang: string) => therapistLangs.includes(lang));
          });
          
          toast({
            title: "Filtrowanie językowe",
            description: `Zastosowano filtr językowy: ${filters.languages.join(", ")}`,
          });
        }

        setSearchResults(results);
      }
    } catch (error: any) {
      console.error('Search error:', error);
      toast({
        title: "Błąd wyszukiwania",
        description: error.message || "Nie udało się wykonać wyszukiwania",
        variant: "destructive",
      });
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
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
