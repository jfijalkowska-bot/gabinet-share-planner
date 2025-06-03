
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type AccountType = "owner" | "therapist" | "therapist-seeking" | "free" | "client";

interface RegistrationFormProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  accountType: AccountType;
  loading: boolean;
  referralCode: string | null;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onAcceptTermsChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RegistrationForm = ({
  name,
  email,
  password,
  confirmPassword,
  acceptTerms,
  accountType,
  loading,
  referralCode,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onAcceptTermsChange,
  onSubmit
}: RegistrationFormProps) => {

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Imię i nazwisko</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
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
          onChange={(e) => onEmailChange(e.target.value)}
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
          onChange={(e) => onPasswordChange(e.target.value)}
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
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          checked={acceptTerms}
          onCheckedChange={(checked) => onAcceptTermsChange(!!checked)}
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
          accountType === "client" ? "Zarejestruj się za darmo i zarabiaj na poleceniach" :
          accountType === "therapist-seeking" ? "Zarejestruj się za darmo jako terapeuta" :
          accountType === "free" ? "Utwórz wizytówkę za 49 zł" : 
          "Rozpocznij 30-dniowy okres próbny"}
      </Button>
      
      <p className="text-xs text-center text-gray-500">
        {accountType !== "free" && accountType !== "client" && accountType !== "therapist-seeking" ? 
          "30 dni za darmo, bez automatycznego przedłużenia. Płatność wymagana po zakończeniu okresu próbnego." : 
          accountType === "free" ? 
          "Jednorazowa opłata, bez terminu ważności. Płatność po rejestracji." :
          accountType === "therapist-seeking" ?
          "Całkowicie za darmo. Przeglądaj gabinety i zarabiaj 10% na poleceniach." :
          "Całkowicie za darmo. Płacisz tylko za wizyty, które rezerwujesz. Zarabiaj 10% na poleceniach."}
      </p>

      {referralCode && (
        <div className="mt-2 p-2 bg-therapy-50 rounded text-xs text-center text-therapy-700">
          Rejestrujesz się z programu poleceń. Kod: {referralCode}
        </div>
      )}
      
      <div className="mt-6 text-center text-sm">
        Masz już konto?{" "}
        <Link to="/login" className="text-therapy-600 hover:underline font-medium">
          Zaloguj się
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
