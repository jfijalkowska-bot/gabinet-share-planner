-- Dodaj kolumnę stripe_connect_account_id do przechowywania ID konta Connect dla partnerów
ALTER TABLE public.affiliate_conversions 
ADD COLUMN IF NOT EXISTS stripe_transfer_id TEXT,
ADD COLUMN IF NOT EXISTS paid_at TIMESTAMP WITH TIME ZONE;

-- Tabela do przechowywania informacji o kontach Stripe Connect partnerów
CREATE TABLE IF NOT EXISTS public.affiliate_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  stripe_connect_account_id TEXT NOT NULL,
  onboarding_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.affiliate_accounts ENABLE ROW LEVEL SECURITY;

-- Policies - users can only see and update their own affiliate account
CREATE POLICY "Users can view their own affiliate account" 
ON public.affiliate_accounts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own affiliate account" 
ON public.affiliate_accounts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own affiliate account" 
ON public.affiliate_accounts 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Zmiana funkcji handle_affiliate_registration - teraz tylko zapisuje relację, bez obliczania prowizji
CREATE OR REPLACE FUNCTION public.handle_affiliate_registration()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  referral_code TEXT;
  referrer_id UUID;
BEGIN
  -- Pobierz kod polecający z meta danych
  referral_code := NEW.raw_user_meta_data->>'referral_code';
  
  IF referral_code IS NOT NULL THEN
    -- Znajdź id osoby polecającej na podstawie kodu (pierwsze 8 znaków id)
    SELECT id INTO referrer_id
    FROM auth.users
    WHERE SUBSTRING(id::text, 1, 8) = referral_code;
    
    IF referrer_id IS NOT NULL THEN
      -- Zapisujemy tylko relację polecający-polecony (bez prowizji - ta będzie obliczana przy płatności)
      INSERT INTO public.affiliate_conversions
        (referrer_id, referred_user_id, plan_type, amount, commission, status)
      VALUES
        (referrer_id, NEW.id, 'pending', 0, 0, 'registered');
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;