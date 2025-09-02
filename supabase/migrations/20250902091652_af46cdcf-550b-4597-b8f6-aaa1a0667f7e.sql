-- Create function to handle user profile creation with service offerings
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
      offers_trainings,
      offers_practicums
    )
    VALUES (
      NEW.id, 
      NEW.raw_user_meta_data->>'full_name' || ' - Gabinet',
      'Do uzupełnienia',
      'Do uzupełnienia', 
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

-- Create trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created_profile ON auth.users;
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_profile();