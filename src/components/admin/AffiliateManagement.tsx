import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Users, TrendingUp, CreditCard, Gift } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

const AffiliateManagement: React.FC = () => {
  // Pobierz wszystkie konwersje partnerskie
  const { data: conversions, isLoading: loadingConversions } = useQuery({
    queryKey: ['admin-affiliate-conversions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('affiliate_conversions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Pobierz konta Connect
  const { data: connectAccounts, isLoading: loadingAccounts } = useQuery({
    queryKey: ['admin-affiliate-accounts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('affiliate_accounts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Statystyki
  const stats = React.useMemo(() => {
    if (!conversions) return { total: 0, paid: 0, pending: 0, registered: 0, totalCommission: 0, paidCommission: 0 };
    
    return {
      total: conversions.length,
      paid: conversions.filter(c => c.status === 'paid').length,
      pending: conversions.filter(c => c.status === 'pending_payout').length,
      registered: conversions.filter(c => c.status === 'registered').length,
      totalCommission: conversions.reduce((sum, c) => sum + c.commission, 0),
      paidCommission: conversions.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.commission, 0),
    };
  }, [conversions]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Wypłacono</Badge>;
      case 'pending_payout':
        return <Badge className="bg-yellow-100 text-yellow-800">Do wypłaty</Badge>;
      case 'registered':
        return <Badge variant="secondary">Zarejestrowany</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loadingConversions || loadingAccounts) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statystyki */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Polecenia</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              {stats.paid} wypłaconych, {stats.pending} oczekujących
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Łączne prowizje</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCommission.toFixed(2)} zł</div>
            <p className="text-xs text-muted-foreground">
              {stats.paidCommission.toFixed(2)} zł wypłacono
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Konta Connect</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectAccounts?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              {connectAccounts?.filter(a => a.onboarding_complete).length || 0} aktywnych
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stawka prowizji</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7%</div>
            <p className="text-xs text-muted-foreground">Dożywotnio od każdej płatności</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista konwersji */}
      <Card>
        <CardHeader>
          <CardTitle>Historia poleceń</CardTitle>
          <CardDescription>Wszystkie polecenia i prowizje w programie partnerskim</CardDescription>
        </CardHeader>
        <CardContent>
          {!conversions || conversions.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">Brak poleceń w systemie</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Polecający</TableHead>
                  <TableHead>Polecony</TableHead>
                  <TableHead>Kwota</TableHead>
                  <TableHead>Prowizja</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conversions.map((conversion) => (
                  <TableRow key={conversion.id}>
                    <TableCell className="text-sm">
                      {format(new Date(conversion.created_at), 'dd.MM.yyyy', { locale: pl })}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {conversion.referrer_id.slice(0, 8)}...
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {conversion.referred_user_id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>
                      {conversion.amount > 0 ? `${conversion.amount.toFixed(2)} zł` : '-'}
                    </TableCell>
                    <TableCell className="font-medium text-green-600">
                      {conversion.commission > 0 ? `${conversion.commission.toFixed(2)} zł` : '-'}
                    </TableCell>
                    <TableCell>{getStatusBadge(conversion.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Lista kont Connect */}
      <Card>
        <CardHeader>
          <CardTitle>Konta Stripe Connect</CardTitle>
          <CardDescription>Partnerzy z połączonymi kontami Stripe</CardDescription>
        </CardHeader>
        <CardContent>
          {!connectAccounts || connectAccounts.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">Brak połączonych kont Stripe</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Użytkownik</TableHead>
                  <TableHead>Stripe Account ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data połączenia</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {connectAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-mono text-xs">
                      {account.user_id.slice(0, 8)}...
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {account.stripe_connect_account_id}
                    </TableCell>
                    <TableCell>
                      {account.onboarding_complete ? (
                        <Badge className="bg-green-100 text-green-800">Aktywne</Badge>
                      ) : (
                        <Badge variant="secondary">Niedokończone</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {format(new Date(account.created_at), 'dd.MM.yyyy HH:mm', { locale: pl })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliateManagement;
