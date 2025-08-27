import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from 'sonner';

export interface Supervision {
  id: string;
  supervisor_id: string;
  title: string;
  description?: string;
  supervision_type: 'individual' | 'group';
  format: 'online' | 'stationary';
  location?: string;
  max_participants?: number;
  current_participants: number;
  price_per_session: number;
  therapy_approach?: string;
  required_experience?: string;
  required_preparation?: string;
  available_dates?: any[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  supervisor_profile?: {
    first_name: string;
    last_name: string;
    specialization?: string;
    city?: string;
  };
}

export interface SupervisionApplication {
  id: string;
  supervision_id: string;
  applicant_id: string;
  message?: string;
  contact_email: string;
  contact_phone?: string;
  experience_description?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  supervision?: Supervision;
}

export const useSupervisions = () => {
  const [supervisions, setSupervisions] = useState<Supervision[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSupervisions = async () => {
    try {
      const { data, error } = await supabase
        .from('supervisions')
        .select(`
          *,
          supervisor_profile:therapist_profiles!supervisor_id (
            first_name,
            last_name,
            specialization,
            city
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSupervisions((data as unknown as Supervision[]) || []);
    } catch (error) {
      console.error('Error fetching supervisions:', error);
      toast.error('Błąd podczas pobierania superwizji');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupervisions();
  }, []);

  return { supervisions, loading, refetch: fetchSupervisions };
};

export const useManagedSupervisions = () => {
  const [supervisions, setSupervisions] = useState<Supervision[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchManagedSupervisions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('supervisions')
        .select('*')
        .eq('supervisor_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSupervisions((data as unknown as Supervision[]) || []);
    } catch (error) {
      console.error('Error fetching managed supervisions:', error);
      toast.error('Błąd podczas pobierania zarządzanych superwizji');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagedSupervisions();
  }, [user]);

  return { supervisions, loading, refetch: fetchManagedSupervisions };
};

export const useSupervisionApplications = () => {
  const [applications, setApplications] = useState<SupervisionApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchApplications = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('supervision_applications')
        .select(`
          *,
          supervision:supervisions (
            title,
            supervision_type,
            format,
            price_per_session
          )
        `)
        .eq('applicant_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications((data as unknown as SupervisionApplication[]) || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Błąd podczas pobierania aplikacji');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  return { applications, loading, refetch: fetchApplications };
};