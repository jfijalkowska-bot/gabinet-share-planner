import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

const OfficeProfileForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [office, setOffice] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    capacity: 1,
    price_per_hour: 0,
    equipment: [] as string[],
    style: "",
    color_scheme: "",
    images: [] as string[],
    cleaning_included: false
  });

  useEffect(() => {
    if (user) {
      fetchOfficeProfile();
    }
  }, [user]);

  const fetchOfficeProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('office_profiles')
      .select('*')
      .eq('owner_id', user.id)
      .single();

    if (data) {
      setOffice(data);
    } else if (error && error.code !== 'PGRST116') {
      console.error('Error fetching office profile:', error);
    }
  };

  const saveOfficeProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('office_profiles')
        .upsert({
          ...office,
          owner_id: user.id,
          updated_at: new Date().toISOString()
        });

      if (error) {
        toast({
          title: "Błąd",
          description: "Nie udało się zapisać profilu gabinetu. Spróbuj ponownie.",
          variant: "destructive"
        });
        console.error('Error saving office profile:', error);
      } else {
        toast({
          title: "Sukces",
          description: "Profil gabinetu został zapisany pomyślnie!"
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Błąd",
        description: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const availableEquipment = [
    "Fotele", "Stolik", "Chusteczki", "Łazienka z natryskiem", 
    "Klimatyzacja", "Internet Wi-Fi", "Biurko", "Krzesła", 
    "Tablica/Flipchart", "Projektор", "Kuchnia", "Lodówka", "Kuchenka mikrofalowa"
  ];

  const styleOptions = [
    { value: "nowoczesny", label: "Nowoczesny" },
    { value: "klasyczny", label: "Klasyczny" }, 
    { value: "skandynawski", label: "Skandynawski" },
    { value: "minimalistyczny", label: "Minimalistyczny" },
    { value: "przytulny", label: "Przytulny" },
    { value: "profesjonalny", label: "Profesjonalny" }
  ];

  const colorOptions = [
    { value: "jasny_spokojny", label: "Jasny i spokojny" },
    { value: "ciepły_przytulny", label: "Ciepły i przytulny" },
    { value: "niebieski_uspokajający", label: "Niebieski uspokajający" },
    { value: "zielony_naturalny", label: "Zielony naturalny" },
    { value: "beżowy_neutralny", label: "Beżowy neutralny" },
    { value: "szary_elegancki", label: "Szary elegancki" }
  ];

  const toggleEquipment = (equipment: string) => {
    setOffice(prev => ({
      ...prev,
      equipment: prev.equipment.includes(equipment)
        ? prev.equipment.filter(e => e !== equipment)
        : [...prev.equipment, equipment]
    }));
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Profil gabinetu do wynajęcia
        </CardTitle>
        <p className="text-center text-gray-600">
          Dodaj swój gabinet do oferty i zarabiaj na wynajmie
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Nazwa gabinetu *</Label>
            <Input
              id="name"
              value={office.name}
              onChange={(e) => setOffice({ ...office, name: e.target.value })}
              placeholder="np. Gabinet Psychoterapii Centrum"
            />
          </div>

          <div>
            <Label htmlFor="city">Miasto *</Label>
            <Input
              id="city"
              value={office.city}
              onChange={(e) => setOffice({ ...office, city: e.target.value })}
              placeholder="np. Warszawa"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Adres *</Label>
          <Input
            id="address"
            value={office.address}
            onChange={(e) => setOffice({ ...office, address: e.target.value })}
            placeholder="np. ul. Marszałkowska 123/45"
          />
        </div>

        <div>
          <Label htmlFor="description">Opis gabinetu</Label>
          <Textarea
            id="description"
            value={office.description}
            onChange={(e) => setOffice({ ...office, description: e.target.value })}
            placeholder="Opisz swój gabinet, atmosferę, udogodnienia..."
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="capacity">Pojemność (liczba osób)</Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              value={office.capacity}
              onChange={(e) => setOffice({ ...office, capacity: parseInt(e.target.value) || 1 })}
            />
          </div>

          <div>
            <Label htmlFor="price">Cena za godzinę (PLN)</Label>
            <Input
              id="price"
              type="number"
              min="0"
              value={office.price_per_hour}
              onChange={(e) => setOffice({ ...office, price_per_hour: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <Checkbox
            id="cleaning_included"
            checked={office.cleaning_included}
            onCheckedChange={(checked) => setOffice({ ...office, cleaning_included: checked as boolean })}
          />
          <Label htmlFor="cleaning_included" className="cursor-pointer">
            Cena zawiera sprzątanie
          </Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Styl gabinetu</Label>
            <Select value={office.style} onValueChange={(value) => setOffice({ ...office, style: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz styl" />
              </SelectTrigger>
              <SelectContent>
                {styleOptions.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Kolorystyka</Label>
            <Select value={office.color_scheme} onValueChange={(value) => setOffice({ ...office, color_scheme: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Wybierz kolorystykę" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    {color.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-base font-medium mb-3 block">Wyposażenie gabinetu</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableEquipment.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox
                  id={item}
                  checked={office.equipment.includes(item)}
                  onCheckedChange={() => toggleEquipment(item)}
                />
                <Label htmlFor={item} className="cursor-pointer text-sm">
                  {item}
                </Label>
              </div>
            ))}
          </div>
          
          {office.equipment.length > 0 && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {office.equipment.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          onClick={saveOfficeProfile}
          disabled={loading || !office.name || !office.city || !office.address}
          className="w-full bg-therapy-600 hover:bg-therapy-700"
        >
          {loading ? "Zapisywanie..." : "Zapisz profil gabinetu"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default OfficeProfileForm;