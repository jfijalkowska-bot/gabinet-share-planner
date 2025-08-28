import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import TrainingCard from "./TrainingCard";

interface Training {
  id: string;
  title: string;
  description: string;
  topic: string;
  keywords: string[];
  format: string;
  location?: string;
  price: number;
  currency: string;
  max_participants: number;
  current_participants: number;
  start_date: string;
  end_date?: string;
  registration_deadline?: string;
  instructor_name?: string;
  instructor_bio?: string;
  requirements?: string;
  certificate_available: boolean;
  organizer_id: string;
  created_at: string;
}

interface TrainingListProps {
  searchParams: any;
}

const TrainingList = ({ searchParams }: TrainingListProps) => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainings();
  }, [searchParams]);

  const fetchTrainings = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('trainings')
        .select('*')
        .eq('is_active', true)
        .order('start_date', { ascending: true });

      // Apply filters
      if (searchParams.keywords) {
        query = query.or(`title.ilike.%${searchParams.keywords}%,description.ilike.%${searchParams.keywords}%`);
      }

      if (searchParams.topic) {
        query = query.eq('topic', searchParams.topic);
      }

      if (searchParams.format) {
        query = query.eq('format', searchParams.format);
      }

      if (searchParams.location) {
        query = query.ilike('location', `%${searchParams.location}%`);
      }

      if (searchParams.priceMin !== undefined) {
        query = query.gte('price', searchParams.priceMin);
      }

      if (searchParams.priceMax !== undefined) {
        query = query.lte('price', searchParams.priceMax);
      }

      if (searchParams.startDate) {
        query = query.gte('start_date', searchParams.startDate);
      }

      if (searchParams.endDate) {
        query = query.lte('start_date', searchParams.endDate);
      }

      if (searchParams.instructor) {
        query = query.ilike('instructor_name', `%${searchParams.instructor}%`);
      }

      if (searchParams.certificateAvailable) {
        query = query.eq('certificate_available', true);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTrainings(data || []);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg border p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        ))}
      </div>
    );
  }

  if (trainings.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nie znaleziono szkoleń
        </h3>
        <p className="text-gray-600 mb-4">
          Spróbuj zmienić kryteria wyszukiwania lub usuń niektóre filtry.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600">
        Znaleziono {trainings.length} {trainings.length === 1 ? 'szkolenie' : 'szkoleń'}
      </div>
      
      {trainings.map((training) => (
        <TrainingCard key={training.id} training={training} />
      ))}
    </div>
  );
};

export default TrainingList;