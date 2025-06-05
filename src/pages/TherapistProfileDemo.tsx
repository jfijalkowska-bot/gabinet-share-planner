
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import TherapistReviews from "@/components/therapist/TherapistReviews";
import LanguageManagement from "@/components/therapist/LanguageManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/auth/AuthProvider";

const TherapistProfileDemo = () => {
  const { user } = useAuth();
  
  // Mock therapist ID - w rzeczywistej aplikacji to byłby parametr z URL
  const mockTherapistId = "demo-therapist-id";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <PageHeader 
          title="Profil Terapeuty - Demo" 
          description="Testowanie systemu opinii i zarządzania językami"
        />

        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="reviews">Opinie</TabsTrigger>
            <TabsTrigger value="languages">Zarządzanie językami</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reviews" className="mt-0">
            <TherapistReviews 
              therapistId={mockTherapistId}
              canAddReview={true}
            />
          </TabsContent>
          
          <TabsContent value="languages" className="mt-0">
            {user ? (
              <LanguageManagement />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Zaloguj się, aby zarządzać językami</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default TherapistProfileDemo;
