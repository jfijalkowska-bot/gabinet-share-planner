
-- 1. Therapist service catalog
CREATE TABLE public.therapist_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  therapist_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  service_type TEXT NOT NULL DEFAULT 'in_person',
  requires_equipment TEXT[] DEFAULT '{}',
  note_for_client TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  price NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT valid_duration CHECK (duration_minutes IN (30, 45, 50, 60, 90, 120)),
  CONSTRAINT valid_service_type CHECK (service_type IN ('in_person', 'remote', 'both'))
);

ALTER TABLE public.therapist_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Therapists manage own services"
  ON public.therapist_services FOR ALL
  USING (auth.uid() = therapist_id)
  WITH CHECK (auth.uid() = therapist_id);

CREATE POLICY "Anyone can view active services"
  ON public.therapist_services FOR SELECT
  USING (is_active = true);

CREATE TRIGGER update_therapist_services_updated_at
  BEFORE UPDATE ON public.therapist_services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. Link availability slots to allowed services
CREATE TABLE public.availability_slot_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  availability_slot_id UUID NOT NULL REFERENCES public.availability_slots(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES public.therapist_services(id) ON DELETE CASCADE,
  UNIQUE(availability_slot_id, service_id)
);

ALTER TABLE public.availability_slot_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Providers manage own slot services"
  ON public.availability_slot_services FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.availability_slots s
      WHERE s.id = availability_slot_id AND s.provider_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.availability_slots s
      WHERE s.id = availability_slot_id AND s.provider_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view slot services"
  ON public.availability_slot_services FOR SELECT
  USING (true);

-- 3. Add service_id to bookings
ALTER TABLE public.bookings ADD COLUMN service_id UUID REFERENCES public.therapist_services(id);

-- 4. Predefined service templates
CREATE TABLE public.service_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  default_duration_minutes INTEGER NOT NULL DEFAULT 60,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.service_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view templates"
  ON public.service_templates FOR SELECT
  USING (true);

CREATE POLICY "Only admins manage templates"
  ON public.service_templates FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5. Seed predefined templates
INSERT INTO public.service_templates (name, default_duration_minutes, category) VALUES
  ('Psychoterapia indywidualna', 50, 'psychotherapy'),
  ('Terapia par', 90, 'psychotherapy'),
  ('Terapia rodzin', 120, 'psychotherapy'),
  ('Konsultacja psychologiczna', 60, 'consultation'),
  ('Diagnoza psychologiczna', 90, 'diagnosis'),
  ('EEG Biofeedback', 60, 'neurofeedback'),
  ('Terapia przetwarzania słuchowego', 60, 'auditory'),
  ('Brainspotting', 90, 'psychotherapy'),
  ('EMDR', 90, 'psychotherapy'),
  ('Access Bars', 90, 'bodywork'),
  ('Logopedia', 50, 'speech'),
  ('Sesja zdalna', 50, 'remote');
