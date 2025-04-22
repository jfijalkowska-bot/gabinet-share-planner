
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSpecializations = () => {
  const [specializations, setSpecializations] = useState<{value: string, label: string}[]>([]);

  useEffect(() => {
    const fetchSpecializations = async () => {
      const { data, error } = await supabase
        .from('therapist_specializations')
        .select('value, label')
        .order('label');

      if (error) {
        console.error('Error fetching specializations:', error);
      } else {
        setSpecializations(data || []);
      }
    };

    fetchSpecializations();
  }, []);

  return specializations;
};

export const useSuccessAreas = () => {
  const [successAreas, setSuccessAreas] = useState<{value: string, label: string}[]>([]);

  useEffect(() => {
    const fetchSuccessAreas = async () => {
      const { data, error } = await supabase
        .from('therapist_success_areas')
        .select('value, label')
        .order('label');

      if (error) {
        console.error('Error fetching success areas:', error);
      } else {
        setSuccessAreas(data || []);
      }
    };

    fetchSuccessAreas();
  }, []);

  return successAreas;
};
