import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface StripeConnectStatusProps {
  onStatusChange?: (connected: boolean) => void;
}

const StripeConnectCard: React.FC<StripeConnectStatusProps> = ({ onStatusChange }) => {
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [status, setStatus] = useState<{
    connected: boolean;
    onboarding_complete: boolean;
    can_receive_payments: boolean;
  }>({
    connected: false,
    onboarding_complete: false,
    can_receive_payments: false,
  });

  useEffect(() => {
    checkConnectStatus();
  }, []);

  const checkConnectStatus = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke("stripe-connect-status");
      
      if (error) throw error;
      
      setStatus(data);
      onStatusChange?.(data.can_receive_payments);
    } catch (error) {
      console.error("Error checking Connect status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectStripe = async () => {
    try {
      setConnecting(true);
      const { data, error } = await supabase.functions.invoke("stripe-connect-onboard");
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, "_blank");
        toast.info("Otwarto stronę Stripe - dokończ rejestrację konta");
      }
    } catch (error) {
      console.error("Error starting Connect onboarding:", error);
      toast.error("Nie udało się rozpocząć procesu łączenia konta Stripe");
    } finally {
      setConnecting(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Konto Stripe Connect
          {status.can_receive_payments ? (
            <Badge className="bg-green-100 text-green-800">Połączone</Badge>
          ) : status.connected ? (
            <Badge className="bg-yellow-100 text-yellow-800">Wymaga dokończenia</Badge>
          ) : (
            <Badge variant="secondary">Niepołączone</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {status.can_receive_payments ? (
          <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-green-800">Twoje konto jest gotowe!</p>
              <p className="text-sm text-green-700">
                Prowizje będą automatycznie przelewane na Twoje konto Stripe po każdej płatności poleconego użytkownika.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">Połącz konto Stripe aby otrzymywać prowizje</p>
              <p className="text-sm text-amber-700">
                Aby otrzymywać automatyczne wypłaty prowizji (7% od każdej płatności poleconego użytkownika), 
                musisz połączyć swoje konto Stripe. Proces zajmuje kilka minut.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h4 className="font-medium">Jak to działa?</h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0">1</span>
              Połącz swoje konto Stripe (lub utwórz nowe)
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0">2</span>
              Udostępniaj swój link polecający
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0">3</span>
              Za każdą płatność poleconego użytkownika, 7% automatycznie trafia na Twoje konto
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0">4</span>
              Prowizja naliczana jest dożywotnio - od każdej płatności, nie tylko pierwszej!
            </li>
          </ul>
        </div>

        {!status.can_receive_payments && (
          <Button 
            onClick={handleConnectStripe} 
            disabled={connecting}
            className="w-full"
          >
            {connecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Łączenie...
              </>
            ) : (
              <>
                <ExternalLink className="mr-2 h-4 w-4" />
                {status.connected ? "Dokończ konfigurację Stripe" : "Połącz konto Stripe"}
              </>
            )}
          </Button>
        )}

        {status.can_receive_payments && (
          <Button 
            variant="outline"
            onClick={() => checkConnectStatus()}
            className="w-full"
          >
            Odśwież status
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default StripeConnectCard;
