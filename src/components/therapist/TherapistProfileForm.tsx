
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Sparkle, Star, Video, Languages, GraduationCap } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useSpecializations } from "@/hooks/useTherapistData";

// Therapy approaches - must match search filters
const therapyApproaches = [
  { value: "systemowa", label: "Systemowa" },
  { value: "integracyjny", label: "Integracyjny" },
  { value: "ericsonowska", label: "Ericsonowska" },
  { value: "gestalt", label: "Gestalt" },
  { value: "psychoanaliza", label: "Psychoanaliza" },
  { value: "psychodynamiczna", label: "Psychodynamiczna" },
  { value: "cbt", label: "Poznawczo-behawioralna (CBT)" },
  { value: "schematy", label: "Terapia schematów" },
  { value: "act", label: "ACT" },
  { value: "bioenergetyka", label: "Bioenergetyka Lowena" },
  { value: "bodywork", label: "Praca z ciałem" },
  { value: "inne", label: "Inne" }
];

// Success areas - must match search filters
const successAreas = [
  { value: "depresja", label: "Depresja" },
  { value: "leki", label: "Lęki" },
  { value: "uzaleznienia", label: "Terapia uzależnień" },
  { value: "terapia_par", label: "Terapia par" },
  { value: "terapia_rodzinna", label: "Terapia rodzinna" },
  { value: "terapia_traumy", label: "Terapia traumy" },
  { value: "terapia_dzieci", label: "Terapia dzieci" },
  { value: "terapia_mlodziezy", label: "Terapia młodzieży" },
  { value: "adhd_autyzm", label: "ADHD i Autyzm" },
  { value: "lgbt_plus", label: "LGBT+" },
  { value: "zaburzenia_psychosomatyczne", label: "Zaburzenia psychosomatyczne" },
  { value: "zaburzenia_osobowosci", label: "Zaburzenia osobowości" }
];

// Services - must match search filters
const therapistServices = [
  { id: "individual", label: "Terapia indywidualna" },
  { id: "diagnosis", label: "Diagnoza psychologiczna" },
  { id: "couples", label: "Terapia par" },
  { id: "group", label: "Terapia grupowa" },
  { id: "family", label: "Terapia rodzinna" },
  { id: "crisis", label: "Interwencja kryzysowa" },
  { id: "supportGroup", label: "Grupa wsparcia" },
  { id: "emdr", label: "EMDR" },
  { id: "brainspotting", label: "Brainspotting" },
  { id: "se", label: "SE" },
  { id: "si", label: "Terapia SI" },
  { id: "tre", label: "TRE" },
  { id: "bowen", label: "Terapia Bowena" },
  { id: "accessBars", label: "Access Bars" },
  { id: "craniosacral", label: "Terapia czaszkowo-krzyżowa" },
  { id: "workshops", label: "Warsztaty" }
];

// Languages - must match search filters
const LANGUAGES = [
  { code: "pl", name: "Polski" },
  { code: "en", name: "Angielski" },
  { code: "de", name: "Niemiecki" },
  { code: "fr", name: "Francuski" },
  { code: "es", name: "Hiszpański" },
  { code: "it", name: "Włoski" },
  { code: "ru", name: "Rosyjski" },
  { code: "uk", name: "Ukraiński" },
];

