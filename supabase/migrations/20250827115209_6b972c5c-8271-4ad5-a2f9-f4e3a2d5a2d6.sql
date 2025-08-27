-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create supervisions table
CREATE TABLE public.supervisions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  supervisor_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  supervision_type TEXT NOT NULL CHECK (supervision_type IN ('individual', 'group')),
  format TEXT NOT NULL CHECK (format IN ('online', 'stationary')),
  location TEXT, -- required for stationary
  max_participants INTEGER, -- for group supervisions
  current_participants INTEGER DEFAULT 0,
  price_per_session NUMERIC NOT NULL,
  therapy_approach TEXT, -- nurt terapeutyczny
  required_experience TEXT, -- wymagane doświadczenie
  required_preparation TEXT, -- wymagane przygotowanie
  available_dates JSONB, -- array of available date/time slots
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.supervisions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view active supervisions" 
ON public.supervisions 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Supervisors can create supervisions" 
ON public.supervisions 
FOR INSERT 
WITH CHECK (auth.uid() = supervisor_id);

CREATE POLICY "Supervisors can update own supervisions" 
ON public.supervisions 
FOR UPDATE 
USING (auth.uid() = supervisor_id);

CREATE POLICY "Supervisors can delete own supervisions" 
ON public.supervisions 
FOR DELETE 
USING (auth.uid() = supervisor_id);

-- Create supervision applications table
CREATE TABLE public.supervision_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  supervision_id UUID NOT NULL REFERENCES public.supervisions(id) ON DELETE CASCADE,
  applicant_id UUID NOT NULL,
  message TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  experience_description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(supervision_id, applicant_id)
);

-- Enable RLS for applications
ALTER TABLE public.supervision_applications ENABLE ROW LEVEL SECURITY;

-- Policies for applications
CREATE POLICY "Users can create their own applications" 
ON public.supervision_applications 
FOR INSERT 
WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Users can view their own applications" 
ON public.supervision_applications 
FOR SELECT 
USING (auth.uid() = applicant_id);

CREATE POLICY "Supervisors can view applications for their supervisions" 
ON public.supervision_applications 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.supervisions 
  WHERE supervisions.id = supervision_applications.supervision_id 
  AND supervisions.supervisor_id = auth.uid()
));

CREATE POLICY "Supervisors can update applications for their supervisions" 
ON public.supervision_applications 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.supervisions 
  WHERE supervisions.id = supervision_applications.supervision_id 
  AND supervisions.supervisor_id = auth.uid()
));

-- Add updated_at trigger for supervisions
CREATE TRIGGER update_supervisions_updated_at
  BEFORE UPDATE ON public.supervisions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add updated_at trigger for applications
CREATE TRIGGER update_supervision_applications_updated_at
  BEFORE UPDATE ON public.supervision_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();