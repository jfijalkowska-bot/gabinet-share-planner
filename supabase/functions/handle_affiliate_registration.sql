
create or replace function public.handle_affiliate_registration()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
DECLARE
  referral_code TEXT;
  referrer_id UUID;
  plan_price NUMERIC;
  commission NUMERIC;
BEGIN
  -- Pobierz kod polecający z meta danych
  referral_code := NEW.raw_user_meta_data->>'referral_code';
  
  IF referral_code IS NOT NULL THEN
    -- Znajdź id osoby polecającej na podstawie kodu (pierwsze 8 znaków id)
    SELECT id INTO referrer_id
    FROM auth.users
    WHERE SUBSTRING(id::text, 1, 8) = referral_code;
    
    IF referrer_id IS NOT NULL THEN
      -- Określ cenę planu
      CASE NEW.raw_user_meta_data->>'account_type'
        WHEN 'owner' THEN plan_price := 59;
        WHEN 'therapist' THEN plan_price := 49;
        WHEN 'free' THEN plan_price := 49;
        WHEN 'client' THEN plan_price := 0;
        ELSE plan_price := 0;
      END CASE;
      
      -- Oblicz prowizję (10%)
      commission := plan_price * 0.1;
      
      -- Zapisujemy informację o poleconym użytkowniku
      INSERT INTO public.affiliate_conversions
        (referrer_id, referred_user_id, plan_type, amount, commission, status)
      VALUES
        (referrer_id, NEW.id, NEW.raw_user_meta_data->>'account_type', plan_price, commission, 'pending');
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;
