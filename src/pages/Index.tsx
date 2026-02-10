
import LocalizedLink from "@/components/common/LocalizedLink";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Search, Clock } from "lucide-react";
import FeatureCard from "@/components/home/FeatureCard";
import PricingBanner from "@/components/home/PricingBanner";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-therapy-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('home.heroTitle', 'Platforma dla terapeutów i gabinetów')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('home.heroSubtitle', 'Wynajmuj gabinet, zarządzaj kalendarzem i znajdź pacjentów w jednym miejscu')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-therapy-600 hover:bg-therapy-700">
                <LocalizedLink to="/register">{t('home.cta', 'Rozpocznij za darmo')}</LocalizedLink>
              </Button>
              <Button asChild size="lg" variant="outline">
                <LocalizedLink to="/search">{t('home.searchCta', 'Wyszukaj gabinet/znajdź specjalistę')}</LocalizedLink>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('home.featuresTitle', 'Wszystko, czego potrzebujesz')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Search}
                title={t('home.feature1Title', 'Znajdź gabinet do wynajęcia')}
                description={t('home.feature1Desc', 'Przeszukuj bazę dostępnych gabinetów, filtruj według lokalizacji, wyposażenia i dostępności.')}
              />
              <FeatureCard 
                icon={Calendar}
                title={t('home.feature2Title', 'Zarządzaj kalendarzem')}
                description={t('home.feature2Desc', 'Planuj wizyty, udostępniaj wolne terminy i organizuj swój grafik w jednym miejscu.')}
              />
              <FeatureCard 
                icon={Clock}
                title={t('home.feature3Title', 'Wynajmuj na godziny')}
                description={t('home.feature3Desc', 'Udostępniaj swój gabinet innym terapeutom, gdy z niego nie korzystasz. Zarabiaj więcej.')}
              />
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-center mb-8">{t('home.aiTitle', 'Funkcje AI dla terapeutów')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <h4 className="text-xl font-semibold mb-3 text-therapy-700">{t('home.aiFeature1Title', 'Zarządzaj dokumentacją pacjenta')}</h4>
                  <p className="text-gray-600">{t('home.aiFeature1Desc', 'Kompleksowy system akt pacjentów z historią sesji, notatkami i dokumentami w jednym miejscu.')}</p>
                </Card>
                
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <h4 className="text-xl font-semibold mb-3 text-therapy-700">{t('home.aiFeature2Title', 'Notatki głosowe z sesji')}</h4>
                  <p className="text-gray-600">{t('home.aiFeature2Desc', 'Nagrywaj sesje głosowo i automatycznie transkrybuj je do tekstu dzięki AI (Whisper). Oszczędź czas na dokumentacji.')}</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t('home.servicesTitle', 'Kompletna platforma dla branży terapeutycznej')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-therapy-700">{t('home.service1Title', 'Wyszukiwarka terapeutów')}</h3>
                <p className="text-gray-600">{t('home.service1Desc', 'Znajdź specjalistę według specjalizacji, lokalizacji, podejścia terapeutycznego i dostępności.')}</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-therapy-700">{t('home.service2Title', 'Superwizja')}</h3>
                <p className="text-gray-600">{t('home.service2Desc', 'Znajdź superwizora lub oferuj superwizję. System aplikacji i zarządzania procesem superwizyjnym.')}</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-therapy-700">{t('home.service3Title', 'Społeczność specjalistów')}</h3>
                <p className="text-gray-600">{t('home.service3Desc', 'Dyskutuj, wymieniaj się doświadczeniami i buduj sieć kontaktów z innymi terapeutami.')}</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-therapy-700">{t('home.service4Title', 'Kalendarz do wbudowania')}</h3>
                <p className="text-gray-600">{t('home.service4Desc', 'Gotowy kod do implementacji na stronie gabinetu. Klienci mogą rezerwować wizyty bezpośrednio.')}</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-therapy-700">{t('home.service5Title', 'Szkolenia i kursy')}</h3>
                <p className="text-gray-600">{t('home.service5Desc', 'Znajdź szkolenie lub zorganizuj własne. System zapisów i zarządzania uczestnikami.')}</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3 text-therapy-700">{t('home.service6Title', 'Program partnerski')}</h3>
                <p className="text-gray-600">{t('home.service6Desc', 'Zarabiaj 10% prowizji za każde polecenie nowego użytkownika - niezależnie od Twojej roli.')}</p>
              </Card>
            </div>
          </div>
        </section>
        
        <PricingBanner />
        
        {/* CTA Section */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-therapy-50 to-white">
              <h2 className="text-3xl font-bold mb-4">{t('home.ctaTitle', 'Dołącz do społeczności GabinetShare')}</h2>
              <p className="text-xl mb-6 text-gray-600">
                {t('home.ctaSubtitle', 'Stwórz konto i korzystaj z platformy już teraz')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-therapy-600 hover:bg-therapy-700">
                  <LocalizedLink to="/register">{t('home.cta', 'Rozpocznij za darmo')}</LocalizedLink>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <LocalizedLink to="/how-it-works">{t('home.learnMore', 'Dowiedz się więcej')}</LocalizedLink>
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
