
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [accountType, setAccountType] = useState<"owner" | "therapist" | "free">("therapist");
  
  const location = useLocation();

  useEffect(() => {
    // Extract plan from URL params (if any)
    const params = new URLSearchParams(location.search);
    const plan = params.get("plan");
    
    if (plan === "owner") {
      setAccountType("owner");
    } else if (plan === "therapist") {
      setAccountType("therapist");
    } else if (plan === "free") {
      setAccountType("free");
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password, confirmPassword, acceptTerms, accountType });
    // Tu będzie logika rejestracji
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
                  onValueChange={(value) => setAccountType(value as "owner" | "therapist" | "free")} 
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                    <RadioGroupItem value="owner" id="owner" />
                    <Label htmlFor="owner" className="flex flex-col cursor-pointer w-full">
                      <span className="font-medium">Właściciel gabinetu</span>
                      <span className="text-sm text-gray-500">Zarządzaj gabinetem i wynajmuj powierzchnię</span>
                    </Label>
                    <span className="font-medium text-therapy-600">50 zł/mies.</span>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                    <RadioGroupItem value="therapist" id="therapist" />
                    <Label htmlFor="therapist" className="flex flex-col cursor-pointer w-full">
                      <span className="font-medium">Terapeuta z kalendarzem</span>
                      <span className="text-sm text-gray-500">Pełny dostęp do rezerwacji i kalendarza wizyt</span>
                    </Label>
                    <span className="font-medium text-therapy-600">25 zł/mies.</span>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
                    <RadioGroupItem value="free" id="free" />
                    <Label htmlFor="free" className="flex flex-col cursor-pointer w-full">
                      <span className="font-medium">Wizytówka terapeuty</span>
                      <span className="text-sm text-gray-500">Podstawowa wizytówka bez kalendarza</span>
                    </Label>
                    <span className="font-medium text-green-600">Za darmo</span>
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
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                  required
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
              
              <Button className="w-full bg-therapy-600 hover:bg-therapy-700" type="submit">
                {accountType === "free" ? "Utwórz wizytówkę" : "Rozpocznij okres próbny"}
              </Button>
              
              {accountType !== "free" && (
                <p className="text-xs text-center text-gray-500">
                  14 dni za darmo, bez automatycznego przedłużenia
                </p>
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
