import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Building, Calendar, CreditCard, TrendingUp, BarChart3, Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import UserManagement from "./UserManagement";
import AnalyticsDashboard from "./AnalyticsDashboard";
import AffiliateManagement from "./AffiliateManagement";

interface Stats {
  totalUsers: number;
  totalTherapists: number;
  totalOffices: number;
  totalAppointments: number;
  totalRevenue: number;
  pendingPayments: number;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalTherapists: 0,
    totalOffices: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    pendingPayments: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchStats();
      fetchRecentAppointments();
    }
  }, [user]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Pobierz statystyki terapeutów
      const { count: therapistCount } = await supabase
        .from('therapist_profiles')
        .select('*', { count: 'exact', head: true });

      // Pobierz statystyki gabinetów
      const { count: officeCount } = await supabase
        .from('office_profiles')
        .select('*', { count: 'exact', head: true });

      // Pobierz statystyki wizyt
      const { count: appointmentCount } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true });

      // Pobierz statystyki płatności
      const { data: payments } = await supabase
        .from('payments')
        .select('amount, status');

      const totalRevenue = payments
        ?.filter(p => p.status === 'succeeded')
        .reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

      const pendingPayments = payments
        ?.filter(p => p.status === 'pending').length || 0;

      setStats({
        totalUsers: 0, // Nie mamy dostępu do auth.users w RLS
        totalTherapists: therapistCount || 0,
        totalOffices: officeCount || 0,
        totalAppointments: appointmentCount || 0,
        totalRevenue,
        pendingPayments,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentAppointments = async () => {
    const { data } = await supabase
      .from('appointments')
      .select(`
        id,
        start_time,
        status,
        price,
        therapist_profiles!appointments_provider_id_fkey(first_name, last_name)
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    setRecentAppointments(data || []);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Panel Administracyjny</h1>
      
      {/* Statystyki */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terapeuci</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTherapists}</div>
            <p className="text-xs text-muted-foreground">Zarejestrowani terapeuci</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gabinety</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOffices}</div>
            <p className="text-xs text-muted-foreground">Aktywne gabinety</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wizyty</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAppointments}</div>
            <p className="text-xs text-muted-foreground">Łączna liczba wizyt</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Przychody</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toFixed(2)} PLN</div>
            <p className="text-xs text-muted-foreground">Łączne przychody</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Płatności</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">Oczekujące płatności</p>
          </CardContent>
        </Card>
      </div>

      {/* Szczegółowe zarządzanie */}
      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Wizyty</TabsTrigger>
          <TabsTrigger value="users">Użytkownicy</TabsTrigger>
          <TabsTrigger value="payments">Płatności</TabsTrigger>
          <TabsTrigger value="affiliate">Program partnerski</TabsTrigger>
          <TabsTrigger value="analytics">Analityka</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ostatnie wizyty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">
                        {appointment.therapist_profiles?.first_name} {appointment.therapist_profiles?.last_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(appointment.start_time).toLocaleString('pl-PL')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <span className="font-medium">{appointment.price} PLN</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zarządzanie płatnościami</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Panel zarządzania płatnościami będzie dostępny wkrótce.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="affiliate" className="space-y-4">
          <AffiliateManagement />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
