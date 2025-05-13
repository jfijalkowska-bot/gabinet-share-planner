
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AffiliatePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const affiliateId = user?.id?.slice(0, 8) || "";
  
  const baseUrl = window.location.origin;
  const affiliateLink = `${baseUrl}/?ref=${affiliateId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    toast({
      title: "Skopiowano!",
      description: "Link afiliacyjny został skopiowany do schowka.",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const renderNotLoggedIn = () => (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Program Partnerski</CardTitle>
        <CardDescription>
          Zaloguj się lub zarejestruj, aby wygenerować swój unikalny link afiliacyjny.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          Zarabiaj 10% prowizji od każdego zakupu dokonanego z Twojego polecenia.
          To proste: polecaj i zarabiaj!
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="bg-therapy-600 hover:bg-therapy-700" asChild>
            <a href="/login">Zaloguj się</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/register">Zarejestruj się</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderLoggedIn = () => (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Twój link afiliacyjny</CardTitle>
          <CardDescription>
            Udostępnij ten link, aby otrzymywać 10% prowizji od każdego zakupu.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex">
            <Input
              value={affiliateLink}
              readOnly
              className="rounded-r-none"
            />
            <Button 
              onClick={handleCopy} 
              className="rounded-l-none bg-therapy-600 hover:bg-therapy-700"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Materiały promocyjne
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Materiały promocyjne</DialogTitle>
                  <DialogDescription>
                    Wykorzystaj te materiały, aby skuteczniej promować GabinetShare.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Tabs defaultValue="banners">
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="banners">Bannery</TabsTrigger>
                      <TabsTrigger value="text">Teksty</TabsTrigger>
                    </TabsList>
                    <TabsContent value="banners" className="space-y-4">
                      <p className="text-sm text-gray-500">Bannery będą dostępne wkrótce.</p>
                    </TabsContent>
                    <TabsContent value="text" className="space-y-4">
                      <div className="border rounded-md p-3">
                        <p className="text-sm font-medium mb-1">Krótki tekst:</p>
                        <p className="text-sm text-gray-600">
                          "Szukasz gabinetu do wynajęcia lub chcesz efektywnie zarządzać rezerwacjami? Sprawdź GabinetShare!"
                        </p>
                      </div>
                      <div className="border rounded-md p-3">
                        <p className="text-sm font-medium mb-1">Dłuższy tekst:</p>
                        <p className="text-sm text-gray-600">
                          "GabinetShare to platforma, która rewolucjonizuje sposób wynajmu gabinetów i zarządzania kalendarzem wizyt. Zarówno terapeuci, jak i właściciele gabinetów znajdą tu narzędzia dopasowane do swoich potrzeb. Sprawdź już teraz!"
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" className="w-full" asChild>
              <a href={`mailto:?subject=Poznaj GabinetShare&body=Cześć! Znalazłem/am świetną platformę do wynajmu gabinetów i zarządzania kalendarzem wizyt. Sprawdź: ${affiliateLink}`}>
                Udostępnij przez email
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Twoje zarobki</CardTitle>
          <CardDescription>
            Statystyki Twojego programu partnerskiego
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-therapy-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Łączne zarobki</p>
              <p className="text-2xl font-bold text-therapy-700">0,00 zł</p>
            </div>
            <div className="bg-therapy-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Kliknięcia</p>
              <p className="text-2xl font-bold text-therapy-700">0</p>
            </div>
            <div className="bg-therapy-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-500">Konwersje</p>
              <p className="text-2xl font-bold text-therapy-700">0</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Statystyki są aktualizowane raz dziennie. Panel statystyk będzie dostępny wkrótce.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Jak to działa?</CardTitle>
          <CardDescription>
            Poznaj zasady programu partnerskiego GabinetShare
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-therapy-100 rounded-full p-2">
              <LinkIcon className="h-5 w-5 text-therapy-700" />
            </div>
            <div>
              <h4 className="font-medium">Udostępnij swój link</h4>
              <p className="text-sm text-gray-600">Podziel się swoim unikalnym linkiem afiliacyjnym z innymi terapeutami, właścicielami gabinetów lub potencjalnymi klientami.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-therapy-100 rounded-full p-2">
              <Check className="h-5 w-5 text-therapy-700" />
            </div>
            <div>
              <h4 className="font-medium">Zyskaj nowych użytkowników</h4>
              <p className="text-sm text-gray-600">Gdy ktoś zarejestruje się i wykupi abonament przez Twój link, zostaje przypisany do Twojego konta partnerskiego.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-therapy-100 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-therapy-700">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8h-6.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H6" />
                <path d="M12 18V6" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Otrzymuj prowizję</h4>
              <p className="text-sm text-gray-600">Zarabiaj 10% prowizji od każdego zakupu dokonanego przez osoby, które skorzystały z Twojego linka. <strong>Program partnerski dostępny dla wszystkich typów kont!</strong></p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-md">
            <h3 className="font-medium text-green-800 mb-2">Nowość: Program partnerski dla klientów!</h3>
            <p className="text-sm text-green-700">
              Teraz każdy może zarabiać na poleceniach - również klienci! Wystarczy, że zarejestrujesz się jako klient, a Twój link afiliacyjny będzie aktywny. Zapraszaj innych do skorzystania z GabinetShare i zarabiaj 10% prowizji od ich płatnych planów.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Program Partnerski GabinetShare
            </h1>
            <p className="text-xl text-gray-600">
              Zarabiaj 10% prowizji polecając naszą platformę innym
            </p>
            <p className="text-md text-therapy-600 mt-2 font-medium">
              Nowość: Program partnerski dostępny również dla klientów!
            </p>
          </div>
          
          {user ? renderLoggedIn() : renderNotLoggedIn()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AffiliatePage;
