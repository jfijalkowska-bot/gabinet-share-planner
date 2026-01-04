import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import RentalForm from "@/components/rental/RentalForm";
import RentalContactDialog from "@/components/rental/RentalContactDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, MessageCircle, Building } from "lucide-react";

const RentalPage = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  // Placeholder data - w przyszłości będzie dynamiczne z wybranego gabinetu
  const officeData = {
    ownerId: "placeholder-owner-id",
    name: "Gabinet przy ul. Przykładowej",
    ownerEmail: "kontakt@gabinetshare.pl",
    ownerPhone: "+48 123 456 789",
  };

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
                <p className="text-muted-foreground mb-4">
                  Skorzystaj z naszej wyszukiwarki, aby znaleźć gabinet dopasowany do Twoich potrzeb - według lokalizacji, wyposażenia, pojemności i innych kryteriów.
                </p>
                <Button asChild className="w-full flex items-center gap-2">
                  <Link to="/search">
                    <Search className="w-4 h-4" />
                    Wyszukaj gabinet
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="mb-4">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Chcesz wystawić swój gabinet?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Dodaj swój gabinet do oferty najmu - ustal ceny, wyposażenie i dostępność.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/management?tab=office">
                    Wystaw gabinet do wynajmu
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Informacje o gabinecie</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Lokalizacja gabinetu</h4>
                    <p className="text-muted-foreground">ul. Przykładowa 123, 00-000 Warszawa</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Wyposażenie gabinetu</h4>
                    <ul className="list-disc list-inside text-muted-foreground">
                      <li>Wygodna kanapa i fotele</li>
                      <li>Biurko i krzesło</li>
                      <li>Dostęp do internetu</li>
                      <li>Klimatyzacja</li>
                      <li>Możliwość korzystania z poczekalni</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Cennik</h4>
                    <ul className="list-disc list-inside text-muted-foreground">
                      <li>1 godzina: 50 zł</li>
                      <li>4 godziny: 180 zł</li>
                      <li>Cały dzień (8h): 320 zł</li>
                      <li>Wynajem cykliczny: 10% zniżki</li>
                    </ul>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="font-medium mb-2">Kontakt z właścicielem</h4>
                    <Button 
                      onClick={() => setContactDialogOpen(true)} 
                      className="w-full flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Wyślij wiadomość przez portal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />

      <RentalContactDialog
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        officeOwnerId={officeData.ownerId}
        officeName={officeData.name}
        ownerEmail={officeData.ownerEmail}
        ownerPhone={officeData.ownerPhone}
      />
    </div>
  );
};

export default RentalPage;
