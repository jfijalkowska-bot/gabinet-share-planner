import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, MapPin, Clock, Euro, Search, UserCheck } from 'lucide-react';
import { useSupervisions, type Supervision } from '@/hooks/useSupervisions';
import { SupervisionApplicationDialog } from '@/components/supervision/SupervisionApplicationDialog';

const SupervisionsPage = () => {
  const { supervisions, loading } = useSupervisions();
  const [selectedSupervision, setSelectedSupervision] = useState<Supervision | null>(null);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    format: '',
    approach: ''
  });

  const filteredSupervisions = supervisions.filter(supervision => {
    const matchesSearch = supervision.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         supervision.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
                         `${supervision.supervisor_profile?.first_name} ${supervision.supervisor_profile?.last_name}`.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesType = !filters.type || supervision.supervision_type === filters.type;
    const matchesFormat = !filters.format || supervision.format === filters.format;
    const matchesApproach = !filters.approach || supervision.therapy_approach?.includes(filters.approach);

    return matchesSearch && matchesType && matchesFormat && matchesApproach;
  });

  const handleApplyForSupervision = (supervision: Supervision) => {
    setSelectedSupervision(supervision);
    setApplicationDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Ładowanie superwizji...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageHeader 
          title="Superwizje" 
          description="Znajdź profesjonalne superwizje terapeutyczne dopasowane do swoich potrzeb"
        />

        {/* Filtry */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Filtry wyszukiwania
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="Szukaj po nazwie, opisie lub superwizorze..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
              
              <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Typ superwizji" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Wszystkie typy</SelectItem>
                  <SelectItem value="individual">Indywidualna</SelectItem>
                  <SelectItem value="group">Grupowa</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.format} onValueChange={(value) => setFilters(prev => ({ ...prev, format: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Wszystkie formaty</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="stationary">Stacjonarnie</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Nurt terapeutyczny..."
                value={filters.approach}
                onChange={(e) => setFilters(prev => ({ ...prev, approach: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Lista superwizji */}
        <div className="grid gap-6">
          {filteredSupervisions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Brak superwizji</h3>
                <p className="text-muted-foreground">
                  {supervisions.length === 0 
                    ? "Nie ma jeszcze dostępnych superwizji." 
                    : "Nie znaleziono superwizji pasujących do wybranych filtrów."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredSupervisions.map((supervision) => (
              <Card key={supervision.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">{supervision.title}</CardTitle>
                      <CardDescription className="text-base">
                        Prowadzący: {supervision.supervisor_profile?.first_name} {supervision.supervisor_profile?.last_name}
                        {supervision.supervisor_profile?.specialization && (
                          <span className="ml-2 text-muted-foreground">
                            • {supervision.supervisor_profile.specialization}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={supervision.supervision_type === 'individual' ? 'default' : 'secondary'}>
                        {supervision.supervision_type === 'individual' ? 'Indywidualna' : 'Grupowa'}
                      </Badge>
                      <Badge variant={supervision.format === 'online' ? 'outline' : 'secondary'}>
                        {supervision.format === 'online' ? 'Online' : 'Stacjonarnie'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {supervision.description && (
                    <p className="text-muted-foreground">{supervision.description}</p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Euro className="h-4 w-4 text-muted-foreground" />
                      <span>{supervision.price_per_session} PLN za sesję</span>
                    </div>

                    {supervision.supervision_type === 'group' && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {supervision.current_participants}/{supervision.max_participants} uczestników
                        </span>
                      </div>
                    )}

                    {supervision.format === 'stationary' && supervision.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{supervision.location}</span>
                      </div>
                    )}

                    {supervision.therapy_approach && (
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                        <span>Nurt: {supervision.therapy_approach}</span>
                      </div>
                    )}
                  </div>

                  {(supervision.required_experience || supervision.required_preparation) && (
                    <div className="space-y-2 p-4 bg-muted rounded-lg">
                      {supervision.required_experience && (
                        <div>
                          <strong>Wymagane doświadczenie:</strong>
                          <p className="text-sm text-muted-foreground mt-1">{supervision.required_experience}</p>
                        </div>
                      )}
                      {supervision.required_preparation && (
                        <div>
                          <strong>Wymagane przygotowanie:</strong>
                          <p className="text-sm text-muted-foreground mt-1">{supervision.required_preparation}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        Dodano {new Date(supervision.created_at).toLocaleDateString('pl-PL')}
                      </span>
                    </div>
                    
                    <Button 
                      onClick={() => handleApplyForSupervision(supervision)}
                      disabled={supervision.supervision_type === 'group' && 
                               supervision.current_participants >= (supervision.max_participants || 0)}
                    >
                      {supervision.supervision_type === 'group' && 
                       supervision.current_participants >= (supervision.max_participants || 0)
                        ? 'Grupa pełna' 
                        : 'Aplikuj'
                      }
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      <Footer />

      {selectedSupervision && (
        <SupervisionApplicationDialog
          open={applicationDialogOpen}
          onOpenChange={setApplicationDialogOpen}
          supervision={selectedSupervision}
        />
      )}
    </div>
  );
};

export default SupervisionsPage;