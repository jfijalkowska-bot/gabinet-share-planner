import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Users, Briefcase, Cog, Calendar, Bell, Shield, Building, GraduationCap } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import TherapistProfileForm from "@/components/therapist/TherapistProfileForm";
import OfficeProfileForm from "@/components/office/OfficeProfileForm";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { SupervisionForm } from "@/components/supervision/SupervisionForm";
import PracticumForm from "@/components/practicum/PracticumForm";
import TrainingFormManagement from "@/components/trainings/TrainingFormManagement";

const ManagementPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-lg">Musisz być zalogowany, aby uzyskać dostęp do tej strony.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <PageHeader 
          title="Moje oferty i profil" 
          description="Wystaw ofertę najmu gabinetu, superwizji, szkolenia lub praktyk. Zarządzaj swoim profilem zawodowym."
        />
        
        <Tabs defaultValue="dashboard" className="mt-6">
          <TabsList className="mb-6 flex-wrap">
            <TabsTrigger value="dashboard">Pulpit</TabsTrigger>
            <TabsTrigger value="profile">Wizytówka</TabsTrigger>
            <TabsTrigger value="office">Wystaw gabinet</TabsTrigger>
            <TabsTrigger value="supervisions">Wystaw superwizję</TabsTrigger>
            <TabsTrigger value="trainings">Wystaw szkolenie</TabsTrigger>
            <TabsTrigger value="practicum">Wystaw praktyki</TabsTrigger>
            <TabsTrigger value="notifications">Powiadomienia</TabsTrigger>
            <TabsTrigger value="admin">Administracja</TabsTrigger>
            <TabsTrigger value="settings">Ustawienia</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                  Witaj w panelu ofert!
                </h3>
                <p className="text-muted-foreground">Tu wystawiasz swoje oferty i zarządzasz profilem zawodowym.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Co możesz zrobić?
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <h4 className="font-medium text-primary mb-1">📋 Wizytówka</h4>
                    <p className="text-sm text-muted-foreground">Uzupełnij profil - pacjenci i specjaliści Cię znajdą</p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <h4 className="font-medium text-green-700 mb-1">🏠 Wystaw gabinet</h4>
                    <p className="text-sm text-muted-foreground">Dodaj gabinet do wynajmu z cenami i wyposażeniem</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <h4 className="font-medium text-blue-700 mb-1">👥 Wystaw superwizję</h4>
                    <p className="text-sm text-muted-foreground">Oferuj superwizje indywidualne lub grupowe</p>
                  </div>
                  <div className="p-3 bg-amber-500/10 rounded-lg">
                    <h4 className="font-medium text-amber-700 mb-1">🎓 Wystaw szkolenie</h4>
                    <p className="text-sm text-muted-foreground">Dodaj kurs, warsztat lub webinar</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <h4 className="font-medium text-purple-700 mb-1">📚 Wystaw praktyki</h4>
                    <p className="text-sm text-muted-foreground">Oferuj miejsca praktyk dla studentów</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="profile">
            <TherapistProfileForm />
          </TabsContent>
          
          <TabsContent value="office">
            <OfficeProfileForm />
          </TabsContent>
          
          <TabsContent value="supervisions">
            <SupervisionForm />
          </TabsContent>
          
          <TabsContent value="practicum">
            <PracticumForm />
          </TabsContent>
          
          <TabsContent value="trainings">
            <TrainingFormManagement />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationCenter />
          </TabsContent>
          
          <TabsContent value="admin">
            <AdminDashboard />
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Cog className="h-5 w-5 text-therapy-600" />
                Ustawienia konta
              </h3>
              <p className="text-gray-600">Panel ustawień będzie dostępny wkrótce.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default ManagementPage;
