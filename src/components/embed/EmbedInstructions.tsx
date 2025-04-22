
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import EmbedWidget from './EmbedWidget';

const EmbedInstructions = () => {
  // TODO: Replace with actual therapist ID from auth context
  const demoTherapistId = "demo-id";

  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">Udostępnianie kalendarza i wizytówki</h2>
        <p className="text-gray-600 mb-6">
          Możesz umieścić swój kalendarz i wizytówkę na własnej stronie internetowej. 
          Poniżej znajdziesz kod do skopiowania dla każdego z widgetów.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Kalendarz online</h3>
          <EmbedWidget type="calendar" therapistId={demoTherapistId} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Wizytówka</h3>
          <EmbedWidget type="profile" therapistId={demoTherapistId} />
        </CardContent>
      </Card>

      <div className="bg-therapy-50 border border-therapy-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Potrzebujesz pomocy?</h3>
        <p className="text-gray-600">
          Jeśli potrzebujesz pomocy przy umieszczeniu kalendarza lub wizytówki na swojej stronie, 
          skontaktuj się z nami lub osobą zajmującą się Twoją stroną internetową.
        </p>
      </div>
    </div>
  );
};

export default EmbedInstructions;
