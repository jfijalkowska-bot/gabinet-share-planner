
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Users, Briefcase, Cog, Calendar, Bell, Shield, Building } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import TherapistProfileForm from "@/components/therapist/TherapistProfileForm";
import OfficeProfileForm from "@/components/office/OfficeProfileForm";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { SupervisionForm } from "@/components/supervision/SupervisionForm";

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
          title="Zarządzanie" 
          description="Zarządzaj swoim kontem, profilem i ustawieniami."
        />
        
        <Tabs defaultValue="dashboard" className="mt-6">
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Pulpit</TabsTrigger>
            <TabsTrigger value="profile">Profil terapeuty</TabsTrigger>
            <TabsTrigger value="office">Gabinet</TabsTrigger>
            <TabsTrigger value="supervisions">Superwizje</TabsTrigger>
            <TabsTrigger value="notifications">Powiadomienia</TabsTrigger>
            <TabsTrigger value="admin">Administracja</TabsTrigger>
            <TabsTrigger value="settings">Ustawienia</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tutaj można dodać komponenty dashboardu */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5 text-therapy-600" />
                  Podsumowanie
                </h3>
                <p className="text-gray-600">Witaj w panelu zarządzania GabinetShare!</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-therapy-600" />
                  Szybki start
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-therapy-50 rounded-lg">
                    <h4 className="font-medium text-therapy-700 mb-1">Profil terapeuty</h4>
                    <p className="text-sm text-gray-600">Uzupełnij swój profil, aby pacjenci mogli Cię znaleźć</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-700 mb-1">Dodaj gabinet</h4>
                    <p className="text-sm text-gray-600">Udostępnij swój gabinet do wynajęcia</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-700 mb-1">Oferuj superwizje</h4>
                    <p className="text-sm text-gray-600">Zostań superwizorem i dziel się wiedzą</p>
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
