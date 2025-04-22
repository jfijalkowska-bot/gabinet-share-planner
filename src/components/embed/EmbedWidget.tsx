
import React from 'react';
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmbedWidgetProps {
  type: 'calendar' | 'profile';
  therapistId: string;
}

const getEmbedCode = (type: 'calendar' | 'profile', therapistId: string) => {
  const baseUrl = window.location.origin;
  return `<iframe 
  src="${baseUrl}/${type}/embed/${therapistId}"
  width="100%" 
  height="${type === 'calendar' ? '600px' : '400px'}"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
></iframe>`;
};

const EmbedWidget: React.FC<EmbedWidgetProps> = ({ type, therapistId }) => {
  const embedCode = getEmbedCode(type, therapistId);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Kod do umieszczenia na stronie
        </h3>
        <Button 
          variant="outline" 
          onClick={copyToClipboard}
          className="flex items-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          Kopiuj kod
        </Button>
      </div>
      <div className="bg-gray-50 p-4 rounded-md">
        <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
          {embedCode}
        </pre>
      </div>
      <div className="text-sm text-gray-600">
        <p>Aby umieścić {type === 'calendar' ? 'kalendarz' : 'wizytówkę'} na swojej stronie:</p>
        <ol className="list-decimal ml-4 mt-2 space-y-2">
          <li>Skopiuj powyższy kod</li>
          <li>Wklej go w miejscu na swojej stronie, gdzie chcesz by się wyświetlał {type === 'calendar' ? 'kalendarz' : 'profil'}</li>
          <li>Zapisz zmiany na swojej stronie</li>
        </ol>
      </div>
    </div>
  );
};

export default EmbedWidget;
