
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Check } from "lucide-react";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Jak działa GabinetShare?
            </h1>
            <p className="text-xl text-gray-600">
              Poznaj opcje korzystania z naszej platformy
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4 text-therapy-600">Korzystanie bez rejestracji</h2>
              <p className="text-gray-600 mb-6">
                Wyszukuj gabinety i terapeutów bez konieczności zakładania konta. 
                Możesz korzystać z zaawansowanej wyszukiwarki całkowicie bezpłatnie!
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Wyszukiwanie gabinetów i terapeutów</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Filtrowanie wyników wyszukiwania</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Przeglądanie szczegółów i ofert</span>
                </li>
              </ul>
              <Link to="/search">
                <Button variant="outline" className="w-full">
                  Przejdź do wyszukiwarki
                </Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
              <h2 className="text-2xl font-semibold mb-4 text-therapy-600">Wizytówka terapeuty</h2>
              <p className="text-gray-600 mb-6">
                Jednorazowa opłata 49 zł pozwala na stworzenie profesjonalnej wizytówki online.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Profesjonalny profil w bazie</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Wypełnienie informacji o specjalizacjach</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Możliwość zarabiania z programu partnerskiego</span>
                </li>
              </ul>
              <Link to="/register?plan=free">
                <Button variant="outline" className="w-full">
                  Stwórz wizytówkę terapeuty
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div className="bg-therapy-50 rounded-lg p-6 shadow-md border border-therapy-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-therapy-700">Terapeuta z kalendarzem</h2>
                <span className="px-3 py-1 bg-therapy-100 text-therapy-700 rounded-full text-sm font-medium">
                  29 zł / miesiąc
                </span>
              </div>
              <p className="text-gray-600 mb-6">
                Pełen dostęp do kalendarza wizyt i narzędzi dla terapeutów.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Kalendarz online dla pacjentów</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Rezerwacja godzin w gabinetach</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Zaawansowany system powiadomień</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Program partnerski (10% prowizji)</span>
                </li>
              </ul>
              <Link to="/register?plan=therapist">
                <Button className="w-full bg-therapy-600 hover:bg-therapy-700">
                  Rozpocznij 14-dniowy okres próbny
                </Button>
              </Link>
              <p className="text-xs text-center mt-2 text-gray-500">
                14 dni za darmo, bez automatycznego przedłużenia
              </p>
            </div>
            
            <div className="bg-therapy-50 rounded-lg p-6 shadow-md border border-therapy-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-therapy-700">Właściciel gabinetu</h2>
                <span className="px-3 py-1 bg-therapy-100 text-therapy-700 rounded-full text-sm font-medium">
                  59 zł / miesiąc
                </span>
              </div>
              <p className="text-gray-600 mb-6">
                Zarządzaj gabinetem, udostępniaj terminy i wynajmuj powierzchnię.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Zarządzanie kalendarzem gabinetu</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Udostępnianie wolnych godzin</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Panel zarządzania wynajmem</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Program partnerski (10% prowizji)</span>
                </li>
              </ul>
              <Link to="/register?plan=owner">
                <Button className="w-full bg-therapy-600 hover:bg-therapy-700">
                  Rozpocznij 14-dniowy okres próbny
                </Button>
              </Link>
              <p className="text-xs text-center mt-2 text-gray-500">
                14 dni za darmo, bez automatycznego przedłużenia
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-therapy-50 to-blue-50 rounded-lg p-8 shadow-md border border-therapy-100 mb-16">
            <div className="md:flex items-start gap-6">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-semibold mb-4 text-therapy-700">Program Partnerski</h2>
                <p className="text-gray-600 mb-4">
                  Zarabiaj polecając GabinetShare innym terapeutom i właścicielom gabinetów.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>10% prowizji od każdego zakupu z Twojego linka</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Śledzenie statystyk w panelu partnera</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Materiały promocyjne do wykorzystania</span>
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="bg-therapy-600 hover:bg-therapy-700">
                    Dołącz do programu partnerskiego
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/3 mt-6 md:mt-0">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <p className="font-medium text-center mb-2">Przykład zarobku</p>
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    Polecenie 5 terapeutów miesięcznie:
                  </p>
                  <div className="text-center">
                    <p className="font-bold text-2xl text-therapy-600">145 zł / mies.</p>
                    <p className="text-xs text-gray-500 mt-1">(5 x 29zł x 10%)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Masz pytania?</h3>
            <p className="mb-6 text-gray-600">
              Skontaktuj się z nami, aby dowiedzieć się więcej o możliwościach GabinetShare.
            </p>
            <Link to="/contact">
              <Button variant="outline">Kontakt</Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
