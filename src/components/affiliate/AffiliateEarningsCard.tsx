import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const AffiliateEarningsCard: React.FC = () => {
  const { user } = useAuth();

  const { data: earnings, isLoading } = useQuery({
    queryKey: ['affiliate-earnings', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .rpc('get_affiliate_earnings', { affiliate_id: user.id });
      
      if (error) throw error;
      return data?.[0] || { total_earnings: 0, pending_earnings: 0, paid_earnings: 0 };
    },
    enabled: !!user?.id,
  });

  const { data: clicks } = useQuery({
    queryKey: ['affiliate-clicks', user?.id],
    queryFn: async () => {
      if (!user?.id) return 0;
      
      const { count, error } = await supabase
        .from('affiliate_clicks')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_id', user.id);
      
      if (error) throw error;
      return count || 0;
    },
    enabled: !!user?.id,
  });

  const { data: conversions } = useQuery({
    queryKey: ['affiliate-conversions', user?.id],
    queryFn: async () => {
      if (!user?.id) return 0;
      
      const { count, error } = await supabase
        .from('affiliate_conversions')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_id', user.id);
      
      if (error) throw error;
      return count || 0;
    },
    enabled: !!user?.id,
  });

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
        <CardTitle>Twoje zarobki</CardTitle>
        <CardDescription>
          Statystyki Twojego programu partnerskiego
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-therapy-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Łączne zarobki</p>
            <p className="text-2xl font-bold text-therapy-700">
              {Number(earnings?.total_earnings || 0).toFixed(2)} zł
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Oczekujące</p>
            <p className="text-2xl font-bold text-green-700">
              {Number(earnings?.pending_earnings || 0).toFixed(2)} zł
            </p>
          </div>
          <div className="bg-therapy-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Kliknięcia</p>
            <p className="text-2xl font-bold text-therapy-700">{clicks || 0}</p>
          </div>
          <div className="bg-therapy-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Konwersje</p>
            <p className="text-2xl font-bold text-therapy-700">{conversions || 0}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Prowizja 7% od każdej płatności poleconego użytkownika. Automatyczne wypłaty przez Stripe.
        </p>
      </CardContent>
    </Card>
  );
};

export default AffiliateEarningsCard;
