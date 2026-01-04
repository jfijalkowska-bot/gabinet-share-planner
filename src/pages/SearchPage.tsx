import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, MapPin, Clock, Euro, Search, UserCheck, CalendarDays, Award, Globe, Building, GraduationCap, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import PortalContactDialog, { ContactType } from "@/components/common/PortalContactDialog";

type SearchType = "office" | "specialist" | "supervision" | "training" | "practicum";

interface ContactDialogState {
  open: boolean;
  recipientId: string;
  recipientName: string;
  contactType: ContactType;
  itemName: string;
}

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') as SearchType | null;
  const [searchType, setSearchType] = useState<SearchType>(tabFromUrl || "office");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Supervisions
  const [supervisions, setSupervisions] = useState<any[]>([]);
  const [supervisionsLoading, setSupervisionsLoading] = useState(false);
  const [supervisionFilters, setSupervisionFilters] = useState({ search: '', type: '', format: '' });
  
  // Trainings
  const [trainings, setTrainings] = useState<any[]>([]);
  const [trainingsLoading, setTrainingsLoading] = useState(false);
  const [trainingFilters, setTrainingFilters] = useState({ search: '', format: '', topic: '' });
  
  // Practicums
  const [practicums, setPracticums] = useState<any[]>([]);
  const [practicumsLoading, setPracticumsLoading] = useState(false);
  const [practicumFilters, setPracticumFilters] = useState({ search: '', type: '', location: '' });

  // Contact dialog
  const [contactDialog, setContactDialog] = useState<ContactDialogState>({
    open: false,
    recipientId: '',
    recipientName: '',
    contactType: 'therapist',
    itemName: '',
  });

  const openContactDialog = (recipientId: string, recipientName: string, contactType: ContactType, itemName: string) => {
    setContactDialog({ open: true, recipientId, recipientName, contactType, itemName });
  };

  const handleSearch = async (filters: any) => {
    setIsLoading(true);
    
    try {
      if (searchType === "office") {
        let query = supabase.from('office_profiles_public').select('*');
        if (filters.city) query = query.ilike('city', `%${filters.city}%`);
        if (filters.minPrice) query = query.gte('price_per_hour', filters.minPrice);
        if (filters.maxPrice) query = query.lte('price_per_hour', filters.maxPrice);
        if (filters.capacity) query = query.gte('capacity', filters.capacity);
        if (filters.style) query = query.eq('style', filters.style);
        if (filters.equipment?.length > 0) query = query.contains('equipment', filters.equipment);

        const { data, error } = await query;
        if (error) throw error;
        setSearchResults(data || []);
      } else if (searchType === "specialist") {
        let query = supabase.from('therapist_profiles_public').select(`*, therapist_languages(language_name, language_code)`);
        if (filters.specialization) query = query.eq('specialization', filters.specialization);
        if (filters.minPrice) query = query.gte('price_per_hour', filters.minPrice);
        if (filters.maxPrice) query = query.lte('price_per_hour', filters.maxPrice);

        const { data, error } = await query;
        if (error) throw error;
        
        let results = data || [];
        if (filters.languages?.length > 0) {
          results = results.filter((t: any) => {
            const langs = t.therapist_languages?.map((l: any) => l.language_code) || [];
            return filters.languages.some((lang: string) => langs.includes(lang));
          });
        }
        setSearchResults(results);
      }
    } catch (error: any) {
      toast({ title: "Błąd wyszukiwania", description: error.message, variant: "destructive" });
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSupervisions = async () => {
    setSupervisionsLoading(true);
    try {
      const { data, error } = await supabase
        .from('supervisions')
        .select(`*, supervisor_profile:therapist_profiles!supervisions_supervisor_id_fkey(first_name, last_name, specialization, user_id)`)
        .eq('is_active', true);
      if (error) throw error;
      setSupervisions(data || []);
    } catch (error) {
      console.error('Error loading supervisions:', error);
    } finally {
      setSupervisionsLoading(false);
    }
  };

  const loadTrainings = async () => {
    setTrainingsLoading(true);
    try {
      const { data, error } = await supabase
        .from('trainings')
        .select('*')
        .eq('is_active', true)
        .gte('start_date', new Date().toISOString());
      if (error) throw error;
      setTrainings(data || []);
    } catch (error) {
      console.error('Error loading trainings:', error);
    } finally {
      setTrainingsLoading(false);
    }
  };

  const loadPracticums = async () => {
    setPracticumsLoading(true);
    try {
      const { data, error } = await supabase
        .from('practicums')
        .select('*')
        .eq('is_active', true);
      if (error) throw error;
      setPracticums(data || []);
    } catch (error) {
      console.error('Error loading practicums:', error);
    } finally {
      setPracticumsLoading(false);
    }
  };

  // Load data on initial tab from URL
  useEffect(() => {
    if (tabFromUrl === 'supervision') loadSupervisions();
    if (tabFromUrl === 'training') loadTrainings();
    if (tabFromUrl === 'practicum') loadPracticums();
  }, []);

  const handleTabChange = (value: string) => {
    setSearchType(value as SearchType);
    if (value === 'supervision' && supervisions.length === 0) loadSupervisions();
    if (value === 'training' && trainings.length === 0) loadTrainings();
    if (value === 'practicum' && practicums.length === 0) loadPracticums();
  };

  const filteredSupervisions = supervisions.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(supervisionFilters.search.toLowerCase());
    const matchType = !supervisionFilters.type || supervisionFilters.type === 'all' || s.supervision_type === supervisionFilters.type;
    const matchFormat = !supervisionFilters.format || supervisionFilters.format === 'all' || s.format === supervisionFilters.format;
    return matchSearch && matchType && matchFormat;
  });

  const filteredTrainings = trainings.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(trainingFilters.search.toLowerCase());
    const matchFormat = !trainingFilters.format || trainingFilters.format === 'all' || t.format === trainingFilters.format;
    return matchSearch && matchFormat;
  });

  const filteredPracticums = practicums.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(practicumFilters.search.toLowerCase());
    const matchType = !practicumFilters.type || practicumFilters.type === 'all' || p.compensation_type === practicumFilters.type;
    return matchSearch && matchType;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <PageHeader 
          title="Wyszukiwarka" 
          description="Znajdź gabinet, specjalistę, superwizję, szkolenie lub praktyki"
        />

        <Tabs value={searchType} className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="office">Gabinety</TabsTrigger>
            <TabsTrigger value="specialist">Specjaliści</TabsTrigger>
            <TabsTrigger value="supervision">Superwizje</TabsTrigger>
            <TabsTrigger value="training">Szkolenia</TabsTrigger>
            <TabsTrigger value="practicum">Praktyki</TabsTrigger>
          </TabsList>
          
          <TabsContent value="office">
            <SearchFilters type="office" onSearch={handleSearch} />
            <SearchResults results={searchResults} isLoading={isLoading} type="office" onContact={openContactDialog} />
          </TabsContent>
          
          <TabsContent value="specialist">
            <SearchFilters type="specialist" onSearch={handleSearch} />
            <SearchResults results={searchResults} isLoading={isLoading} type="specialist" onContact={openContactDialog} />
          </TabsContent>

          <TabsContent value="supervision">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Search className="h-5 w-5" />Filtry</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="Szukaj..." value={supervisionFilters.search} onChange={(e) => setSupervisionFilters(p => ({ ...p, search: e.target.value }))} />
                  <Select value={supervisionFilters.type} onValueChange={(v) => setSupervisionFilters(p => ({ ...p, type: v }))}>
                    <SelectTrigger><SelectValue placeholder="Typ" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="individual">Indywidualna</SelectItem>
                      <SelectItem value="group">Grupowa</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={supervisionFilters.format} onValueChange={(v) => setSupervisionFilters(p => ({ ...p, format: v }))}>
                    <SelectTrigger><SelectValue placeholder="Format" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="stationary">Stacjonarnie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {supervisionsLoading ? (
              <div className="text-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" /></div>
            ) : filteredSupervisions.length === 0 ? (
              <Card><CardContent className="text-center py-12"><UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p>Brak superwizji</p></CardContent></Card>
            ) : (
              <div className="grid gap-6">
                {filteredSupervisions.map((s) => (
                  <Card key={s.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">{s.title}</CardTitle>
                          <CardDescription>Prowadzący: {s.supervisor_profile?.first_name} {s.supervisor_profile?.last_name}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={s.supervision_type === 'individual' ? 'default' : 'secondary'}>{s.supervision_type === 'individual' ? 'Indywidualna' : 'Grupowa'}</Badge>
                          <Badge variant="outline">{s.format === 'online' ? 'Online' : 'Stacjonarnie'}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {s.description && <p className="text-muted-foreground">{s.description}</p>}
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1"><Euro className="h-4 w-4" />{s.price_per_session} PLN</span>
                        {s.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{s.location}</span>}
                      </div>
                      <div className="flex justify-end">
                        <Button onClick={() => openContactDialog(s.supervisor_profile?.user_id || s.supervisor_id, `${s.supervisor_profile?.first_name} ${s.supervisor_profile?.last_name}`, 'supervision', s.title)}>
                          <MessageCircle className="h-4 w-4 mr-2" />Skontaktuj się
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="training">
            <Card className="mb-6">
              <CardHeader><CardTitle className="flex items-center gap-2"><Search className="h-5 w-5" />Filtry</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Szukaj..." value={trainingFilters.search} onChange={(e) => setTrainingFilters(p => ({ ...p, search: e.target.value }))} />
                  <Select value={trainingFilters.format} onValueChange={(v) => setTrainingFilters(p => ({ ...p, format: v }))}>
                    <SelectTrigger><SelectValue placeholder="Format" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Stacjonarnie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {trainingsLoading ? (
              <div className="text-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" /></div>
            ) : filteredTrainings.length === 0 ? (
              <Card><CardContent className="text-center py-12"><Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p>Brak szkoleń</p></CardContent></Card>
            ) : (
              <div className="grid gap-6">
                {filteredTrainings.map((t) => (
                  <Card key={t.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">{t.title}</CardTitle>
                          <div className="flex gap-2">
                            <Badge variant="secondary">{t.format === 'online' ? <><Globe className="h-3 w-3 mr-1" />Online</> : <><Building className="h-3 w-3 mr-1" />Stacjonarnie</>}</Badge>
                            {t.certificate_available && <Badge variant="outline"><Award className="h-3 w-3 mr-1" />Certyfikat</Badge>}
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-primary">{t.price} {t.currency}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {t.description && <p className="text-muted-foreground line-clamp-2">{t.description}</p>}
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" />{format(new Date(t.start_date), "d MMMM yyyy", { locale: pl })}</span>
                        {t.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{t.location}</span>}
                        <span className="flex items-center gap-1"><Users className="h-4 w-4" />{t.current_participants}/{t.max_participants}</span>
                      </div>
                      <div className="flex justify-end">
                        <Button onClick={() => openContactDialog(t.organizer_id, t.instructor_name || 'Organizator', 'training', t.title)}>
                          <MessageCircle className="h-4 w-4 mr-2" />Skontaktuj się
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="practicum">
            <Card className="mb-6">
              <CardHeader><CardTitle className="flex items-center gap-2"><Search className="h-5 w-5" />Filtry</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Szukaj..." value={practicumFilters.search} onChange={(e) => setPracticumFilters(p => ({ ...p, search: e.target.value }))} />
                  <Select value={practicumFilters.type} onValueChange={(v) => setPracticumFilters(p => ({ ...p, type: v }))}>
                    <SelectTrigger><SelectValue placeholder="Typ wynagrodzenia" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="paid">Płatne</SelectItem>
                      <SelectItem value="unpaid">Bezpłatne</SelectItem>
                      <SelectItem value="compensated">Dofinansowane</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {practicumsLoading ? (
              <div className="text-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" /></div>
            ) : filteredPracticums.length === 0 ? (
              <Card><CardContent className="text-center py-12"><GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p>Brak praktyk</p></CardContent></Card>
            ) : (
              <div className="grid gap-6">
                {filteredPracticums.map((p) => (
                  <Card key={p.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{p.title}</CardTitle>
                        <Badge variant={p.compensation_type === 'paid' ? 'default' : 'secondary'}>
                          {p.compensation_type === 'paid' ? 'Płatne' : p.compensation_type === 'unpaid' ? 'Bezpłatne' : 'Dofinansowane'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {p.description && <p className="text-muted-foreground line-clamp-2">{p.description}</p>}
                      <div className="flex items-center gap-4 text-sm">
                        {p.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{p.location}</span>}
                        {p.duration_weeks && <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{p.duration_weeks} tyg.</span>}
                        {p.hours_per_week && <span className="flex items-center gap-1"><Users className="h-4 w-4" />{p.hours_per_week}h/tydzień</span>}
                      </div>
                      <div className="flex justify-end">
                        <Button onClick={() => openContactDialog(p.organization_id, 'Organizator praktyk', 'practicum', p.title)}>
                          <MessageCircle className="h-4 w-4 mr-2" />Skontaktuj się
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />

      <PortalContactDialog
        open={contactDialog.open}
        onOpenChange={(open) => setContactDialog(prev => ({ ...prev, open }))}
        recipientId={contactDialog.recipientId}
        recipientName={contactDialog.recipientName}
        contactType={contactDialog.contactType}
        itemName={contactDialog.itemName}
      />
    </div>
  );
};

export default SearchPage;
