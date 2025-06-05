
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface EmbedCustomizationProps {
  type: 'calendar' | 'profile';
  customization: {
    width: number;
    height: number;
    theme: 'light' | 'dark' | 'auto';
    language: 'pl' | 'en';
    style: 'minimal' | 'full' | 'compact';
    showHeader: boolean;
    primaryColor: string;
  };
  onCustomizationChange: (customization: any) => void;
}

const EmbedCustomization: React.FC<EmbedCustomizationProps> = ({ 
  type, 
  customization, 
  onCustomizationChange 
}) => {
  const updateCustomization = (key: string, value: any) => {
    onCustomizationChange({
      ...customization,
      [key]: value
    });
  };

  const colorOptions = [
    { value: '#0EA5E9', label: 'Niebieski' },
    { value: '#10B981', label: 'Zielony' },
    { value: '#8B5CF6', label: 'Fioletowy' },
    { value: '#F59E0B', label: 'Pomarańczowy' },
    { value: '#EF4444', label: 'Czerwony' },
  ];

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-gray-50">
      <h4 className="font-semibold text-lg">Opcje dostosowania</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Szerokość (px)</Label>
          <div className="px-3">
            <Slider
              value={[customization.width]}
              onValueChange={(value) => updateCustomization('width', value[0])}
              max={800}
              min={300}
              step={50}
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">{customization.width}px</div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Wysokość (px)</Label>
          <div className="px-3">
            <Slider
              value={[customization.height]}
              onValueChange={(value) => updateCustomization('height', value[0])}
              max={type === 'calendar' ? 800 : 600}
              min={type === 'calendar' ? 400 : 200}
              step={50}
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">{customization.height}px</div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Styl</Label>
          <Select value={customization.style} onValueChange={(value) => updateCustomization('style', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minimal">Minimalistyczny</SelectItem>
              <SelectItem value="full">Pełny</SelectItem>
              <SelectItem value="compact">Kompaktowy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Motyw</Label>
          <Select value={customization.theme} onValueChange={(value) => updateCustomization('theme', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Jasny</SelectItem>
              <SelectItem value="dark">Ciemny</SelectItem>
              <SelectItem value="auto">Automatyczny</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Język</Label>
          <Select value={customization.language} onValueChange={(value) => updateCustomization('language', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pl">Polski</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Kolor główny</Label>
          <Select value={customization.primaryColor} onValueChange={(value) => updateCustomization('primaryColor', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: color.value }}
                    />
                    {color.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="show-header"
          checked={customization.showHeader}
          onCheckedChange={(checked) => updateCustomization('showHeader', checked)}
        />
        <Label htmlFor="show-header">Pokaż nagłówek</Label>
      </div>
    </div>
  );
};

export default EmbedCustomization;
