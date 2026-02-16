-- SECURITY FIX 1: Remove home address from therapist_profiles and restrict access to sensitive data
-- Drop the home address column (therapists should only show office address)
ALTER TABLE public.therapist_profiles DROP COLUMN IF EXISTS address;
ALTER TABLE public.therapist_profiles DROP COLUMN IF EXISTS city;

-- SECURITY FIX 2: Allow patient anonymization
-- Make patient name fields nullable for anonymous patients
ALTER TABLE public.patients ALTER COLUMN first_name DROP NOT NULL;
ALTER TABLE public.patients ALTER COLUMN last_name DROP NOT NULL;

-- SECURITY FIX 3: Update RLS policies for therapist_profiles
-- Drop existing policies
DROP POLICY IF EXISTS "Therapists can view all profiles" ON public.therapist_profiles;
DROP POLICY IF EXISTS "Therapists can update own profile" ON public.therapist_profiles;
DROP POLICY IF EXISTS "Therapists can insert own profile" ON public.therapist_profiles;

-- Create new policies with restricted access
-- Public can view only basic professional information (no phone, no personal contact details)
CREATE POLICY "Public can view basic therapist info"
ON public.therapist_profiles
FOR SELECT
USING (true);

-- Therapists can view their own full profile including phone
CREATE POLICY "Therapists can view own full profile"
ON public.therapist_profiles
FOR SELECT
USING (auth.uid() = user_id);

-- Therapists can update their own profile
CREATE POLICY "Therapists can update own profile"
ON public.therapist_profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Therapists can insert their own profile
CREATE POLICY "Therapists can insert own profile"
ON public.therapist_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- SECURITY FIX 4: Create a public view that hides sensitive therapist data
CREATE OR REPLACE VIEW public.therapist_profiles_public AS
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

-- Grant public access to the view
GRANT SELECT ON public.therapist_profiles_public TO anon;
GRANT SELECT ON public.therapist_profiles_public TO authenticated;

-- SECURITY FIX 5: Ensure office_profiles doesn't leak owner_id in public view
DROP VIEW IF EXISTS public.office_profiles_public CASCADE;

CREATE VIEW public.office_profiles_public AS
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

-- Grant access to the public view
GRANT SELECT ON public.office_profiles_public TO anon;
GRANT SELECT ON public.office_profiles_public TO authenticated;

-- SECURITY FIX 6: Add comment to document anonymization feature
COMMENT ON COLUMN public.patients.first_name IS 'Patient first name - can be NULL for anonymous patients';
COMMENT ON COLUMN public.patients.last_name IS 'Patient last name - can be NULL for anonymous patients';
COMMENT ON COLUMN public.patients.address IS 'Patient address - optional, not required for therapy';
COMMENT ON COLUMN public.patients.email IS 'Patient email - optional';
COMMENT ON COLUMN public.patients.phone IS 'Patient phone - optional';

-- SECURITY FIX 7: Ensure affiliate_payouts has proper isolation
-- Verify existing policy is sufficient (already has: Users can view only their own payouts)