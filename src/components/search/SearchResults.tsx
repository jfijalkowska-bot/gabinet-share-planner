
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Users, Building } from "lucide-react";

interface SearchResultsProps {
  results: any[];
  isLoading: boolean;
  type: "office" | "specialist";
}

const SearchResults = ({ results, isLoading, type }: SearchResultsProps) => {
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
            Nie znaleziono {type === "office" ? "gabinetów" : "specjalistów"}{" "}
            spełniających podane kryteria. Spróbuj zmienić parametry wyszukiwania.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((item) => (
        <Card key={item.id} className="overflow-hidden flex flex-col">
          <div className="h-48 bg-gray-200 relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            {item.distance && (
              <Badge variant="secondary" className="absolute top-2 right-2 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {item.distance} km
              </Badge>
            )}
          </div>
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded text-sm">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{item.rating}</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {item.address}
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
            {type === "specialist" && item.specialization && (
              <Badge variant="secondary" className="mt-1">{item.specialization}</Badge>
            )}
          </CardContent>
          <CardFooter className="p-4 flex justify-between items-center border-t">
            <p className="font-medium">
              {item.price} zł
              {type === "office" ? "/h" : ""}
            </p>
            <Button size="sm" className="bg-therapy-600 hover:bg-therapy-700">
              {type === "office" ? "Sprawdź dostępność" : "Umów wizytę"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;
