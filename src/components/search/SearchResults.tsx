import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Building, Clock, User, Calendar, MessageCircle } from "lucide-react";
import { type ContactType } from "@/components/common/PortalContactDialog";

interface SearchResultsProps {
  results: any[];
  isLoading: boolean;
  type: "office" | "specialist" | "practicum";
  onContact?: (recipientId: string, recipientName: string, contactType: ContactType, itemName: string) => void;
}

const SearchResults = ({ results, isLoading, type, onContact }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <Card key={`skeleton-${index}`} className="overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <CardHeader className="p-4">
                <div className="h-6 bg-gray-200 animate-pulse w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 animate-pulse w-full"></div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-4 bg-gray-200 animate-pulse w-full mb-2"></div>
                <div className="h-4 bg-gray-200 animate-pulse w-3/4"></div>
              </CardContent>
              <CardFooter className="p-4 flex justify-between">
                <div className="h-8 bg-gray-200 animate-pulse w-1/4"></div>
                <div className="h-8 bg-gray-200 animate-pulse w-1/3"></div>
              </CardFooter>
            </Card>
          ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Building className="h-16 w-16 text-gray-400" />
          <h3 className="text-xl font-semibold">Brak wyników</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Nie znaleziono {type === "office" ? "gabinetów" : type === "specialist" ? "specjalistów" : "praktyk"}{" "}
            spełniających podane kryteria. Spróbuj zmienić parametry wyszukiwania.
          </p>
        </div>
      </Card>
    );
  }

  const handleContactClick = (item: any) => {
    if (!onContact) return;
    
    if (type === "office") {
      // office_profiles_public doesn't expose owner_id for security, but we need it for contact
      // For now, we'll use the item.id as a placeholder - in real implementation you'd fetch owner_id
      onContact(item.owner_id || item.id, item.name, 'office_rental', item.name);
    } else if (type === "specialist") {
      const name = `${item.first_name || ''} ${item.last_name || ''}`.trim();
      onContact(item.user_id || item.id, name, 'therapist', name);
    } else if (type === "practicum") {
      onContact(item.organization_id || item.id, 'Organizator praktyk', 'practicum', item.title || item.name);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((item) => (
        <Card key={item.id} className="overflow-hidden flex flex-col">
          <div className="h-48 bg-gray-200 relative">
            <img
              src={item.image || item.images?.[0] || '/placeholder.svg'}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            {item.distance && (
              <Badge variant="secondary" className="absolute top-2 right-2 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {item.distance} km
              </Badge>
            )}
            {type === "specialist" && item.earliestAvailable === "Dziś" && (
              <Badge variant="destructive" className="absolute top-2 left-2">
                Dostępny dziś!
              </Badge>
            )}
          </div>
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">
                {type === "office" ? item.name : `${item.first_name || ''} ${item.last_name || ''}`}
              </h3>
            </div>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              <MapPin className="h-3 w-3" /> 
              {type === "office" ? `${item.address}, ${item.city}` : item.city || "Lokalizacja do ustalenia"}
            </p>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex-grow">
            {type === "office" && (
              <>
                {item.capacity && (
                  <p className="text-sm flex items-center gap-1 text-gray-600 mb-1">
                    <Users className="h-3 w-3" /> Do {item.capacity} {item.capacity === 1 ? "osoby" : "osób"}
                  </p>
                )}
                {item.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                )}
                {item.equipment && item.equipment.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.equipment.slice(0, 3).map((eq: string, i: number) => (
                      <Badge variant="outline" key={`eq-${item.id}-${i}`} className="text-xs">
                        {eq}
                      </Badge>
                    ))}
                    {item.equipment.length > 3 && (
                      <Badge variant="outline" className="text-xs">+{item.equipment.length - 3}</Badge>
                    )}
                  </div>
                )}
              </>
            )}
            {type === "specialist" && (
              <>
                {item.specialization && (
                  <Badge variant="secondary" className="mt-1 mb-2">{item.specialization}</Badge>
                )}
                {item.bio && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.bio}</p>
                )}
                {item.experience_years !== null && item.experience_years !== undefined && (
                  <p className="text-sm flex items-center gap-1 text-gray-600 mb-1">
                    <Clock className="h-3 w-3" /> Doświadczenie: {item.experience_years} {item.experience_years === 1 ? 'rok' : 'lata'}
                  </p>
                )}

                {item.therapist_languages && item.therapist_languages.length > 0 && (
                  <div className="mt-2 mb-1">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      🌍 Języki:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.therapist_languages.slice(0, 3).map((lang: any, i: number) => (
                        <Badge variant="outline" key={`lang-${item.id}-${i}`} className="text-xs">
                          {lang.language_name}
                        </Badge>
                      ))}
                      {item.therapist_languages.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{item.therapist_languages.length - 3}</Badge>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
            {type === "practicum" && (
              <>
                {item.compensationType && (
                  <Badge variant="secondary" className="mt-1 mb-2">
                    {item.compensationType === 'paid' ? 'Płatny' : 
                     item.compensationType === 'unpaid' ? 'Bezpłatny' : 'Dofinansowany'}
                  </Badge>
                )}
                {item.duration && (
                  <p className="text-sm flex items-center gap-1 text-gray-600 mb-1">
                    <Clock className="h-3 w-3" /> Czas trwania: {item.duration} tygodni
                  </p>
                )}
                {item.hoursPerWeek && (
                  <p className="text-sm flex items-center gap-1 text-gray-600 mb-1">
                    <Users className="h-3 w-3" /> {item.hoursPerWeek}h tygodniowo
                  </p>
                )}
                {item.isOnline && (
                  <Badge variant="outline" className="text-xs">Online</Badge>
                )}
              </>
            )}
          </CardContent>
          <CardFooter className="p-4 flex justify-between items-center border-t">
            {type !== "practicum" && (
              <p className="font-medium">
                {type === "office" ? item.price_per_hour : item.price_per_hour} zł
                {type === "office" ? "/h" : "/sesja"}
              </p>
            )}
            {type === "practicum" && (
              <div className="text-sm text-gray-600">
                {item.compensationType === 'paid' && item.price && `${item.price} zł/mies`}
                {item.compensationType === 'unpaid' && 'Bezpłatny'}
                {item.compensationType === 'compensated' && 'Dofinansowany'}
              </div>
            )}
            <Button 
              size="sm" 
              className="bg-therapy-600 hover:bg-therapy-700"
              onClick={() => handleContactClick(item)}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              {type === "office" ? "Kontakt" : 
               type === "specialist" ? "Napisz" : "Aplikuj"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;
