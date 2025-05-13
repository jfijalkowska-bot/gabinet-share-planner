
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [accountType, setAccountType] = useState<"owner" | "therapist" | "free" | "client">("therapist");
  const [loading, setLoading] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get("plan");
    const ref = params.get("ref");
    
    if (ref) {
      setReferralCode(ref);
    }
    
    if (plan === "owner") {
      setAccountType("owner");
    } else if (plan === "therapist") {
      setAccountType("therapist");
    } else if (plan === "free") {
      setAccountType("free");
    } else if (plan === "client") {
      setAccountType("client");
    }
  }, [location]);

  const toggleDetails = (type: string) => {
    if (expandedDetails === type) {
      setExpandedDetails(null);
    } else {
      setExpandedDetails(type);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Błąd rejestracji",
        description: "Hasła nie są identyczne",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Błąd rejestracji",
        description: "Musisz zaakceptować regulamin i politykę prywatności",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const [firstName, ...lastNameParts] = name.trim().split(' ');
      const lastName = lastNameParts.join(' ');

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName || '',
            account_type: accountType,
            full_name: name.trim(),
            referral_code: referralCode
          }
        }
      });

      if (error) {
        toast({
          title: "Błąd rejestracji",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // If user is a client, create their profile entry
        if (accountType === "client" && data.user) {
          const { error: profileError } = await supabase
            .from('client_profiles')
            .insert({ id: data.user.id });
          
          if (profileError) {
            console.error("Error creating client profile:", profileError);
          }
        }
        
        toast({
          title: "Rejestracja pomyślna",
          description: "Sprawdź swoją skrzynkę email, aby potwierdzić konto.",
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        title: "Wystąpił błąd",
        description: "Spróbuj ponownie później",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const planDetails = {
    owner: [
      "Zarządzanie gabinetem",
      "Wynajmowanie powierzchni",
      "Obsługa rezerwacji klientów",
      "Kalendarz wizyt",
      "Wizytówka w cenie",
      "Panel administracyjny",
      "Raportowanie i statystyki"
    ],
    therapist: [
      "Pełny dostęp do kalendarza wizyt",
      "Zarządzanie rezerwacjami",
      "Wizytówka terapeuty",
      "Powiadomienia o wizytach",
      "Historia spotkań z klientami"
    ],
    free: [
      "Podstawowa wizytówka terapeuty",
      "Profil w katalogu specjalistów",
      "Możliwość kontaktu przez platformę",
      "Brak ograniczeń czasowych",
      "Opcja rozszerzenia w przyszłości"
    ],
    client: [
      "Rezerwacja wizyt u specjalistów",
      "Wystawianie ocen i opinii",
      "Przeglądanie profili terapeutów",
      "Płatności online za wizyty",
      "Powiadomienia o terminach",
      "Historia wizyt"
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-therapy-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-therapy-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Utwórz konto w GabinetShare</CardTitle>
            <CardDescription>
              Wprowadź swoje dane, aby zarejestrować się w systemie
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4 mb-6">
                <Label className="text-base font-medium">Wybierz rodzaj konta</Label>
                <RadioGroup 
                  defaultValue={accountType} 
                  onValueChange={(value) => setAccountType(value as "owner" | "therapist" | "free" | "client")} 
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="flex flex-col border rounded-md p-3 hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="owner" id="owner" />
                      <Label htmlFor="owner" className="flex flex-col cursor-pointer w-full">
                        <span className="font-medium">Właściciel gabinetu</span>
                        <span className="text-sm text-gray-500">Zarządzaj gabinetem, wynajmuj powierzchnię i obsługuj rezerwacje swoich klientów</span>
                        <span className="text-sm text-gray-500">Kalendarz wizyt i wizytówka w cenie</span>
                      </Label>
                      <span className="font-medium text-therapy-600">59 zł/mies.</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 text-xs flex items-center w-fit"
                      onClick={() => toggleDetails("owner")}
                    >
                      {expandedDetails === "owner" ? "Ukryj szczegóły" : "Zobacz co zawiera"} 
                      {expandedDetails === "owner" ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
                    </Button>
                    {expandedDetails === "owner" && (
                      <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                        {planDetails.owner.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-col border rounded-md p-3 hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="therapist" id="therapist" />
                      <Label htmlFor="therapist" className="flex flex-col cursor-pointer w-full">
                        <span className="font-medium">Terapeuta z kalendarzem</span>
                        <span className="text-sm text-gray-500">Pełny dostęp do rezerwacji, kalendarza wizyt i wizytówki w cenie</span>
                      </Label>
                      <span className="font-medium text-therapy-600">49 zł/mies.</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 text-xs flex items-center w-fit"
                      onClick={() => toggleDetails("therapist")}
                    >
                      {expandedDetails === "therapist" ? "Ukryj szczegóły" : "Zobacz co zawiera"}
                      {expandedDetails === "therapist" ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
                    </Button>
                    {expandedDetails === "therapist" && (
                      <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                        {planDetails.therapist.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-col border rounded-md p-3 hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="free" id="free" />
                      <Label htmlFor="free" className="flex flex-col cursor-pointer w-full">
                        <span className="font-medium">Wizytówka terapeuty</span>
                        <span className="text-sm text-gray-500">Podstawowa wizytówka bez kalendarza</span>
                      </Label>
                      <span className="font-medium text-green-600">49 zł jednorazowo</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 text-xs flex items-center w-fit"
                      onClick={() => toggleDetails("free")}
                    >
                      {expandedDetails === "free" ? "Ukryj szczegóły" : "Zobacz co zawiera"}
                      {expandedDetails === "free" ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
                    </Button>
                    {expandedDetails === "free" && (
                      <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                        {planDetails.free.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-col border rounded-md p-3 hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="client" id="client" />
                      <Label htmlFor="client" className="flex flex-col cursor-pointer w-full">
                        <span className="font-medium">Klient (przeglądaj za darmo)</span>
                        <span className="text-sm text-gray-500">Rezerwuj wizyty i wystawiaj opinie terapeutom</span>
                      </Label>
                      <span className="font-medium text-green-600">Za darmo</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 text-xs flex items-center w-fit"
                      onClick={() => toggleDetails("client")}
                    >
                      {expandedDetails === "client" ? "Ukryj szczegóły" : "Zobacz co zawiera"}
                      {expandedDetails === "client" ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
                    </Button>
                    {expandedDetails === "client" && (
                      <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                        {planDetails.client.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Imię i nazwisko</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Adres email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="twoj@email.pl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Hasło</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                  required
                  disabled={loading}
                />
                <Label htmlFor="terms" className="text-sm">
                  Akceptuję{" "}
                  <Link to="/terms" className="text-therapy-600 hover:underline">
                    regulamin
                  </Link>{" "}
                  oraz{" "}
                  <Link to="/privacy" className="text-therapy-600 hover:underline">
                    politykę prywatności
                  </Link>
                </Label>
              </div>
              
              <Button className="w-full bg-therapy-600 hover:bg-therapy-700" type="submit" disabled={loading}>
                {loading ? "Rejestracja..." : 
                 accountType === "client" ? "Zarejestruj się za darmo" :
                 accountType === "free" ? "Utwórz wizytówkę za 49 zł" : 
                 "Rozpocznij 30-dniowy okres próbny"}
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                {accountType !== "free" && accountType !== "client" ? 
                  "30 dni za darmo, bez automatycznego przedłużenia. Płatność wymagana po zakończeniu okresu próbnego." : 
                  accountType === "free" ? 
                  "Jednorazowa opłata, bez terminu ważności. Płatność po rejestracji." :
                  "Całkowicie za darmo. Płacisz tylko za wizyty, które rezerwujesz."}
              </p>

              {referralCode && (
                <div className="mt-2 p-2 bg-therapy-50 rounded text-xs text-center text-therapy-700">
                  Rejestrujesz się z programu poleceń. Kod: {referralCode}
                </div>
              )}
            </form>
            
            <div className="mt-6 text-center text-sm">
              Masz już konto?{" "}
              <Link to="/login" className="text-therapy-600 hover:underline font-medium">
                Zaloguj się
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegisterPage;
