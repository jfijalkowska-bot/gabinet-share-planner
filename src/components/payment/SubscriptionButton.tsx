import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";

interface SubscriptionButtonProps {
  planType: "therapist" | "owner" | "free";
  disabled?: boolean;
}

const planLabels: Record<string, string> = {
  therapist: "Plan Terapeuta - 29 zł/mies",
  owner: "Plan Właściciel - 59 zł/mies",
  free: "Plan Wizytówka - 39 zł/rok",
};

const SubscriptionButton = ({ planType, disabled }: SubscriptionButtonProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        title: "Błąd",
        description: "Musisz być zalogowany, aby wykupić abonament",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-subscription', {
        body: { planType },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      toast({
        title: "Błąd subskrypcji",
        description: error.message || "Nie udało się zainicjować subskrypcji",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={disabled || loading}
      className="w-full bg-therapy-600 hover:bg-therapy-700"
    >
      <CreditCard className="h-4 w-4 mr-2" />
      {loading ? "Przygotowywanie..." : planLabels[planType]}
    </Button>
  );
};

export default SubscriptionButton;
