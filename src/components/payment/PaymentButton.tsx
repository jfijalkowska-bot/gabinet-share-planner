
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";

interface PaymentButtonProps {
  appointmentId: string;
  amount: number;
  currency?: string;
  disabled?: boolean;
}

const PaymentButton = ({ appointmentId, amount, currency = "PLN", disabled }: PaymentButtonProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Błąd",
        description: "Musisz być zalogowany, aby dokonać płatności",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          appointmentId,
          amount,
          currency,
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Otwórz Stripe Checkout w nowej karcie
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      toast({
        title: "Błąd płatności",
        description: error.message || "Nie udało się zainicjować płatności",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || loading}
      className="bg-therapy-600 hover:bg-therapy-700"
    >
      <CreditCard className="h-4 w-4 mr-2" />
      {loading ? "Przygotowywanie..." : `Zapłać ${amount} ${currency}`}
    </Button>
  );
};

export default PaymentButton;
