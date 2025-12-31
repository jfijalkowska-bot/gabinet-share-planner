import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, User, CreditCard, Clock, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface ReferredUser {
  id: string;
  referred_user_id: string;
  plan_type: string;
  amount: number;
  commission: number;
  status: string;
  created_at: string;
  paid_at: string | null;
}

const ReferredUsersList: React.FC = () => {
  const { user } = useAuth();

  const { data: referredUsers, isLoading } = useQuery({
    queryKey: ['referred-users', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('affiliate_conversions')
        .select('*')
        .eq('referrer_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ReferredUser[];
    },
    enabled: !!user?.id,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle2 className="w-3 h-3 mr-1" />Wypłacono</Badge>;
      case 'pending_payout':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Do wypłaty</Badge>;
      case 'registered':
        return <Badge variant="secondary"><User className="w-3 h-3 mr-1" />Zarejestrowany</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlanTypeBadge = (planType: string) => {
    switch (planType) {
      case 'subscription':
        return <Badge className="bg-blue-100 text-blue-800"><CreditCard className="w-3 h-3 mr-1" />Subskrypcja</Badge>;
      case 'pending':
        return <Badge variant="outline">Brak płatności</Badge>;
      default:
        return <Badge variant="outline">{planType}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Poleceni użytkownicy
        </CardTitle>
        <CardDescription>
          Lista osób, które zarejestrowały się przez Twój link polecający
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!referredUsers || referredUsers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Nie masz jeszcze poleconych użytkowników.</p>
            <p className="text-sm mt-1">Udostępnij swój link polecający, aby zacząć zarabiać!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {referredUsers.map((referral) => (
              <div 
                key={referral.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      Użytkownik #{referral.referred_user_id.slice(0, 8)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Zarejestrowany {format(new Date(referral.created_at), 'dd MMM yyyy', { locale: pl })}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  {getPlanTypeBadge(referral.plan_type)}
                  {getStatusBadge(referral.status)}
                </div>
                
                <div className="text-right">
                  {referral.commission > 0 ? (
                    <>
                      <p className="font-semibold text-green-600">
                        +{referral.commission.toFixed(2)} zł
                      </p>
                      <p className="text-xs text-muted-foreground">
                        z {referral.amount.toFixed(2)} zł
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Oczekuje na płatność
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            💡 Otrzymujesz <strong>7% prowizji</strong> od każdej płatności poleconego użytkownika - dożywotnio!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferredUsersList;
