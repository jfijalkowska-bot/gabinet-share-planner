
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CreditCard, ShieldCheck, HelpCircle, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentsInfoPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              System płatności w GabinetShare
            </h1>
            <p className="text-xl text-gray-600">
              Jak działają płatności i rozliczenia na naszej platformie
            </p>
          </div>
          
          <div className="space-y-8 mb-16">
            <Card className="border-therapy-100">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-therapy-100 p-3 rounded-full">
                    <CreditCard className="h-6 w-6 text-therapy-700" />
                  </div>
                  <CardTitle>Model płatności na platformie</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  GabinetShare wykorzystuje uproszczony model płatności, który minimalizuje obciążenia administracyjne dla wszystkich stron:
                </p>
                
                <div className="pl-4 border-l-4 border-therapy-200 py-2">
                  <p className="font-medium">Płatności za korzystanie z platformy</p>
                  <p className="text-gray-600">
                    Jedyne płatności pobierane przez GabinetShare to opłaty abonamentowe za dostęp do platformy. Wystawiamy faktury VAT za te usługi, zgodnie z obowiązującymi przepisami.
                  </p>
                </div>
                
                <div className="pl-4 border-l-4 border-therapy-200 py-2">
                  <p className="font-medium">Rozliczenia między terapeutami a klientami</p>
                  <p className="text-gray-600">
                    Wszelkie rozliczenia finansowe między terapeutami a ich klientami odbywają się bezpośrednio między stronami, poza platformą GabinetShare. Platforma służy jedynie do komunikacji i rezerwacji terminów.
                  </p>
                </div>
                
                <div className="pl-4 border-l-4 border-therapy-200 py-2">
                  <p className="font-medium">Rozliczenia między właścicielami gabinetów a terapeutami</p>
                  <p className="text-gray-600">
                    GabinetShare nie pośredniczy w rozliczeniach finansowych między właścicielami gabinetów a terapeutami. Strony ustalają warunki współpracy i dokonują płatności bezpośrednio między sobą.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-therapy-100">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-therapy-100 p-3 rounded-full">
                    <ShieldCheck className="h-6 w-6 text-therapy-700" />
                  </div>
                  <CardTitle>Program Partnerski</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Program partnerski GabinetShare działa następująco:
                </p>
                
                <div className="pl-4 border-l-4 border-therapy-200 py-2">
                  <p className="font-medium">Prowizje za polecenia</p>
                  <p className="text-gray-600">
                    Użytkownicy otrzymują 10% prowizji od każdego zakupu abonamentu dokonanego przez osoby, które skorzystały z ich linka partnerskiego.
                  </p>
                </div>
                
                <div className="pl-4 border-l-4 border-therapy-200 py-2">
                  <p className="font-medium">Wypłaty prowizji</p>
                  <p className="text-gray-600">
                    Prowizje są naliczane automatycznie i wypłacane raz na miesiąc, pod warunkiem osiągnięcia minimalnej kwoty 50 zł. Wypłaty są realizowane na wskazane konto bankowe lub przez system płatności online.
                  </p>
                </div>
                
                <div className="pl-4 border-l-4 border-therapy-200 py-2">
                  <p className="font-medium">Dokumentacja finansowa</p>
                  <p className="text-gray-600">
                    Dla wypłat w ramach programu partnerskiego wystawiamy odpowiednie dokumenty rozliczeniowe zgodnie z obowiązującymi przepisami. Użytkownicy mają obowiązek podać swoje dane rozliczeniowe w profilu.
                  </p>
                </div>
                
                <div className="mt-4">
                  <Link to="/affiliate">
                    <Button className="bg-therapy-600 hover:bg-therapy-700">
                      Dowiedz się więcej o Programie Partnerskim
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-therapy-100">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-therapy-100 p-3 rounded-full">
                    <HelpCircle className="h-6 w-6 text-therapy-700" />
                  </div>
                  <CardTitle>Najczęściej zadawane pytania</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Jakie formy płatności akceptujecie?</h3>
                  <p className="text-gray-600">
                    Akceptujemy płatności kartą kredytową, przelewem bankowym oraz przez popularne systemy płatności online jak BLIK, PayPal czy Google Pay.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Czy otrzymam fakturę za abonament?</h3>
                  <p className="text-gray-600">
                    Tak, za każdą opłatę abonamentową automatycznie wystawiamy fakturę VAT. Faktura jest dostępna do pobrania w panelu użytkownika po zaksięgowaniu płatności.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Jak mogę zmienić dane do faktury?</h3>
                  <p className="text-gray-600">
                    Dane do faktury możesz zmienić w ustawieniach swojego profilu. Zmiany będą uwzględnione przy kolejnej wystawionej fakturze.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Co z rozliczeniami między terapeutą a klientem?</h3>
                  <p className="text-gray-600">
                    GabinetShare nie pośredniczy w płatnościach między terapeutami a klientami. Strony ustalają między sobą formy i terminy płatności poza naszą platformą.
                  </p>
                </div>
                
                <div className="mt-4 flex items-center justify-center">
                  <Link to="/contact">
                    <Button variant="outline">
                      Zadaj inne pytanie
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-therapy-50 p-6 rounded-lg border border-therapy-100">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <BookOpen className="h-6 w-6 text-therapy-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Porady dla terapeutów i właścicieli gabinetów</h3>
                  <p className="text-gray-600 mb-4">
                    W naszej bazie wiedzy znajdziesz artykuły poświęcone rozliczeniom finansowym, wystawianiu faktur i aspektom podatkowym dla różnych typów usług terapeutycznych.
                  </p>
                  <Link to="/knowledge-base">
                    <Button variant="outline">
                      Przejdź do bazy wiedzy
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="mb-4 text-gray-600">
              Masz więcej pytań dotyczących płatności lub innych aspektów korzystania z GabinetShare?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button variant="outline">
                  Kontakt z obsługą
                </Button>
              </Link>
              <Link to="/terms">
                <Button className="bg-therapy-600 hover:bg-therapy-700">
                  Zapoznaj się z regulaminem
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentsInfoPage;
