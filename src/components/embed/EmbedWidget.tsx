
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmbedCustomization from './EmbedCustomization';
import EmbedPreview from './EmbedPreview';
import EmbedCodeGenerator from './EmbedCodeGenerator';
import PlatformInstructions from './PlatformInstructions';

interface EmbedWidgetProps {
  type: 'calendar' | 'profile';
  therapistId: string;
}

const EmbedWidget: React.FC<EmbedWidgetProps> = ({ type, therapistId }) => {
  const [customization, setCustomization] = useState({
    width: type === 'calendar' ? 600 : 400,
    height: type === 'calendar' ? 600 : 400,
    theme: 'light' as const,
    language: 'pl' as const,
    style: 'full' as const,
    showHeader: true,
    primaryColor: '#0EA5E9',
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="customize" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customize">Dostosuj</TabsTrigger>
          <TabsTrigger value="preview">Podgląd</TabsTrigger>
          <TabsTrigger value="code">Kod</TabsTrigger>
          <TabsTrigger value="instructions">Instrukcje</TabsTrigger>
        </TabsList>

        <TabsContent value="customize" className="space-y-4">
          <EmbedCustomization
            type={type}
            customization={customization}
            onCustomizationChange={setCustomization}
          />
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <EmbedPreview
            type={type}
            therapistId={therapistId}
            customization={customization}
          />
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          <EmbedCodeGenerator
            type={type}
            therapistId={therapistId}
            customization={customization}
          />
        </TabsContent>

        <TabsContent value="instructions" className="space-y-4">
          <PlatformInstructions type={type} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmbedWidget;
