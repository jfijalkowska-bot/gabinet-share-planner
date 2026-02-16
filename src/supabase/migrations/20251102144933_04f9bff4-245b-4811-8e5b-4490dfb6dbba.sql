-- SECURITY FIX: Change views to SECURITY INVOKER (safer than SECURITY DEFINER)
-- This ensures views use permissions of the querying user, not the view creator

-- Recreate therapist_profiles_public with explicit SECURITY INVOKER
DROP VIEW IF EXISTS public.therapist_profiles_public CASCADE;

CREATE VIEW public.therapist_profiles_public 
WITH (security_invoker=true) AS
SELECT 
  id,
  user_id,
  first_name,
  last_name,
  specialization,
  bio,
  experience_years,
  price_per_hour,
  is_verified,
  offers_supervisions,
  offers_trainings,
  offers_practicums,
  avatar_url,
  created_at,
  updated_at
FROM public.therapist_profiles;

-- Grant access
GRANT SELECT ON public.therapist_profiles_public TO anon;
GRANT SELECT ON public.therapist_profiles_public TO authenticated;

-- Recreate office_profiles_public with explicit SECURITY INVOKER
DROP VIEW IF EXISTS public.office_profiles_public CASCADE;

CREATE VIEW public.office_profiles_public
WITH (security_invoker=true) AS
SELECT 
  id,
  name,
  description,
  address,
  city,
  capacity,
  price_per_hour,
  equipment,
  style,
  color_scheme,
  images,
  cleaning_included,
  offers_supervisions,
  offers_trainings,
  offers_practicums,
  is_active,
  created_at,
  updated_at
FROM public.office_profiles
WHERE is_active = true;

-- Grant access
GRANT SELECT ON public.office_profiles_public TO anon;
GRANT SELECT ON public.office_profiles_public TO authenticated;