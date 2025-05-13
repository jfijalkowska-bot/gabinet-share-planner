
import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AccountTypeSelector from "./AccountTypeSelector";
import RegistrationForm from "./RegistrationForm";

type AccountType = "owner" | "therapist" | "free" | "client";

interface RegistrationCardProps {
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
  onAccountTypeChange: (value: AccountType) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RegistrationCard = ({
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
  onAccountTypeChange,
  onSubmit
}: RegistrationCardProps) => {
  
  return (
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
        <AccountTypeSelector 
          accountType={accountType}
          onChange={onAccountTypeChange}
        />
        
        <RegistrationForm
          name={name}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          acceptTerms={acceptTerms}
          accountType={accountType}
          loading={loading}
          referralCode={referralCode}
          onNameChange={onNameChange}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          onConfirmPasswordChange={onConfirmPasswordChange}
          onAcceptTermsChange={onAcceptTermsChange}
          onSubmit={onSubmit}
        />
      </CardContent>
    </Card>
  );
};

export default RegistrationCard;
