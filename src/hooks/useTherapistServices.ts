import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

export interface TherapistService {
  id: string;
  therapist_id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  service_type: "in_person" | "remote" | "both";
  requires_equipment: string[];
  note_for_client: string | null;
  is_active: boolean;
  price: number | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceTemplate {
  id: string;
  name: string;
  default_duration_minutes: number;
  category: string | null;
}

export const useTherapistServices = (therapistId?: string) => {
  const { user } = useAuth();
  const targetId = therapistId || user?.id;

  return useQuery({
    queryKey: ["therapist-services", targetId],
    queryFn: async () => {
      if (!targetId) return [];
      const { data, error } = await supabase
        .from("therapist_services")
        .select("*")
        .eq("therapist_id", targetId)
        .order("name");
      if (error) throw error;
      return data as TherapistService[];
    },
    enabled: !!targetId,
  });
};

export const useServiceTemplates = () => {
  return useQuery({
    queryKey: ["service-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_templates")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as ServiceTemplate[];
    },
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (service: Partial<TherapistService>) => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase.from("therapist_services").insert([
        {
          therapist_id: user.id,
          name: service.name!,
          description: service.description || null,
          duration_minutes: service.duration_minutes || 60,
          service_type: service.service_type || "in_person",
          requires_equipment: service.requires_equipment || [],
          note_for_client: service.note_for_client || null,
          is_active: true,
          price: service.price || null,
        },
      ]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["therapist-services"] });
      toast.success("Usługa dodana");
    },
    onError: () => toast.error("Nie udało się dodać usługi"),
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<TherapistService> & { id: string }) => {
      const { error } = await supabase
        .from("therapist_services")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["therapist-services"] });
      toast.success("Usługa zaktualizowana");
    },
    onError: () => toast.error("Nie udało się zaktualizować usługi"),
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("therapist_services")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["therapist-services"] });
      toast.success("Usługa usunięta");
    },
    onError: () => toast.error("Nie udało się usunąć usługi"),
  });
};
