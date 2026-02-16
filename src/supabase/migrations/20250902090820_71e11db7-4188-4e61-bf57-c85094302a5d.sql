-- Add services offered fields to user profiles
ALTER TABLE public.therapist_profiles 
ADD COLUMN offers_supervisions BOOLEAN DEFAULT false,
ADD COLUMN offers_trainings BOOLEAN DEFAULT false,
ADD COLUMN offers_practicums BOOLEAN DEFAULT false;

-- Add services offered fields to office profiles  
ALTER TABLE public.office_profiles
ADD COLUMN offers_practicums BOOLEAN DEFAULT false,
ADD COLUMN offers_trainings BOOLEAN DEFAULT false;