-- Add supervisions column to office_profiles table
ALTER TABLE public.office_profiles ADD COLUMN offers_supervisions boolean DEFAULT false;

-- Update the handle_new_user_profile function to include supervisions for owners
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  service_offerings jsonb;
BEGIN
  -- Get service offerings from user metadata
  service_offerings := NEW.raw_user_meta_data->>'service_offerings';
  
  -- Handle therapist account type
  IF NEW.raw_user_meta_data->>'account_type' = 'therapist' THEN
    INSERT INTO public.therapist_profiles (
      user_id, 
      first_name, 
      last_name,
      offers_supervisions,
      offers_trainings,
      offers_practicums
    )
    VALUES (
      NEW.id, 
      NEW.raw_user_meta_data->>'first_name', 
      NEW.raw_user_meta_data->>'last_name',
      COALESCE((service_offerings->>'supervisions')::boolean, false),
      COALESCE((service_offerings->>'trainings')::boolean, false),
      COALESCE((service_offerings->>'practicums')::boolean, false)
    );
  END IF;
  
  -- Handle owner account type  
  IF NEW.raw_user_meta_data->>'account_type' = 'owner' THEN
    INSERT INTO public.office_profiles (
      owner_id, 
      name,
      address,
      city,
      offers_supervisions,
      offers_trainings,
      offers_practicums
    )
    VALUES (
      NEW.id, 
      NEW.raw_user_meta_data->>'full_name' || ' - Gabinet',
      'Do uzupełnienia',
      'Do uzupełnienia', 
      COALESCE((service_offerings->>'supervisions')::boolean, false),
      COALESCE((service_offerings->>'trainings')::boolean, false),
      COALESCE((service_offerings->>'practicums')::boolean, false)
    );
  END IF;
  
  -- Handle client/therapist-seeking profiles
  IF NEW.raw_user_meta_data->>'account_type' IN ('client', 'therapist-seeking') THEN
    INSERT INTO public.client_profiles (id)
    VALUES (NEW.id)
    ON CONFLICT (id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;