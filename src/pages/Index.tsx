
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/home/FeatureCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, User, Users, Search, MapPin, Check } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: "Dla Właścicieli Gabinetów",
      description: "Kompleksowe zarządzanie gabinetem, kalendarzem i rezerwacjami. Wynajem powierzchni i pełna kontrola nad harmonogramem.",
    },
    {
      icon: Users,
      title: "Dla Współpracujących Terapeutów",
      description: "Wynajmuj gabinet na godziny, zarządzaj swoimi wizytami i buduj bazę klientów. Elastyczność i profesjonalne warunki pracy.",
    },
    {
      icon: Search,
      title: "Dla Klientów",
      description: "Przeglądaj profile specjalistów, sprawdzaj ich kwalifikacje i rezerwuj wizyty online w wygodny sposób.",
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
              Platforma dla <span className="text-therapy-600">gabinetów i terapeutów</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Kompleksowe rozwiązanie dla właścicieli gabinetów i współpracujących terapeutów. 
              Wypróbuj przez 14 dni za darmo i przekonaj się o możliwościach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-therapy-600 hover:bg-therapy-700 text-lg px-8 py-6">
                <Link to="/register">Rozpocznij okres próbny</Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-8 py-6">
                <Link to="/specialists">Znajdź specjalistę</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Rozwiązanie dopasowane do Twoich potrzeb
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

        {/* Pricing section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Wybierz plan dla siebie
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Dopasowany do Twoich potrzeb
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Właściciele gabinetów */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-therapy-200">
                <h3 className="text-2xl font-bold text-therapy-800 mb-4">Dla właścicieli gabinetów</h3>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-therapy-600">50 zł</p>
                  <p className="text-gray-600">miesięcznie</p>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  14 dni okresu próbnego
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-therapy-600 mr-2" />
                    Zarządzanie kalendarzem
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-therapy-600 mr-2" />
                    Wynajem gabinetu
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-therapy-600 mr-2" />
                    Zarządzanie wizytami
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mb-4">
                  Półrocznie: 45 zł/mies. (270 zł)<br />
                  Rocznie: 40 zł/mies. (480 zł)
                </p>
                <Button asChild className="w-full bg-therapy-600">
                  <Link to="/register?plan=owner">Rozpocznij okres próbny</Link>
                </Button>
              </div>

              {/* Współpracujący terapeuci - plan płatny */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-therapy-200">
                <h3 className="text-2xl font-bold text-therapy-800 mb-4">Dla współpracujących terapeutów</h3>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-therapy-600">25 zł</p>
                  <p className="text-gray-600">miesięcznie</p>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  14 dni okresu próbnego
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-therapy-600 mr-2" />
                    Zarządzanie wizytami
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-therapy-600 mr-2" />
                    Rezerwacja gabinetów
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-therapy-600 mr-2" />
                    Rozszerzony profil specjalisty
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-therapy-600 mr-2" />
                    Kalendarz online dla klientów
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mb-4">
                  Półrocznie: 22 zł/mies. (132 zł)<br />
                  Rocznie: 20 zł/mies. (240 zł)
                </p>
                <Button asChild className="w-full bg-therapy-600">
                  <Link to="/register?plan=therapist">Rozpocznij okres próbny</Link>
                </Button>
              </div>
              
              {/* Terapeuci - wizytówka */}
              <div className="bg-white p-8 rounded-lg shadow-md border border-therapy-200">
                <h3 className="text-2xl font-bold text-therapy-800 mb-4">Wizytówka terapeuty</h3>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-green-600">0 zł</p>
                  <p className="text-gray-600">lub 99 zł <span className="text-sm">jednorazowo</span></p>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Bez okresu próbnego
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-600 mr-2" />
                    Podstawowy profil specjalisty
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-600 mr-2" />
                    Widoczność w wyszukiwarce
                  </li>
                  <li className="flex items-center text-gray-700 opacity-50 line-through">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    Rezerwacja gabinetów
                  </li>
                  <li className="flex items-center text-gray-700 opacity-50 line-through">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    Kalendarz wizyt
                  </li>
                  <li className="text-sm text-gray-600 mt-4 font-medium">
                    Wersja premium (99 zł): pozycjonowanie w wynikach wyszukiwania
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full border-green-600 text-green-700 hover:bg-green-50">
                  <Link to="/register?plan=free">Utwórz wizytówkę</Link>
                </Button>
              </div>
            </div>
            
            <div className="text-center mt-8 text-sm text-gray-600">
              <p>Wszystkie ceny zawierają podatek VAT. Płatności obsługiwane przez bezpieczny system płatności online.</p>
            </div>
          </div>
        </section>

        {/* Find Available Office section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Znajdź wolny gabinet w swojej okolicy
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Jesteś terapeutą szukającym profesjonalnego miejsca do pracy? Sprawdź dostępne gabinety w Twojej okolicy i zarezerwuj na dogodne godziny.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 text-therapy-600 mr-2" />
                    Wyszukiwanie po lokalizacji
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 text-therapy-600 mr-2" />
                    Sprawdź dostępne terminy
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 text-therapy-600 mr-2" />
                    Rezerwacja na godziny
                  </li>
                </ul>
                <Button asChild className="bg-therapy-600 hover:bg-therapy-700">
                  <Link to="/rent">Znajdź gabinet</Link>
                </Button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" 
                  alt="Gabinet terapeutyczny" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it works section */}
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
                    Klienci rezerwują wizyty w wyznaczonych terminach
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
              Dołącz do społeczności profesjonalistów
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Wybierz plan dopasowany do Twoich potrzeb - od darmowej wizytówki po pełne zarządzanie gabinetem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" size="lg" className="px-8 py-6 text-therapy-800">
                <Link to="/register">Rozpocznij teraz</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-6 text-white border-white hover:bg-therapy-700">
                <Link to="/search">Znajdź specjalistę</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
