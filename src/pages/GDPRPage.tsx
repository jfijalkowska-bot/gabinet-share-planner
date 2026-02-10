import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Download, Trash2, Edit, Eye } from "lucide-react";
import LocalizedLink from "@/components/common/LocalizedLink";
import { useLanguagePrefix } from "@/hooks/useLanguagePrefix";

const GDPRPage = () => {
  const { currentLang } = useLanguagePrefix();
  const isIt = currentLang === "it";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              <Shield className="h-8 w-8 mx-auto mb-4 text-therapy-600" />
              {isIt ? "I tuoi diritti GDPR" : "Twoje prawa RODO"}
            </h1>
            <p className="text-xl text-gray-600">
              {isIt
                ? "Informazioni sui tuoi diritti relativi alla protezione dei dati personali"
                : "Informacje o Twoich prawach dotyczących ochrony danych osobowych"}
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-therapy-700">
                {isIt ? "I tuoi diritti sulla protezione dei dati" : "Twoje prawa w zakresie ochrony danych"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-therapy-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">{isIt ? "Diritto di accesso" : "Prawo dostępu"}</h3>
                    <p className="text-gray-600 text-sm">
                      {isIt
                        ? "Puoi ottenere una copia dei tuoi dati personali e informazioni su come vengono trattati."
                        : "Możesz uzyskać kopię swoich danych osobowych i informacje o sposobie ich przetwarzania."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Edit className="h-5 w-5 text-therapy-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">{isIt ? "Diritto di rettifica" : "Prawo do sprostowania"}</h3>
                    <p className="text-gray-600 text-sm">
                      {isIt
                        ? "Puoi richiedere la correzione dei dati inesatti o il completamento dei dati incompleti."
                        : "Możesz żądać poprawienia nieprawidłowych lub uzupełnienia niekompletnych danych."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trash2 className="h-5 w-5 text-therapy-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">{isIt ? "Diritto alla cancellazione" : "Prawo do usunięcia"}</h3>
                    <p className="text-gray-600 text-sm">
                      {isIt
                        ? "Puoi richiedere la cancellazione dei tuoi dati personali in determinati casi."
                        : "Możesz żądać usunięcia swoich danych osobowych w określonych przypadkach."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Download className="h-5 w-5 text-therapy-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">{isIt ? "Diritto alla portabilità" : "Prawo do przenoszenia"}</h3>
                    <p className="text-gray-600 text-sm">
                      {isIt
                        ? "Puoi ricevere i tuoi dati in un formato strutturato e di uso comune."
                        : "Możesz otrzymać swoje dane w ustrukturyzowanym, powszechnie używanym formacie."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-therapy-700">
                {isIt ? "Come esercitare i tuoi diritti?" : "Jak skorzystać ze swoich praw?"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                {isIt
                  ? "Per esercitare i tuoi diritti, contattaci:"
                  : "Aby skorzystać z przysługujących Ci praw, skontaktuj się z nami:"}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-therapy-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Email</h4>
                  <p className="text-sm text-gray-600">kontakt@gabinetshare.pl</p>
                </div>
                <div className="p-4 bg-therapy-50 rounded-lg">
                  <h4 className="font-semibold mb-2">{isIt ? "Modulo" : "Formularz"}</h4>
                  <p className="text-sm text-gray-600">{isIt ? "Nella pagina contatti" : "Na stronie kontaktowej"}</p>
                </div>
                <div className="p-4 bg-therapy-50 rounded-lg">
                  <h4 className="font-semibold mb-2">{isIt ? "Posta" : "Poczta tradycyjna"}</h4>
                  <p className="text-sm text-gray-600">ul. Przykładowa 123<br />00-001 Warszawa</p>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-700">
                  <strong>{isIt ? "Importante:" : "Ważne:"}</strong>{" "}
                  {isIt
                    ? "Per verificare la tua identità, potremmo richiedere informazioni aggiuntive prima di elaborare la tua richiesta."
                    : "W celu weryfikacji Twojej tożsamości, możemy poprosić o dodatkowe informacje przed realizacją Twojego żądania dotyczącego danych osobowych."}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-therapy-700">
                {isIt ? "Eliminazione account e dati personali" : "Usuwanie konta i danych osobowych"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">{isIt ? "Come eliminare il tuo account:" : "Jak usunąć swoje konto:"}</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>{isIt ? "Accedi al tuo account" : "Zaloguj się do swojego konta"}</li>
                  <li>{isIt ? "Vai alle impostazioni" : "Przejdź do ustawień konta"}</li>
                  <li>{isIt ? "Seleziona \"Elimina account\"" : "Wybierz opcję \"Usuń konto\""}</li>
                  <li>{isIt ? "Conferma la tua decisione" : "Potwierdź swoją decyzję"}</li>
                </ol>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">{isIt ? "Cosa succede ai tuoi dati:" : "Co dzieje się z Twoimi danymi:"}</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>{isIt ? "I dati personali vengono eliminati definitivamente entro 30 giorni" : "Dane osobowe zostają trwale usunięte w ciągu 30 dni"}</li>
                  <li>{isIt ? "I dati delle transazioni vengono conservati per legge (5 anni)" : "Dane dotyczące transakcji finansowych przechowujemy zgodnie z przepisami prawa (5 lat)"}</li>
                  <li>{isIt ? "I dati statistici anonimizzati possono essere conservati per scopi analitici" : "Zanonimizowane dane statystyczne mogą być zachowane dla celów analitycznych"}</li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-sm text-red-800">
                  <strong>{isIt ? "Attenzione:" : "Uwaga:"}</strong>{" "}
                  {isIt
                    ? "L'eliminazione dell'account è irreversibile. Tutti i dati, le prenotazioni e la cronologia verranno persi definitivamente."
                    : "Usunięcie konta jest nieodwracalne. Wszystkie dane, rezerwacje i historia aktywności zostaną trwale utracone."}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-therapy-700">
                {isIt ? "Diritto di presentare reclamo" : "Prawo do wniesienia skargi"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                {isIt
                  ? "Hai il diritto di presentare un reclamo all'autorità di controllo (Garante per la protezione dei dati personali) in caso di violazione del GDPR."
                  : "Masz prawo wnieść skargę do organu nadzorczego (Prezesa Urzędu Ochrony Danych Osobowych) w przypadku naruszenia przepisów RODO."}
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                {isIt ? (
                  <>
                    <h4 className="font-semibold mb-2">Garante per la protezione dei dati personali</h4>
                    <p className="text-sm text-gray-700">
                      <strong>Sito web:</strong> www.garanteprivacy.it<br />
                      <strong>Email:</strong> garante@gpdp.it
                    </p>
                  </>
                ) : (
                  <>
                    <h4 className="font-semibold mb-2">Urząd Ochrony Danych Osobowych</h4>
                    <p className="text-sm text-gray-700">
                      <strong>Adres:</strong> ul. Stawki 2, 00-193 Warszawa<br />
                      <strong>Tel:</strong> 22 531 03 00<br />
                      <strong>Email:</strong> kancelaria@uodo.gov.pl<br />
                      <strong>Strona:</strong> www.uodo.gov.pl
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {isIt ? "Hai bisogno di aiuto?" : "Potrzebujesz pomocy?"}
            </h2>
            <p className="text-gray-600">
              {isIt
                ? "Se hai domande sulla protezione dei dati, contattaci."
                : "Jeśli masz pytania dotyczące ochrony danych osobowych, skontaktuj się z nami."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <LocalizedLink to="/contact">{isIt ? "Contattaci" : "Skontaktuj się z nami"}</LocalizedLink>
              </Button>
              <Button variant="outline" asChild>
                <LocalizedLink to="/terms">{isIt ? "Leggi l'informativa completa" : "Przeczytaj pełną politykę prywatności"}</LocalizedLink>
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
