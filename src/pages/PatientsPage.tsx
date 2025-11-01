import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PatientsList } from "@/components/patients/PatientsList";
import { PatientDetails } from "@/components/patients/PatientDetails";
import { AddPatientDialog } from "@/components/patients/AddPatientDialog";
import { useToast } from "@/hooks/use-toast";

export default function PatientsPage() {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: patients, isLoading, refetch } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("therapist_id", user.id)
        .eq("is_active", true)
        .order("last_name", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Pacjenci</h1>
            <p className="text-muted-foreground">Zarządzaj aktami pacjentów i sesjami terapeutycznymi</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Dodaj pacjenta
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <PatientsList
              patients={patients || []}
              selectedPatientId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-2">
            {selectedPatientId ? (
              <PatientDetails patientId={selectedPatientId} onUpdate={refetch} />
            ) : (
              <div className="flex items-center justify-center h-64 border border-dashed rounded-lg">
                <p className="text-muted-foreground">Wybierz pacjenta z listy</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <AddPatientDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSuccess={() => {
          refetch();
          toast({
            title: "Sukces",
            description: "Pacjent został dodany",
          });
        }}
      />

      <Footer />
    </div>
  );
}