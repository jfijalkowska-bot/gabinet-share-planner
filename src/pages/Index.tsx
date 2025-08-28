
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Search, Clock } from "lucide-react";
import FeatureCard from "@/components/home/FeatureCard";
import PricingBanner from "@/components/home/PricingBanner";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-therapy-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Platforma dla terapeutów <br className="hidden md:inline" /> i gabinetów
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Wynajmuj gabinet, zarządzaj kalendarzem i znajdź pacjentów w jednym miejscu
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-therapy-600 hover:bg-therapy-700">
                <Link to="/register">Rozpocznij za darmo</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/search">Wyszukaj gabinet/znajdź specjalistę</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Wszystko, czego potrzebujesz</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Search}
                title="Znajdź gabinet do wynajęcia"
                description="Przeszukuj bazę dostępnych gabinetów, filtruj według lokalizacji, wyposażenia i dostępności."
              />
              <FeatureCard 
                icon={Calendar}
                title="Zarządzaj kalendarzem"
                description="Planuj wizyty, udostępniaj wolne terminy i organizuj swój grafik w jednym miejscu."
              />
              <FeatureCard 
                icon={Clock}
                title="Wynajmuj na godziny"
                description="Udostępniaj swój gabinet innym terapeutom, gdy z niego nie korzystasz. Zarabiaj więcej."
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Kompletna platforma dla branży terapeutycznej</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-therapy-700">Wyszukiwarka terapeutów</h3>
                <p className="text-gray-600">Znajdź specjalistę według specjalizacji, lokalizacji, podejścia terapeutycznego i dostępności.</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-therapy-700">Superwizja</h3>
                <p className="text-gray-600">Znajdź superwizora lub oferuj superwizję. System aplikacji i zarządzania procesem superwizyjnym.</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-therapy-700">Społeczność specjalistów</h3>
                <p className="text-gray-600">Dyskutuj, wymieniaj się doświadczeniami i buduj sieć kontaktów z innymi terapeutami.</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-therapy-700">Kalendarz do wbudowania</h3>
                <p className="text-gray-600">Gotowy kod do implementacji na stronie gabinetu. Klienci mogą rezerwować wizyty bezpośrednio.</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-therapy-700">Szkolenia i kursy</h3>
                <p className="text-gray-600">Znajdź szkolenie lub zorganizuj własne. System zapisów i zarządzania uczestnikami.</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-therapy-700">Program partnerski</h3>
                <p className="text-gray-600">Zarabiaj 10% prowizji za każde polecenie nowego użytkownika - niezależnie od Twojej roli.</p>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Pricing Banner */}
        <PricingBanner />
        
        {/* CTA Section */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-therapy-50 to-white">
              <h2 className="text-3xl font-bold mb-4">Dołącz do społeczności GabinetShare</h2>
              <p className="text-xl mb-6 text-gray-600">
                Stwórz konto i korzystaj z platformy już teraz
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-therapy-600 hover:bg-therapy-700">
                  <Link to="/register">Rozpocznij za darmo</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/how-it-works">Dowiedz się więcej</Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
