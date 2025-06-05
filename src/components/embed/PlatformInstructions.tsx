
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface PlatformInstructionsProps {
  type: 'calendar' | 'profile';
}

const PlatformInstructions: React.FC<PlatformInstructionsProps> = ({ type }) => {
  const widgetName = type === 'calendar' ? 'kalendarz' : 'wizytówkę';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Instrukcje dla różnych platform</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="wordpress">WordPress</TabsTrigger>
            <TabsTrigger value="wix">Wix</TabsTrigger>
            <TabsTrigger value="squarespace">Squarespace</TabsTrigger>
            <TabsTrigger value="shopify">Shopify</TabsTrigger>
          </TabsList>

          <TabsContent value="html" className="space-y-4">
            <div>
              <Badge variant="secondary" className="mb-2">Strony HTML/CSS</Badge>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Skopiuj kod HTML z powyższej sekcji</li>
                <li>Otwórz plik HTML swojej strony w edytorze</li>
                <li>Wklej kod w miejscu gdzie ma się pojawić {widgetName}</li>
                <li>Zapisz plik i prześlij na serwer</li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="wordpress" className="space-y-4">
            <div>
              <Badge variant="secondary" className="mb-2">WordPress</Badge>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium">Metoda 1: Blok HTML</h5>
                  <ol className="list-decimal list-inside space-y-1 text-sm ml-2">
                    <li>Przejdź do edytora strony/wpisu</li>
                    <li>Dodaj blok "HTML"</li>
                    <li>Wklej kod HTML</li>
                    <li>Opublikuj stronę</li>
                  </ol>
                </div>
                <div>
                  <h5 className="font-medium">Metoda 2: Shortcode (zalecane)</h5>
                  <ol className="list-decimal list-inside space-y-1 text-sm ml-2">
                    <li>Zainstaluj wtyczkę Terapisto</li>
                    <li>Wklej shortcode w treści strony</li>
                    <li>Opublikuj stronę</li>
                  </ol>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wix" className="space-y-4">
            <div>
              <Badge variant="secondary" className="mb-2">Wix</Badge>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Przejdź do edytora Wix</li>
                <li>Kliknij "Dodaj" → "Więcej" → "HTML iframe"</li>
                <li>Wklej kod HTML w ustawieniach elementu</li>
                <li>Dostosuj rozmiar i pozycję</li>
                <li>Opublikuj stronę</li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="squarespace" className="space-y-4">
            <div>
              <Badge variant="secondary" className="mb-2">Squarespace</Badge>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Edytuj stronę w Squarespace</li>
                <li>Dodaj blok "Code"</li>
                <li>Wklej kod HTML</li>
                <li>Kliknij "Apply"</li>
                <li>Opublikuj stronę</li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="shopify" className="space-y-4">
            <div>
              <Badge variant="secondary" className="mb-2">Shopify</Badge>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Przejdź do "Online Store" → "Pages"</li>
                <li>Edytuj stronę lub utwórz nową</li>
                <li>Przejdź do widoku HTML (&lt;/&gt;)</li>
                <li>Wklej kod HTML</li>
                <li>Zapisz stronę</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-2">💡 Wskazówki:</h5>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Upewnij się, że {widgetName} ma wystarczająco miejsca na stronie</li>
            <li>• Przetestuj na urządzeniach mobilnych</li>
            <li>• Dostosuj kolory do stylu swojej strony</li>
            <li>• Umieść {widgetName} w łatwo dostępnym miejscu</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformInstructions;
