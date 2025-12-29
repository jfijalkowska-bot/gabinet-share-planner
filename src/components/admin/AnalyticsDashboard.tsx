import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, Users, MousePointer, Eye } from "lucide-react";

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  conversions: number;
  conversionRate: number;
  dailyData: { date: string; views: number; visitors: number }[];
  topPages: { page: string; views: number }[];
  eventBreakdown: { event_type: string; count: number }[];
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    pageViews: 0,
    uniqueVisitors: 0,
    conversions: 0,
    conversionRate: 0,
    dailyData: [],
    topPages: [],
    eventBreakdown: [],
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('7d');

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const daysAgo = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysAgo);

      // Pobierz wszystkie eventy
      const { data: events, error } = await supabase
        .from('analytics_events')
        .select('*')
        .gte('created_at', startDate.toISOString());

      if (error) throw error;

      if (!events || events.length === 0) {
        setAnalytics({
          pageViews: 0,
          uniqueVisitors: 0,
          conversions: 0,
          conversionRate: 0,
          dailyData: [],
          topPages: [],
          eventBreakdown: [],
        });
        setLoading(false);
        return;
      }

      // Oblicz metryki
      const pageViews = events.filter(e => e.event_type === 'page_view').length;
      const uniqueSessions = new Set(events.map(e => e.session_id)).size;
      const conversions = events.filter(e => 
        e.event_type === 'conversion' || 
        e.event_type === 'signup' || 
        e.event_type === 'booking_completed'
      ).length;

      // Grupuj po dniach
      const dailyMap = new Map<string, { views: number; sessions: Set<string> }>();
      events.forEach(event => {
        const date = new Date(event.created_at).toLocaleDateString('pl-PL');
        if (!dailyMap.has(date)) {
          dailyMap.set(date, { views: 0, sessions: new Set() });
        }
        const day = dailyMap.get(date)!;
        if (event.event_type === 'page_view') day.views++;
        if (event.session_id) day.sessions.add(event.session_id);
      });

      const dailyData = Array.from(dailyMap.entries()).map(([date, data]) => ({
        date,
        views: data.views,
        visitors: data.sessions.size,
      })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      // Top strony
      const pageMap = new Map<string, number>();
      events.filter(e => e.event_type === 'page_view').forEach(event => {
        const page = event.page_url || 'unknown';
        pageMap.set(page, (pageMap.get(page) || 0) + 1);
      });
      const topPages = Array.from(pageMap.entries())
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      // Breakdown eventów
      const eventMap = new Map<string, number>();
      events.forEach(event => {
        eventMap.set(event.event_type, (eventMap.get(event.event_type) || 0) + 1);
      });
      const eventBreakdown = Array.from(eventMap.entries())
        .map(([event_type, count]) => ({ event_type, count }))
        .sort((a, b) => b.count - a.count);

      setAnalytics({
        pageViews,
        uniqueVisitors: uniqueSessions,
        conversions,
        conversionRate: uniqueSessions > 0 ? (conversions / uniqueSessions) * 100 : 0,
        dailyData,
        topPages,
        eventBreakdown,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Analityka</h2>
        <Tabs value={dateRange} onValueChange={(v) => setDateRange(v as '7d' | '30d' | '90d')}>
          <TabsList>
            <TabsTrigger value="7d">7 dni</TabsTrigger>
            <TabsTrigger value="30d">30 dni</TabsTrigger>
            <TabsTrigger value="90d">90 dni</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Główne metryki */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Odsłony</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.pageViews}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unikalni użytkownicy</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.uniqueVisitors}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Konwersje</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.conversions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Współczynnik konwersji</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.conversionRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Wykresy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ruch dzienny</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Ładowanie...
              </div>
            ) : analytics.dailyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={analytics.dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="hsl(var(--primary))" 
                    name="Odsłony" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="hsl(var(--secondary))" 
                    name="Użytkownicy" 
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Brak danych
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Typy zdarzeń</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Ładowanie...
              </div>
            ) : analytics.eventBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={analytics.eventBreakdown}
                    dataKey="count"
                    nameKey="event_type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ event_type, count }) => `${event_type}: ${count}`}
                  >
                    {analytics.eventBreakdown.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Brak danych
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Najpopularniejsze strony</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Ładowanie...
              </div>
            ) : analytics.topPages.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analytics.topPages} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" fontSize={12} />
                  <YAxis 
                    dataKey="page" 
                    type="category" 
                    width={200} 
                    fontSize={12}
                    tickFormatter={(value) => value.length > 30 ? value.slice(0, 30) + '...' : value}
                  />
                  <Tooltip />
                  <Bar dataKey="views" fill="hsl(var(--primary))" name="Odsłony" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Brak danych
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;