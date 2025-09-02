
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import RegistrationCard from "@/components/registration/RegistrationCard";

type AccountType = "owner" | "therapist" | "therapist-seeking" | "free" | "client";

interface ServiceOfferings {
  supervisions: boolean;
  trainings: boolean;
  practicums: boolean;
}

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>("therapist");
  const [serviceOfferings, setServiceOfferings] = useState<ServiceOfferings>({
    supervisions: false,
    trainings: false,
    practicums: false
  });
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get("plan");
    const ref = params.get("ref");
    
    if (ref) {
      setReferralCode(ref);
      console.log("Kod polecający:", ref);
    }
    
    if (plan === "owner") {
      setAccountType("owner");
    } else if (plan === "therapist") {
      setAccountType("therapist");
    } else if (plan === "therapist-seeking") {
      setAccountType("therapist-seeking");
    } else if (plan === "free") {
      setAccountType("free");
    } else if (plan === "client") {
      setAccountType("client");
    }
  }, [location]);

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
            referral_code: referralCode,
            service_offerings: serviceOfferings
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <RegistrationCard
          name={name}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          acceptTerms={acceptTerms}
          accountType={accountType}
          serviceOfferings={serviceOfferings}
          loading={loading}
          referralCode={referralCode}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onAcceptTermsChange={setAcceptTerms}
          onAccountTypeChange={setAccountType}
          onServiceOfferingsChange={setServiceOfferings}
          onSubmit={handleSubmit}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default RegisterPage;
