import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Download, Trash2, Edit, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const GDPRPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              <Shield className="h-8 w-8 mx-auto mb-4 text-therapy-600" />
              Twoje prawa RODO
            </h1>
            <p className="text-xl text-gray-600">
              Informacje o Twoich prawach dotyczących ochrony danych osobowych
            </p>
          </div>

          {/* Podstawowe prawa */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-therapy-700">Twoje prawa w zakresie ochrony danych</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-therapy-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Prawo dostępu</h3>
                    <p className="text-gray-600 text-sm">
                      Możesz uzyskać kopię swoich danych osobowych i informacje o sposobie ich przetwarzania.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Edit className="h-5 w-5 text-therapy-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Prawo do sprostowania</h3>
                    <p className="text-gray-600 text-sm">
                      Możesz żądać poprawienia nieprawidłowych lub uzupełnienia niekompletnych danych.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trash2 className="h-5 w-5 text-therapy-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Prawo do usunięcia</h3>
                    <p className="text-gray-600 text-sm">
                      Możesz żądać usunięcia swoich danych osobowych w określonych przypadkach.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Download className="h-5 w-5 text-therapy-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Prawo do przenoszenia</h3>
                    <p className="text-gray-600 text-sm">
                      Możesz otrzymać swoje dane w ustrukturyzowanym, powszechnie używanym formacie.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jak skorzystać z praw */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-therapy-700">Jak skorzystać ze swoich praw?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Aby skorzystać z przysługujących Ci praw, skontaktuj się z nami:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-therapy-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-sm text-gray-600">kontakt@gabinetshare.pl</p>
                </div>
                <div className="p-4 bg-therapy-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Formularz</h4>
                  <p className="text-sm text-gray-600">Na stronie kontaktowej</p>
                </div>
                <div className="p-4 bg-therapy-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Poczta tradycyjna</h4>
                  <p className="text-sm text-gray-600">ul. Przykładowa 123<br />00-001 Warszawa</p>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-700">
                  <strong>Ważne:</strong> W celu weryfikacji Twojej tożsamości, możemy poprosić o dodatkowe informacje 
                  przed realizacją Twojego żądania dotyczącego danych osobowych.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Proces usuwania danych */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-therapy-700">Usuwanie konta i danych osobowych</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Jak usunąć swoje konto:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Zaloguj się do swojego konta</li>
                  <li>Przejdź do ustawień konta</li>
                  <li>Wybierz opcję "Usuń konto"</li>
                  <li>Potwierdź swoją decyzję</li>
                </ol>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Co dzieje się z Twoimi danymi:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Dane osobowe zostają trwale usunięte w ciągu 30 dni</li>
                  <li>Dane dotyczące transakcji finansowych przechowujemy zgodnie z przepisami prawa (5 lat)</li>
                  <li>Zanonimizowane dane statystyczne mogą być zachowane dla celów analitycznych</li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm text-red-800">
                  <strong>Uwaga:</strong> Usunięcie konta jest nieodwracalne. Wszystkie dane, rezerwacje 
                  i historia aktywności zostaną trwale utracone.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Skarga do UODO */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-therapy-700">Prawo do wniesienia skargi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Masz prawo wnieść skargę do organu nadzorczego (Prezesa Urzędu Ochrony Danych Osobowych) 
                w przypadku naruszenia przepisów RODO.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold mb-2">Urząd Ochrony Danych Osobowych</h4>
                <p className="text-sm text-gray-700">
                  <strong>Adres:</strong> ul. Stawki 2, 00-193 Warszawa<br />
                  <strong>Tel:</strong> 22 531 03 00<br />
                  <strong>Email:</strong> kancelaria@uodo.gov.pl<br />
                  <strong>Strona:</strong> www.uodo.gov.pl
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Potrzebujesz pomocy?</h2>
            <p className="text-gray-600">
              Jeśli masz pytania dotyczące ochrony danych osobowych, skontaktuj się z nami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/contact">Skontaktuj się z nami</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/terms">Przeczytaj pełną politykę prywatności</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GDPRPage;