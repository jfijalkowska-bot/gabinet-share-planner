
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import RentalForm from "@/components/rental/RentalForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const RentalPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <PageHeader 
          title="Wynajem gabinetu" 
          description="Zarezerwuj gabinet na wybrane przez Ciebie godziny."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <RentalForm />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-4">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Szukasz idealnego gabinetu?</h3>
                <p className="text-gray-600 mb-4">
                  Skorzystaj z naszej wyszukiwarki, aby znaleźć gabinet dopasowany do Twoich potrzeb - według lokalizacji, wyposażenia, pojemności i innych kryteriów.
                </p>
                <Button asChild className="w-full flex items-center gap-2 bg-therapy-600 hover:bg-therapy-700">
                  <Link to="/search">
                    <Search className="w-4 h-4" />
                    Wyszukaj gabinet
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Informacje o wynajmie</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Lokalizacja gabinetu</h4>
                    <p className="text-gray-600">ul. Przykładowa 123, 00-000 Warszawa</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Wyposażenie gabinetu</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Wygodna kanapa i fotele</li>
                      <li>Biurko i krzesło</li>
                      <li>Dostęp do internetu</li>
                      <li>Klimatyzacja</li>
                      <li>Możliwość korzystania z poczekalni</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Cennik</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>1 godzina: 50 zł</li>
                      <li>4 godziny: 180 zł</li>
                      <li>Cały dzień (8h): 320 zł</li>
                      <li>Wynajem cykliczny: 10% zniżki</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Kontakt do właściciela</h4>
                    <p className="text-gray-600">
                      Tel: +48 123 456 789<br />
                      Email: kontakt@gabinetshare.pl
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RentalPage;
