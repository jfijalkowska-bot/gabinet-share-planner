
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/home/FeatureCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, User } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: "Zarządzanie Kalendarzem",
      description: "Łatwe zarządzanie dostępnością gabinetu i rezerwacjami w jednym miejscu.",
    },
    {
      icon: Clock,
      title: "Wynajem dla Terapeutów",
      description: "Udostępniaj swój gabinet innym terapeutom i zarabiaj, gdy nie pracujesz.",
    },
    {
      icon: User,
      title: "Wizyty Klientów",
      description: "Wygodny system rezerwacji wizyt dla klientów w twoim gabinecie.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-therapy-100 to-white py-16 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Zarządzaj swoim gabinetem <span className="text-therapy-600">inteligentnie</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Aplikacja do efektywnego zarządzania gabinetem psychologicznym, psychoterapeutycznym i logopedycznym. Wynajmuj gabinet i zarządzaj wizytami w jednym miejscu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-therapy-600 hover:bg-therapy-700 text-lg px-8 py-6">
                <Link to="/calendar">Sprawdź kalendarz</Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-8 py-6">
                <Link to="/rent">Wynajmij gabinet</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Jak GabinetShare ułatwi Ci pracę?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Jak to działa?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-therapy-600 text-white flex items-center justify-center mr-2">1</span>
                    Wyznacz dostępność gabinetu
                  </h3>
                  <p className="text-gray-600 ml-10">
                    Określ, kiedy gabinet jest dostępny do wynajęcia, a kiedy Ty prowadzisz wizyty.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-therapy-600 text-white flex items-center justify-center mr-2">2</span>
                    Inni terapeuci rezerwują wolny gabinet
                  </h3>
                  <p className="text-gray-600 ml-10">
                    Współpracujący terapeuci mogą łatwo zarezerwować gabinet w godzinach, gdy nie prowadzisz wizyt.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-therapy-600 text-white flex items-center justify-center mr-2">3</span>
                    Klienci rezerwują wizyty w wolnych terminach
                  </h3>
                  <p className="text-gray-600 ml-10">
                    Twoi klienci mogą samodzielnie zarezerwować wizytę w wyznaczonych przez Ciebie godzinach.
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1576765607924-3f7b8410a787?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" 
                  alt="Gabinet terapeutyczny" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-therapy-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Gotowy, by zacząć efektywnie zarządzać swoim gabinetem?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Dołącz do setek specjalistów, którzy już korzystają z GabinetShare do zarządzania swoimi gabinetami.
            </p>
            <Button asChild variant="secondary" size="lg" className="px-8 py-6 text-therapy-800">
              <Link to="/register">Rozpocznij teraz</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
