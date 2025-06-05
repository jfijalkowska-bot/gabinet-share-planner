
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmbedPreviewProps {
  type: 'calendar' | 'profile';
  therapistId: string;
  customization: {
    width: number;
    height: number;
    theme: 'light' | 'dark' | 'auto';
    language: 'pl' | 'en';
    style: 'minimal' | 'full' | 'compact';
    showHeader: boolean;
    primaryColor: string;
  };
}

const EmbedPreview: React.FC<EmbedPreviewProps> = ({ type, therapistId, customization }) => {
  const getPreviewUrl = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      theme: customization.theme,
      language: customization.language,
      style: customization.style,
      showHeader: customization.showHeader.toString(),
      primaryColor: encodeURIComponent(customization.primaryColor),
    });
    
    return `${baseUrl}/${type}/embed/${therapistId}?${params.toString()}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Podgląd na żywo</span>
          <span className="text-sm font-normal text-gray-500">
            ({customization.width}px × {customization.height}px)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
          <div 
            className="mx-auto bg-gray-100 border rounded-lg overflow-hidden shadow-sm"
            style={{ 
              width: Math.min(customization.width, 600), 
              height: Math.min(customization.height, 400) 
            }}
          >
            <iframe
              src={getPreviewUrl()}
              width="100%"
              height="100%"
              frameBorder="0"
              className="rounded-lg"
              title={`Podgląd ${type === 'calendar' ? 'kalendarza' : 'wizytówki'}`}
            />
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Tak będzie wyglądać {type === 'calendar' ? 'kalendarz' : 'wizytówka'} na Twojej stronie
            </p>
            {customization.width > 600 && (
              <p className="text-xs text-orange-600 mt-1">
                * Podgląd przeskalowany - rzeczywista szerokość: {customization.width}px
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmbedPreview;
