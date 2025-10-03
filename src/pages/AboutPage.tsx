import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Users, Target, Award, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              O GabinetShare
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Platforma łącząca terapeutów z klientami i właścicieli gabinetów z wynajmującymi. 
              Ułatwiamy dostęp do terapii i optymalizujemy wykorzystanie przestrzeni gabinetowych.
            </p>
          </div>

          {/* Misja i wizja */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="border-therapy-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-therapy-700">
                  <Target className="h-6 w-6" />
                  Nasza misja
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Demokratyzacja dostępu do usług terapeutycznych poprzez utworzenie
                  transparentnej i łatwo dostępnej platformy, która łączy terapeutów 
                  z klientami oraz optymalizuje wykorzystanie przestrzeni gabinetowych.
                </p>
              </CardContent>
            </Card>

            <Card className="border-therapy-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-therapy-700">
                  <Heart className="h-6 w-6" />
                  Nasza wizja
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Świat, w którym każdy ma łatwy dostęp do profesjonalnej pomocy terapeutycznej,
                  a terapeuci mogą skutecznie rozwijać swoją praktykę dzięki nowoczesnym 
                  narzędziom i wspólnocie profesjonalistów.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Wartości */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Nasze wartości
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border-therapy-200">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center gap-3 text-therapy-700">
                    <Users className="h-12 w-12" />
                    Społeczność
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Budujemy silną społeczność terapeutów i klientów, 
                    opartą na wzajemnym szacunku i wsparciu.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-therapy-200">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center gap-3 text-therapy-700">
                    <Award className="h-12 w-12" />
                    Jakość
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Zapewniamy najwyższą jakość usług poprzez weryfikację
                    terapeutów i ciągłe doskonalenie platformy.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-therapy-200">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center gap-3 text-therapy-700">
                    <Heart className="h-12 w-12" />
                    Empatia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Rozumiemy potrzeby zarówno terapeutów, jak i klientów,
                    tworząc rozwiązania z myślą o człowieku.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Informacje o firmie */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-therapy-700">
                Informacje o firmie
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 text-therapy-600">Dane rejestrowe</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Właściciel:</strong> Jadwiga Fijałkowska</p>
                    <p><strong>Nazwa handlowa:</strong> GabinetShare</p>
                    <p><strong>Forma działalności:</strong> Działalność nierejestrowana</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-therapy-600">Adres</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>Osiedle Piastowskie 100/6</p>
                    <p>61-163 Poznań</p>
                    <p>Polska</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4 text-therapy-600">Kontakt</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <p><strong>Email:</strong> kontakt@gabinet-psychologa.com.pl</p>
                  <p><strong>Telefon:</strong> +48 123 456 789</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Dołącz do naszej społeczności
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Czy jesteś terapeutą szukającym klientów, właścicielem gabinetu czy osobą 
              potrzebującą wsparcia - znajdziesz tu miejsce dla siebie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-therapy-600 hover:bg-therapy-700">
                <Link to="/register">
                  Zarejestruj się <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">
                  Skontaktuj się z nami
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;