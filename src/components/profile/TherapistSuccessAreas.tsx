
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import TherapistSuccessAreaDialog from "./TherapistSuccessAreaDialog";
import type { Database } from "@/integrations/supabase/types";

type SuccessArea = Database['public']['Tables']['therapist_success_areas']['Row'];

export function TherapistSuccessAreas() {
  const [areas, setAreas] = useState<SuccessArea[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<SuccessArea | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadSuccessAreas();
    }
  }, [user]);

  const loadSuccessAreas = async () => {
    const { data, error } = await supabase
      .from('therapist_success_areas')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się załadować obszarów sukcesów",
        variant: "destructive",
      });
    } else {
      setAreas(data || []);
    }
  };

  const handleEdit = (area: SuccessArea) => {
    setEditingArea(area);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('therapist_success_areas')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć obszaru",
        variant: "destructive",
      });
    } else {
      toast({
        description: "Obszar został usunięty",
      });
      loadSuccessAreas();
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setEditingArea(null);
  };

  const handleSave = () => {
    loadSuccessAreas();
    handleClose();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Obszary sukcesów terapeutycznych</CardTitle>
        <Button onClick={() => setIsDialogOpen(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Dodaj obszar
        </Button>
      </CardHeader>
      <CardContent>
        {areas.length === 0 ? (
          <p className="text-center text-sm text-gray-500 my-4">
            Nie dodano jeszcze żadnych obszarów sukcesów
          </p>
        ) : (
          <div className="space-y-4">
            {areas.map((area) => (
              <div key={area.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{formatAreaName(area.area)}</h4>
                  <p className="text-sm text-gray-500">
                    {area.experience_years} {area.experience_years === 1 ? 'rok' : 
                     area.experience_years < 5 ? 'lata' : 'lat'} doświadczenia
                  </p>
                  {area.description && (
                    <p className="text-sm mt-1">{area.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(area)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(area.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <TherapistSuccessAreaDialog
        open={isDialogOpen}
        onClose={handleClose}
        onSave={handleSave}
        editingArea={editingArea}
      />
    </Card>
  );
}

function formatAreaName(area: string): string {
  return area
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default TherapistSuccessAreas;
