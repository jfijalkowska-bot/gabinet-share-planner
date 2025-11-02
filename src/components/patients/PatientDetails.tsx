import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SessionsList } from "./SessionsList";
import { AddSessionDialog } from "./AddSessionDialog";
import { PatientInfo } from "./PatientInfo";
import { useState } from "react";

interface PatientDetailsProps {
  patientId: string;
  onUpdate: () => void;
}

export function PatientDetails({ patientId, onUpdate }: PatientDetailsProps) {
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);

  const { data: patient } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("id", patientId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: sessions, refetch: refetchSessions } = useQuery({
    queryKey: ["sessions", patientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("therapy_sessions")
        .select("*")
        .eq("patient_id", patientId)
        .order("session_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (!patient) return null;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            {[patient.first_name, patient.last_name].filter(Boolean).join(' ') || 'Pacjent anonimowy'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sessions">
            <TabsList>
              <TabsTrigger value="sessions">Sesje</TabsTrigger>
              <TabsTrigger value="info">Informacje</TabsTrigger>
            </TabsList>

            <TabsContent value="sessions" className="space-y-4">
              <div className="flex justify-end">
                <Button onClick={() => setIsAddSessionOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nowa sesja
                </Button>
              </div>
              <SessionsList sessions={sessions || []} />
            </TabsContent>

            <TabsContent value="info">
              <PatientInfo patient={patient} onUpdate={onUpdate} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AddSessionDialog
        open={isAddSessionOpen}
        onOpenChange={setIsAddSessionOpen}
        patientId={patientId}
        onSuccess={refetchSessions}
      />
    </div>
  );
}