const TherapistProfileForm = () => {
  const { user } = useAuth();
  const specializations = useSpecializations();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    specialization: "",
    experience_years: 0,
    bio: "",
    phone: "",
    price_per_hour: 0,
    avatar_url: "",
    offers_supervisions: false,
    offers_trainings: false,
    offers_practicums: false,
  });
  
  // Extended profile data (stored in separate state for now)
  const [therapyApproach, setTherapyApproach] = useState<string[]>([]);
  const [selectedSuccessAreas, setSelectedSuccessAreas] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [offersOnline, setOffersOnline] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["pl"]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchLanguages();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('therapist_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data) {
      setProfile(data);
    } else if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchLanguages = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('therapist_languages')
      .select('language_code')
      .eq('therapist_id', user.id);

    if (data && data.length > 0) {
      setSelectedLanguages(data.map(l => l.language_code));
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Musisz wybrać zdjęcie do uploadu.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setProfile(prev => ({ ...prev, avatar_url: data.publicUrl }));
      
      toast({
        title: "Sukces",
        description: "Zdjęcie zostało przesłane!",
      });
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Save main profile
      const { error } = await supabase
        .from('therapist_profiles')
        .upsert({
          user_id: user.id,
          ...profile,
        });

      if (error) throw error;

      // Save languages
      // First delete existing
      await supabase
        .from('therapist_languages')
        .delete()
        .eq('therapist_id', user.id);

      // Then insert new
      if (selectedLanguages.length > 0) {
        const languageInserts = selectedLanguages.map(code => ({
          therapist_id: user.id,
          language_code: code,
          language_name: LANGUAGES.find(l => l.code === code)?.name || code,
        }));

        await supabase
          .from('therapist_languages')
          .insert(languageInserts);
      }

      toast({
        title: "Sukces",
        description: "Profil został zapisany!",
      });
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = (value: string, array: string[], setArray: (arr: string[]) => void) => {
    if (array.includes(value)) {
      setArray(array.filter(v => v !== value));
    } else {
      setArray([...array, value]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wizytówka Terapeuty</CardTitle>
        <p className="text-sm text-muted-foreground">
          Uzupełnij wszystkie pola, aby Twoja wizytówka była widoczna w wyszukiwarce
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Avatar section */}
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profile.avatar_url} />
            <AvatarFallback>
              {profile.first_name?.[0]}{profile.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <Label htmlFor="avatar" className="cursor-pointer">
              <div className="flex items-center gap-2 text-sm bg-therapy-600 text-white px-3 py-2 rounded hover:bg-therapy-700">
                <Upload className="h-4 w-4" />
                {uploading ? "Przesyłanie..." : "Zmień zdjęcie"}
              </div>
            </Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
              className="hidden"
            />
          </div>
        </div>

        {/* Basic info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first_name">Imię *</Label>
            <Input
              id="first_name"
              value={profile.first_name}
              onChange={(e) => setProfile(prev => ({ ...prev, first_name: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="last_name">Nazwisko *</Label>
            <Input
              id="last_name"
              value={profile.last_name}
              onChange={(e) => setProfile(prev => ({ ...prev, last_name: e.target.value }))}
            />
          </div>
        </div>

        {/* Specialization */}
        <div>
          <Label>Specjalizacja *</Label>
          <Select 
            value={profile.specialization || ""} 
            onValueChange={(value) => setProfile(prev => ({ ...prev, specialization: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wybierz specjalizację" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((spec) => (
                <SelectItem key={spec.value} value={spec.value}>
                  {spec.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="experience_years">Lata doświadczenia</Label>
            <Input
              id="experience_years"
              type="number"
              value={profile.experience_years}
              onChange={(e) => setProfile(prev => ({ ...prev, experience_years: parseInt(e.target.value) || 0 }))}
            />
          </div>
          <div>
            <Label htmlFor="price_per_hour">Cena za godzinę (PLN) *</Label>
            <Input
              id="price_per_hour"
              type="number"
              value={profile.price_per_hour}
              onChange={(e) => setProfile(prev => ({ ...prev, price_per_hour: parseFloat(e.target.value) || 0 }))}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="bio">Opis / Bio</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
            rows={4}
            placeholder="Opisz swoje doświadczenie, podejście i co wyróżnia Twoją praktykę..."
          />
        </div>

        {/* Therapy Approach */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Sparkle className="h-4 w-4" />
            Nurt terapeutyczny
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {therapyApproaches.map((approach) => (
              <div key={approach.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`approach-${approach.value}`}
                  checked={therapyApproach.includes(approach.value)}
                  onCheckedChange={() => toggleItem(approach.value, therapyApproach, setTherapyApproach)}
                />
                <Label htmlFor={`approach-${approach.value}`} className="cursor-pointer text-sm">
                  {approach.label}
                </Label>
              </div>
            ))}
          </div>
          {therapyApproach.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {therapyApproach.map(v => (
                <Badge key={v} variant="secondary" className="text-xs">
                  {therapyApproaches.find(a => a.value === v)?.label}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Success Areas */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Obszary sukcesów terapeutycznych
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {successAreas.map((area) => (
              <div key={area.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`area-${area.value}`}
                  checked={selectedSuccessAreas.includes(area.value)}
                  onCheckedChange={() => toggleItem(area.value, selectedSuccessAreas, setSelectedSuccessAreas)}
                />
                <Label htmlFor={`area-${area.value}`} className="cursor-pointer text-sm">
                  {area.label}
                </Label>
              </div>
            ))}
          </div>
          {selectedSuccessAreas.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedSuccessAreas.map(v => (
                <Badge key={v} variant="secondary" className="text-xs">
                  {successAreas.find(a => a.value === v)?.label}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Services */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Oferowane usługi
          </Label>
          
          {/* Online sessions highlight */}
          <div className="border rounded-md p-3 bg-blue-50 border-blue-200">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="offers-online"
                checked={offersOnline}
                onCheckedChange={(checked) => setOffersOnline(checked as boolean)}
              />
              <Label htmlFor="offers-online" className="cursor-pointer flex items-center">
                <Video className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">Sesje online</span>
                <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700">Popularne</Badge>
              </Label>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {therapistServices.map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`service-${service.id}`}
                  checked={selectedServices.includes(service.label)}
                  onCheckedChange={() => toggleItem(service.label, selectedServices, setSelectedServices)}
                />
                <Label htmlFor={`service-${service.id}`} className="cursor-pointer text-sm">
                  {service.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            Języki terapii
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {LANGUAGES.map((language) => (
              <div key={language.code} className="flex items-center space-x-2">
                <Checkbox
                  id={`lang-${language.code}`}
                  checked={selectedLanguages.includes(language.code)}
                  onCheckedChange={() => toggleItem(language.code, selectedLanguages, setSelectedLanguages)}
                />
                <Label htmlFor={`lang-${language.code}`} className="cursor-pointer text-sm">
                  {language.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Additional services */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Dodatkowe usługi
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="offers_supervisions"
                checked={profile.offers_supervisions}
                onCheckedChange={(checked) => setProfile(prev => ({ ...prev, offers_supervisions: checked as boolean }))}
              />
              <Label htmlFor="offers_supervisions" className="cursor-pointer">
                Prowadzę superwizje
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="offers_trainings"
                checked={profile.offers_trainings}
                onCheckedChange={(checked) => setProfile(prev => ({ ...prev, offers_trainings: checked as boolean }))}
              />
              <Label htmlFor="offers_trainings" className="cursor-pointer">
                Prowadzę szkolenia
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="offers_practicums"
                checked={profile.offers_practicums}
                onCheckedChange={(checked) => setProfile(prev => ({ ...prev, offers_practicums: checked as boolean }))}
              />
              <Label htmlFor="offers_practicums" className="cursor-pointer">
                Przyjmuję praktykantów
              </Label>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-2">
          <Label htmlFor="phone">Numer telefonu kontaktowego</Label>
          <Input
            id="phone"
            value={profile.phone}
            onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="Tylko Ty widzisz ten numer"
          />
          <p className="text-xs text-muted-foreground">
            Numer telefonu jest widoczny tylko dla Ciebie. Klienci kontaktują się przez portal.
          </p>
        </div>

        <Button 
          onClick={saveProfile} 
          disabled={loading}
          className="w-full bg-therapy-600 hover:bg-therapy-700"
        >
          {loading ? "Zapisywanie..." : "Zapisz wizytówkę"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TherapistProfileForm;
