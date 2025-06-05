
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "@/components/ui/use-toast";

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

const PROFICIENCY_LEVELS = [
  { value: "native", label: "Ojczysty" },
  { value: "fluent", label: "Płynny" },
  { value: "intermediate", label: "Średniozaawansowany" },
  { value: "basic", label: "Podstawowy" },
];

const LanguageManagement = () => {
  const { user } = useAuth();
  const [languages, setLanguages] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedProficiency, setSelectedProficiency] = useState("fluent");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchLanguages();
    }
  }, [user]);

  const fetchLanguages = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('therapist_languages')
      .select('*')
      .eq('therapist_id', user.id);

    if (error) {
      console.error('Error fetching languages:', error);
    } else {
      setLanguages(data || []);
    }
  };

  const addLanguage = async () => {
    if (!user || !selectedLanguage) return;

    setLoading(true);
    const languageName = LANGUAGES.find(l => l.code === selectedLanguage)?.name || selectedLanguage;

    const { error } = await supabase
      .from('therapist_languages')
      .insert({
        therapist_id: user.id,
        language_code: selectedLanguage,
        language_name: languageName,
        proficiency_level: selectedProficiency
      });

    if (error) {
      if (error.code === '23505') {
        toast({
          title: "Błąd",
          description: "Ten język jest już dodany",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Błąd",
          description: "Nie udało się dodać języka",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Sukces",
        description: "Język został dodany",
      });
      setSelectedLanguage("");
      fetchLanguages();
    }
    setLoading(false);
  };

  const removeLanguage = async (languageId: string) => {
    const { error } = await supabase
      .from('therapist_languages')
      .delete()
      .eq('id', languageId);

    if (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć języka",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sukces",
        description: "Język został usunięty",
      });
      fetchLanguages();
    }
  };

  const availableLanguages = LANGUAGES.filter(
    lang => !languages.some(userLang => userLang.language_code === lang.code)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Języki terapii</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <Badge key={language.id} variant="secondary" className="flex items-center gap-2">
              {language.language_name} ({PROFICIENCY_LEVELS.find(p => p.value === language.proficiency_level)?.label})
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0"
                onClick={() => removeLanguage(language.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>

        {availableLanguages.length > 0 && (
          <div className="flex gap-2">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Wybierz język" />
              </SelectTrigger>
              <SelectContent>
                {availableLanguages.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedProficiency} onValueChange={setSelectedProficiency}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROFICIENCY_LEVELS.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={addLanguage} 
              disabled={!selectedLanguage || loading}
              size="sm"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LanguageManagement;
