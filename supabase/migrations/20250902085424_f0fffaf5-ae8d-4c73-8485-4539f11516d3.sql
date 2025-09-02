-- Create practicums table for psychological internships and practices
CREATE TABLE public.practicums (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  is_online BOOLEAN DEFAULT false,
  compensation_type TEXT NOT NULL CHECK (compensation_type IN ('paid', 'unpaid', 'compensated')), -- paid (płatny), unpaid (bezpłatny), compensated (dofinansowany)
  compensation_amount NUMERIC,
  duration_weeks INTEGER,
  hours_per_week INTEGER,
  requirements TEXT,
  responsibilities TEXT,
  start_date DATE,
  application_deadline DATE,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.practicums ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Everyone can view active practicums" 
ON public.practicums 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Organizations can manage own practicums" 
ON public.practicums 
FOR ALL
USING (auth.uid() = organization_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_practicums_updated_at
BEFORE UPDATE ON public.practicums
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();