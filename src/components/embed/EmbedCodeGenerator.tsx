
import React from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface EmbedCodeGeneratorProps {
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

const EmbedCodeGenerator: React.FC<EmbedCodeGeneratorProps> = ({ 
  type, 
  therapistId, 
  customization 
}) => {
  const generateEmbedCode = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      theme: customization.theme,
      language: customization.language,
      style: customization.style,
      showHeader: customization.showHeader.toString(),
      primaryColor: encodeURIComponent(customization.primaryColor),
    });
    
    return `<iframe 
  src="${baseUrl}/${type}/embed/${therapistId}?${params.toString()}"
  width="${customization.width}px" 
  height="${customization.height}px"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
  style="border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
></iframe>`;
  };

  const generateWordPressShortcode = () => {
    const params = Object.entries(customization)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
    
    return `[terapisto_${type} therapist_id="${therapistId}" ${params}]`;
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Skopiowano!",
      description: "Kod został skopiowany do schowka.",
    });
  };

  const downloadAsFile = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const embedCode = generateEmbedCode();
  const wordpressCode = generateWordPressShortcode();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold">Kod HTML</h4>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(embedCode)}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Kopiuj
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadAsFile(embedCode, `${type}-embed.html`)}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Pobierz
            </Button>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md border">
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap text-gray-800">
            {embedCode}
          </pre>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold">WordPress Shortcode</h4>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(wordpressCode)}
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            Kopiuj
          </Button>
        </div>
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap text-blue-800">
            {wordpressCode}
          </pre>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          * Wymaga instalacji wtyczki Terapisto dla WordPress
        </p>
      </div>
    </div>
  );
};

export default EmbedCodeGenerator;
