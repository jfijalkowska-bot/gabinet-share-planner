import { useState, useRef, useEffect } from "react";
import { Search, User, Building, GraduationCap, Users, BriefcaseIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface SearchResult {
  id: string;
  type: 'therapist' | 'office' | 'training' | 'supervision' | 'practicum';
  title: string;
  subtitle: string;
  location?: string;
}

const GlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const performSearch = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchResults: SearchResult[] = [];

      // Search therapists
      const { data: therapists } = await supabase
        .from('therapist_profiles')
        .select('id, first_name, last_name, specialization, city')
        .or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%,specialization.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%`)
        .limit(5);

      therapists?.forEach(therapist => {
        searchResults.push({
          id: therapist.id,
          type: 'therapist',
          title: `${therapist.first_name} ${therapist.last_name}`,
          subtitle: therapist.specialization || 'Terapeuta',
          location: therapist.city
        });
      });

      // Search offices
      const { data: offices } = await supabase
        .from('office_profiles')
        .select('id, name, description, city, address')
        .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,address.ilike.%${searchQuery}%`)
        .eq('is_active', true)
        .limit(5);

      offices?.forEach(office => {
        searchResults.push({
          id: office.id,
          type: 'office',
          title: office.name,
          subtitle: 'Gabinet psychologiczny',
          location: office.city
        });
      });

      // Search trainings
      const { data: trainings } = await supabase
        .from('trainings')
        .select('id, title, topic, instructor_name, location')
        .or(`title.ilike.%${searchQuery}%,topic.ilike.%${searchQuery}%,instructor_name.ilike.%${searchQuery}%`)
        .eq('is_active', true)
        .limit(5);

      trainings?.forEach(training => {
        searchResults.push({
          id: training.id,
          type: 'training',
          title: training.title,
          subtitle: training.instructor_name ? `Prowadzący: ${training.instructor_name}` : 'Szkolenie',
          location: training.location
        });
      });

      // Search supervisions
      const { data: supervisions } = await supabase
        .from('supervisions')
        .select('id, title, therapy_approach, location')
        .or(`title.ilike.%${searchQuery}%,therapy_approach.ilike.%${searchQuery}%`)
        .eq('is_active', true)
        .limit(5);

      supervisions?.forEach(supervision => {
        searchResults.push({
          id: supervision.id,
          type: 'supervision',
          title: supervision.title,
          subtitle: supervision.therapy_approach || 'Superwizja',
          location: supervision.location
        });
      });

      // Search practicums
      const { data: practicums } = await supabase
        .from('practicums')
        .select('id, title, location')
        .or(`title.ilike.%${searchQuery}%`)
        .eq('is_active', true)
        .limit(5);

      practicums?.forEach(practicum => {
        searchResults.push({
          id: practicum.id,
          type: 'practicum',
          title: practicum.title,
          subtitle: 'Praktyki psychologiczne',
          location: practicum.location
        });
      });

      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false);
    setQuery("");
    
    switch (result.type) {
      case 'therapist':
        navigate(`/therapist/${result.id}`);
        break;
      case 'office':
        navigate(`/office/${result.id}`);
        break;
      case 'training':
        navigate(`/trainings`);
        toast({
          title: "Przekierowanie",
          description: `Szukaj szkolenia: ${result.title}`,
        });
        break;
      case 'supervision':
        navigate(`/supervisions`);
        toast({
          title: "Przekierowanie", 
          description: `Szukaj superwizji: ${result.title}`,
        });
        break;
      case 'practicum':
        navigate(`/search?type=practicum&query=${encodeURIComponent(result.title)}`);
        break;
    }
  };

  const handleAdvancedSearch = () => {
    setIsOpen(false);
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'therapist':
        return <User className="h-4 w-4" />;
      case 'office':
        return <Building className="h-4 w-4" />;
      case 'training':
        return <GraduationCap className="h-4 w-4" />;
      case 'supervision':
        return <Users className="h-4 w-4" />;
      case 'practicum':
        return <BriefcaseIcon className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Szukaj terapeutów, gabinetów, szkoleń..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="pl-10 w-64 md:w-80"
          />
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-64 md:w-80" align="start">
        {loading ? (
          <DropdownMenuItem disabled>
            Wyszukiwanie...
          </DropdownMenuItem>
        ) : results.length > 0 ? (
          <>
            {results.map((result, index) => (
              <DropdownMenuItem
                key={`${result.type}-${result.id}-${index}`}
                onClick={() => handleResultClick(result)}
                className="flex items-center gap-3 cursor-pointer"
              >
                {getIcon(result.type)}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{result.title}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {result.subtitle}
                    {result.location && ` • ${result.location}`}
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            
            {query.length >= 2 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleAdvancedSearch}
                  className="text-primary cursor-pointer"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Zobacz wszystkie wyniki dla "{query}"
                </DropdownMenuItem>
              </>
            )}
          </>
        ) : query.length >= 2 ? (
          <>
            <DropdownMenuItem disabled>
              Brak wyników dla "{query}"
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleAdvancedSearch}
              className="text-primary cursor-pointer"
            >
              <Search className="h-4 w-4 mr-2" />
              Wyszukaj zaawansowane
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem disabled>
            Wpisz co najmniej 2 znaki, aby wyszukać
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GlobalSearch;