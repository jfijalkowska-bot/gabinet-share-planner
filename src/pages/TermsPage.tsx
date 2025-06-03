import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Regulamin i polityka prywatności</h1>
          
          <Tabs defaultValue="terms" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="terms">Regulamin</TabsTrigger>
              <TabsTrigger value="privacy">Polityka prywatności</TabsTrigger>
              <TabsTrigger value="cookies">Polityka cookies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="terms">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">1. Postanowienia ogólne</h2>
                    <p className="text-gray-700 mb-2">
                      1.1. Niniejszy Regulamin określa zasady korzystania z serwisu internetowego GabinetShare, dostępnego pod adresem www.gabinetshare.pl.
                    </p>
                    <p className="text-gray-700 mb-2">
                      1.2. Właścicielem i administratorem serwisu GabinetShare jest [NAZWA FIRMY], z siedzibą przy [ADRES], wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego pod numerem [NUMER KRS], NIP [NUMER NIP], REGON [NUMER REGON].
                    </p>
                    <p className="text-gray-700">
                      1.3. Korzystanie z serwisu oznacza akceptację niniejszego Regulaminu.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">2. Definicje</h2>
                    <p className="text-gray-700 mb-2">
                      2.1. <strong>Serwis</strong> - platforma internetowa GabinetShare, dostępna pod adresem www.gabinetshare.pl.
                    </p>
                    <p className="text-gray-700 mb-2">
                      2.2. <strong>Użytkownik</strong> - osoba fizyczna, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, korzystająca z usług Serwisu.
                    </p>
                    <p className="text-gray-700 mb-2">
                      2.3. <strong>Terapeuta</strong> - Użytkownik oferujący usługi terapeutyczne za pośrednictwem Serwisu.
                    </p>
                    <p className="text-gray-700 mb-2">
                      2.4. <strong>Terapeuta poszukujący gabinetu</strong> - Użytkownik poszukujący przestrzeni gabinetowej do wynajęcia oraz klientów za pośrednictwem Serwisu, korzystający z bezpłatnego konta.
                    </p>
                    <p className="text-gray-700 mb-2">
                      2.5. <strong>Właściciel gabinetu</strong> - Użytkownik oferujący przestrzeń gabinetową do wynajęcia za pośrednictwem Serwisu.
                    </p>
                    <p className="text-gray-700 mb-2">
                      2.6. <strong>Klient</strong> - Użytkownik poszukujący usług terapeutycznych za pośrednictwem Serwisu.
                    </p>
                    <p className="text-gray-700">
                      2.7. <strong>Program partnerski</strong> - system prowizji za polecanie nowych użytkowników Serwisu.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">3. Rodzaje kont użytkowników</h2>
                    <p className="text-gray-700 mb-2">
                      3.1. Serwis oferuje następujące rodzaje kont:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-2">
                      <li><strong>Konto właściciela gabinetu</strong> - płatny abonament umożliwiający zarządzanie jednym lub wieloma gabinetami, kalendarzem rezerwacji oraz profilem firmy</li>
                      <li><strong>Konto terapeuty</strong> - płatny abonament umożliwiający tworzenie wizytówki, kalendarz rezerwacji oraz zarządzanie profiliem zawodowym</li>
                      <li><strong>Konto terapeuty poszukującego gabinetu</strong> - bezpłatne konto umożliwiające przeglądanie ofert gabinetów, kontakt z właścicielami oraz udział w programie partnerskim</li>
                      <li><strong>Wizytówka podstawowa</strong> - jednorazowa opłata za utworzenie podstawowego profilu terapeuty bez kalendarza rezerwacji</li>
                      <li><strong>Konto klienta</strong> - bezpłatne konto umożliwiające rezerwację wizyt oraz udział w programie partnerskim</li>
                    </ul>
                    <p className="text-gray-700 mb-2">
                      3.2. Właściciele gabinetów mogą zarządzać wieloma przestrzeniami w ramach jednego abonamentu.
                    </p>
                    <p className="text-gray-700">
                      3.3. Administrator Serwisu może zwolnić wybranych użytkowników z opłat abonamentowych.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">4. Zasady korzystania z Serwisu</h2>
                    <p className="text-gray-700 mb-2">
                      4.1. Korzystanie z podstawowych funkcji Serwisu (przeglądanie ofert) jest bezpłatne i nie wymaga rejestracji.
                    </p>
                    <p className="text-gray-700 mb-2">
                      4.2. Pełny dostęp do funkcji Serwisu wymaga utworzenia konta i wyboru odpowiedniego planu abonamentowego.
                    </p>
                    <p className="text-gray-700 mb-2">
                      4.3. Użytkownik zobowiązuje się do podania prawdziwych danych podczas rejestracji i aktualizowania ich w przypadku zmian.
                    </p>
                    <p className="text-gray-700 mb-2">
                      4.4. Użytkownik odpowiada za bezpieczeństwo swojego konta i hasła. Wszelkie działania wykonane z wykorzystaniem konta Użytkownika uznaje się za działania Użytkownika.
                    </p>
                    <p className="text-gray-700">
                      4.5. Zabrania się korzystania z Serwisu w sposób sprzeczny z prawem lub dobrymi obyczajami.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">5. System rezerwacji i kalendarze</h2>
                    <p className="text-gray-700 mb-2">
                      5.1. Kalendarz rezerwacji wykorzystuje sloty 30-minutowe, umożliwiając rezerwację sesji o różnej długości.
                    </p>
                    <p className="text-gray-700 mb-2">
                      5.2. Szczegóły rezerwacji (dane klientów, typ sesji) są widoczne wyłącznie dla właściciela kalendarza.
                    </p>
                    <p className="text-gray-700 mb-2">
                      5.3. Osoby postronne widzą jedynie dostępność terminów (zajęte/wolne), bez szczegółów rezerwacji.
                    </p>
                    <p className="text-gray-700 mb-2">
                      5.4. Użytkownicy mogą rezerwować sesje o różnej długości: 30, 60, 90 lub 120 minut.
                    </p>
                    <p className="text-gray-700 mb-2">
                      5.5. Właściciele kalendarzy mogą zarządzać dostępnością i ustawieniami prywatności swojich terminów.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">6. Program partnerski</h2>
                    <p className="text-gray-700 mb-2">
                      6.1. Użytkownicy z kontami bezpłatnymi (klienci i terapeuci poszukujący gabinetu) mogą uczestniczyć w programie partnerskim.
                    </p>
                    <p className="text-gray-700 mb-2">
                      6.2. Program partnerski polega na otrzymywaniu prowizji za polecanie nowych użytkowników Serwisu.
                    </p>
                    <p className="text-gray-700 mb-2">
                      6.3. Wysokość prowizji oraz szczegółowe warunki programu partnerskiego są dostępne w panelu użytkownika.
                    </p>
                    <p className="text-gray-700">
                      6.4. Serwis zastrzega sobie prawo do modyfikacji warunków programu partnerskiego z 30-dniowym wypowiedzeniem.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">7. Płatności i rozliczenia</h2>
                    <p className="text-gray-700 mb-2">
                      7.1. Serwis pobiera opłaty wyłącznie za korzystanie z platformy, zgodnie z wybranym planem abonamentowym.
                    </p>
                    <p className="text-gray-700 mb-2">
                      7.2. Aktualne ceny planów abonamentowych są dostępne na stronie Serwisu.
                    </p>
                    <p className="text-gray-700 mb-2">
                      7.3. Za każdą opłatę abonamentową Użytkownik otrzymuje fakturę VAT, dostępną do pobrania w panelu użytkownika.
                    </p>
                    <p className="text-gray-700 mb-2">
                      7.4. Serwis nie pośredniczy w rozliczeniach finansowych między Terapeutami a Klientami ani między Właścicielami gabinetów a Terapeutami.
                    </p>
                    <p className="text-gray-700 mb-2">
                      7.5. Szczegółowe zasady dotyczące płatności i programu partnerskiego określa oddzielny regulamin, dostępny na stronie Serwisu.
                    </p>
                    <p className="text-gray-700 mb-2">
                      7.6. Administrator może zwolnić wybranych użytkowników z opłat abonamentowych zgodnie z własnym uznaniem.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">8. Zarządzanie wieloma gabinetami</h2>
                    <p className="text-gray-700 mb-2">
                      8.1. Właściciele gabinetów mogą zarządzać wieloma przestrzeniami w ramach jednego konta i abonamentu.
                    </p>
                    <p className="text-gray-700 mb-2">
                      8.2. Każdy gabinet może mieć osobny kalendarz, ustawienia oraz dane kontaktowe.
                    </p>
                    <p className="text-gray-700">
                      8.3. Rozliczenia za wszystkie gabinety danego właściciela są prowadzone centralnie w ramach jednego konta.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">9. Odpowiedzialność</h2>
                    <p className="text-gray-700 mb-2">
                      9.1. Serwis nie ponosi odpowiedzialności za treści zamieszczane przez Użytkowników.
                    </p>
                    <p className="text-gray-700 mb-2">
                      9.2. Serwis nie ponosi odpowiedzialności za jakość usług świadczonych przez Terapeutów ani za stan i jakość wynajmowanych gabinetów.
                    </p>
                    <p className="text-gray-700 mb-2">
                      9.3. Serwis dokłada wszelkich starań, aby zapewnić prawidłowe funkcjonowanie platformy, jednak nie gwarantuje nieprzerwanego dostępu do swoich usług.
                    </p>
                    <p className="text-gray-700">
                      9.4. Serwis nie ponosi odpowiedzialności za szkody wynikające z korzystania lub niemożności korzystania z Serwisu.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">10. Prawa własności intelektualnej</h2>
                    <p className="text-gray-700 mb-2">
                      10.1. Wszelkie prawa do treści zamieszczonych w Serwisie, w tym prawa autorskie, znaki towarowe, nazwy, grafiki, zdjęcia, filmy, dźwięki i materiały, należą do Serwisu lub podmiotów, z którymi Serwis zawarł stosowne umowy.
                    </p>
                    <p className="text-gray-700">
                      10.2. Zabrania się kopiowania, modyfikowania, rozpowszechniania lub wykorzystywania w inny sposób treści zamieszczonych w Serwisie bez wyraźnej pisemnej zgody Serwisu.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">11. Postanowienia końcowe</h2>
                    <p className="text-gray-700 mb-2">
                      11.1. Administrator zastrzega sobie prawo do zmiany Regulaminu. Zmiany wchodzą w życie po upływie 14 dni od daty ich publikacji w Serwisie.
                    </p>
                    <p className="text-gray-700 mb-2">
                      11.2. W przypadku zmiany Regulaminu, Użytkownicy zostaną poinformowani o tym fakcie za pośrednictwem poczty elektronicznej lub poprzez komunikat w Serwisie.
                    </p>
                    <p className="text-gray-700 mb-2">
                      11.3. W kwestiach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego.
                    </p>
                    <p className="text-gray-700 mb-2">
                      11.4. Wszelkie spory wynikające z korzystania z Serwisu będą rozstrzygane przez sąd właściwy dla siedziby Administratora.
                    </p>
                    <p className="text-gray-700 mb-2">
                      11.5. Regulamin wchodzi w życie z dniem [DATA].
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">1. Administrator danych osobowych</h2>
                    <p className="text-gray-700 mb-2">
                      1.1. Administratorem danych osobowych Użytkowników Serwisu GabinetShare jest [NAZWA FIRMY], z siedzibą przy [ADRES], wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego pod numerem [NUMER KRS], NIP [NUMER NIP], REGON [NUMER REGON].
                    </p>
                    <p className="text-gray-700">
                      1.2. W sprawie ochrony danych osobowych można skontaktować się z Administratorem poprzez adres e-mail: kontakt@gabinetshare.pl lub pisemnie na adres siedziby Administratora.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">2. Cele i podstawy przetwarzania</h2>
                    <p className="text-gray-700 mb-2">
                      2.1. Dane osobowe Użytkowników są przetwarzane w następujących celach:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Świadczenia usług drogą elektroniczną</li>
                      <li>Realizacji umowy o korzystanie z Serwisu</li>
                      <li>Obsługi konta użytkownika</li>
                      <li>Obsługi płatności i wystawiania dokumentów księgowych</li>
                      <li>Rozpatrywania skarg i reklamacji</li>
                      <li>Kontaktu z Użytkownikiem</li>
                      <li>Marketingu bezpośredniego</li>
                      <li>Analitycznych i statystycznych</li>
                      <li>Dochodzenia lub obrony przed roszczeniami</li>
                    </ul>
                    <p className="text-gray-700 mt-2">
                      2.2. Podstawą prawną przetwarzania danych osobowych jest:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Niezbędność do wykonania umowy (art. 6 ust. 1 lit. b RODO)</li>
                      <li>Prawnie uzasadniony interes Administratora (art. 6 ust. 1 lit. f RODO)</li>
                      <li>Zgoda Użytkownika (art. 6 ust. 1 lit. a RODO)</li>
                      <li>Obowiązek prawny ciążący na Administratorze (art. 6 ust. 1 lit. c RODO)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">3. Odbiorcy danych</h2>
                    <p className="text-gray-700 mb-2">
                      3.1. Dane osobowe Użytkowników mogą być przekazywane następującym kategoriom odbiorców:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Dostawcom usług IT</li>
                      <li>Dostawcom usług księgowych</li>
                      <li>Dostawcom usług płatności elektronicznych</li>
                      <li>Dostawcom usług marketingowych</li>
                      <li>Doradcom prawnym i konsultantom</li>
                      <li>Organom publicznym, gdy wymagają tego przepisy prawa</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">4. Okres przechowywania danych</h2>
                    <p className="text-gray-700 mb-2">
                      4.1. Dane osobowe Użytkowników będą przechowywane przez okres:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Obowiązywania umowy (korzystania z Serwisu)</li>
                      <li>Do momentu przedawnienia roszczeń wynikających z umowy</li>
                      <li>Do momentu wygaśnięcia obowiązku przechowywania danych wynikającego z przepisów prawa</li>
                      <li>Do momentu wycofania zgody, jeśli przetwarzanie odbywa się na podstawie zgody</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">5. Prawa osób, których dane dotyczą</h2>
                    <p className="text-gray-700 mb-2">
                      5.1. W związku z przetwarzaniem danych osobowych, osobom, których dane dotyczą, przysługują następujące prawa:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Prawo dostępu do danych</li>
                      <li>Prawo do sprostowania danych</li>
                      <li>Prawo do usunięcia danych (prawo do bycia zapomnianym)</li>
                      <li>Prawo do ograniczenia przetwarzania</li>
                      <li>Prawo do przenoszenia danych</li>
                      <li>Prawo do sprzeciwu wobec przetwarzania</li>
                      <li>Prawo do cofnięcia zgody w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej cofnięciem</li>
                      <li>Prawo do wniesienia skargi do organu nadzorczego (Prezes Urzędu Ochrony Danych Osobowych)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">6. Informacje o zautomatyzowanym podejmowaniu decyzji</h2>
                    <p className="text-gray-700">
                      6.1. Dane osobowe Użytkowników nie będą podlegać zautomatyzowanemu podejmowaniu decyzji, w tym profilowaniu, które wywołuje skutki prawne lub w podobny sposób istotnie wpływa na Użytkownika.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">7. Bezpieczeństwo danych</h2>
                    <p className="text-gray-700">
                      7.1. Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające bezpieczeństwo danych osobowych, w tym ochronę przed ich nieuprawnionym lub niezgodnym z prawem przetwarzaniem oraz przypadkową utratą, zniszczeniem lub uszkodzeniem.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">8. Zmiany polityki prywatności</h2>
                    <p className="text-gray-700">
                      8.1. Administrator zastrzega sobie prawo do zmiany niniejszej Polityki Prywatności. Zmiany wchodzą w życie po upływie 14 dni od daty ich publikacji w Serwisie. O zmianach Użytkownicy zostaną poinformowani za pośrednictwem poczty elektronicznej lub poprzez komunikat w Serwisie.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="cookies">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">1. Co to są pliki cookies?</h2>
                    <p className="text-gray-700">
                      Cookies to małe pliki tekstowe przechowywane na urządzeniu końcowym Użytkownika (komputer, tablet, smartfon) podczas przeglądania stron internetowych. Pliki te pozwalają rozpoznać urządzenie Użytkownika i odpowiednio wyświetlić stronę internetową dostosowaną do jego indywidualnych preferencji.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">2. Rodzaje plików cookies</h2>
                    <p className="text-gray-700 mb-2">
                      2.1. W Serwisie wykorzystywane są następujące rodzaje plików cookies:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li><strong>Cookies niezbędne</strong> - pliki konieczne do prawidłowego funkcjonowania Serwisu, umożliwiające korzystanie z dostępnych w Serwisie usług.</li>
                      <li><strong>Cookies funkcjonalne</strong> - pliki umożliwiające zapamiętanie wybranych przez Użytkownika ustawień i dostosowanie Serwisu do jego potrzeb.</li>
                      <li><strong>Cookies analityczne</strong> - pliki umożliwiające zbieranie informacji o sposobie korzystania z Serwisu przez Użytkownika.</li>
                      <li><strong>Cookies marketingowe</strong> - pliki umożliwiające dostarczanie Użytkownikowi treści marketingowych dostosowanych do jego zainteresowań.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">3. Cel wykorzystania plików cookies</h2>
                    <p className="text-gray-700 mb-2">
                      3.1. Pliki cookies wykorzystywane są w celu:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Dostosowania zawartości Serwisu do preferencji Użytkownika</li>
                      <li>Optymalizacji korzystania z Serwisu</li>
                      <li>Utrzymania sesji Użytkownika po zalogowaniu</li>
                      <li>Tworzenia statystyk oglądalności Serwisu</li>
                      <li>Dostarczania treści reklamowych dostosowanych do preferencji Użytkownika</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">4. Okres przechowywania plików cookies</h2>
                    <p className="text-gray-700 mb-2">
                      4.1. W Serwisie wykorzystywane są dwa typy plików cookies ze względu na czas ich przechowywania:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li><strong>Cookies sesyjne</strong> - pliki tymczasowe, które są przechowywane na urządzeniu Użytkownika do momentu opuszczenia Serwisu lub zamknięcia przeglądarki.</li>
                      <li><strong>Cookies stałe</strong> - pliki przechowywane na urządzeniu Użytkownika przez określony czas lub do momentu ich usunięcia przez Użytkownika.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">5. Podmioty trzecie</h2>
                    <p className="text-gray-700">
                      5.1. Pliki cookies zamieszczane w urządzeniu końcowym Użytkownika mogą być wykorzystywane również przez współpracujące z nami podmioty trzecie, w tym:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Google Analytics</li>
                      <li>Facebook</li>
                      <li>Dostawcy systemów płatności</li>
                      <li>Dostawcy systemów chatowych</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">6. Zarządzanie plikami cookies</h2>
                    <p className="text-gray-700 mb-2">
                      6.1. Użytkownik może w każdym momencie zmienić ustawienia dotyczące plików cookies za pomocą ustawień przeglądarki internetowej.
                    </p>
                    <p className="text-gray-700 mb-2">
                      6.2. W celu zarządzania ustawieniami cookies należy wybrać z listy poniżej przeglądarkę internetową, której używa Użytkownik i postępować zgodnie z instrukcjami:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Internet Explorer</li>
                      <li>Chrome</li>
                      <li>Safari</li>
                      <li>Firefox</li>
                      <li>Opera</li>
                      <li>Edge</li>
                    </ul>
                    <p className="text-gray-700 mt-2">
                      6.3. Ograniczenie stosowania plików cookies może wpłynąć na niektóre funkcjonalności dostępne w Serwisie.
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-3">7. Zmiany polityki cookies</h2>
                    <p className="text-gray-700">
                      7.1. Administrator zastrzega sobie prawo do zmiany niniejszej Polityki Cookies. Zmiany wchodzą w życie po upływie 14 dni od daty ich publikacji w Serwisie.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="text-center text-gray-600 text-sm">
            <p>Ostatnia aktualizacja: [DATA]</p>
            <p className="mt-2">W razie pytań dotyczących regulaminu lub polityki prywatności, prosimy o kontakt na adres:</p>
            <p className="font-medium">kontakt@gabinetshare.pl</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsPage;
