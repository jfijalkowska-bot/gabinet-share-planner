
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Users, Briefcase, Cog } from "lucide-react";

const ManagementPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <PageHeader 
          title="Zarządzanie" 
          description="Zarządzaj swoim gabinetem, klientami i ustawieniami."
        />
        
        <Tabs defaultValue="dashboard" className="mt-6">
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Pulpit</TabsTrigger>
            <TabsTrigger value="clients">Klienci</TabsTrigger>
            <TabsTrigger value="office">Gabinet</TabsTrigger>
            <TabsTrigger value="settings">Ustawienia</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <LayoutDashboard className="h-5 w-5 text-therapy-600" />
                  <div>
                    <CardTitle>Podsumowanie</CardTitle>
                    <CardDescription>Przegląd aktywności</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Twoje podsumowanie aktywności pojawi się tutaj.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Calendar className="h-5 w-5 text-therapy-600" />
                  <div>
                    <CardTitle>Nadchodzące wydarzenia</CardTitle>
                    <CardDescription>Wizyty i rezerwacje</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Twoje nadchodzące wydarzenia pojawią się tutaj.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="clients">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Users className="h-5 w-5 text-therapy-600" />
                <div>
                  <CardTitle>Klienci</CardTitle>
                  <CardDescription>Zarządzanie bazą klientów</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Lista Twoich klientów pojawi się tutaj.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="office">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Briefcase className="h-5 w-5 text-therapy-600" />
                <div>
                  <CardTitle>Gabinet</CardTitle>
                  <CardDescription>Informacje o gabinecie</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Szczegóły dotyczące Twojego gabinetu pojawią się tutaj.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Cog className="h-5 w-5 text-therapy-600" />
                <div>
                  <CardTitle>Ustawienia</CardTitle>
                  <CardDescription>Konfiguracja konta i aplikacji</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Opcje konfiguracji pojawią się tutaj.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default ManagementPage;
