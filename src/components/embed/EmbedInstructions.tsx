
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Lightbulb } from "lucide-react";
import EmbedWidget from './EmbedWidget';

const EmbedInstructions = () => {
  // TODO: Replace with actual therapist ID from auth context
  const demoTherapistId = "demo-id";

  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">Udostępnianie kalendarza i wizytówki</h2>
        <p className="text-gray-600 mb-6">
          Umieść swój kalendarz i wizytówkę na własnej stronie internetowej. 
          Możesz w pełni dostosować wygląd i funkcjonalność do swoich potrzeb.
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Ważne:</strong> Osadzony kalendarz będzie automatycznie synchronizowany z Twoim kontem. 
          Wszystkie zmiany w dostępności pojawią się natychmiast na Twojej stronie.
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            📅 Kalendarz online
          </h3>
          <p className="text-gray-600 mb-4">
            Pozwól klientom rezerwować wizyty bezpośrednio z Twojej strony internetowej.
          </p>
          <EmbedWidget type="calendar" therapistId={demoTherapistId} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            👤 Wizytówka
          </h3>
          <p className="text-gray-600 mb-4">
            Zaprezentuj swoje kwalifikacje i dane kontaktowe w atrakcyjny sposób.
          </p>
          <EmbedWidget type="profile" therapistId={demoTherapistId} />
        </CardContent>
      </Card>

      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          <strong>Wskazówka:</strong> Możesz umieścić kalendarz i wizytówkę na różnych stronach 
          lub połączyć je na jednej stronie dla kompletnego rozwiązania.
        </AlertDescription>
      </Alert>

      <div className="bg-therapy-50 border border-therapy-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Potrzebujesz pomocy?</h3>
        <p className="text-gray-600 mb-4">
          Jeśli potrzebujesz pomocy przy umieszczeniu kalendarza lub wizytówki na swojej stronie, 
          skontaktuj się z nami lub osobą zajmującą się Twoją stroną internetową.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white rounded-full text-sm border">📧 support@terapisto.pl</span>
          <span className="px-3 py-1 bg-white rounded-full text-sm border">📞 +48 123 456 789</span>
          <span className="px-3 py-1 bg-white rounded-full text-sm border">💬 Chat na żywo</span>
        </div>
      </div>
    </div>
  );
};

export default EmbedInstructions;
