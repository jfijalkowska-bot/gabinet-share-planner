-- Create patients table
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  phone TEXT,
  email TEXT,
  address TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  diagnosis TEXT,
  treatment_goals TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create therapy sessions table
CREATE TABLE public.therapy_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE NOT NULL,
  therapist_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER,
  session_type TEXT DEFAULT 'individual',
  mood_before TEXT,
  mood_after TEXT,
  topics_discussed TEXT[],
  interventions_used TEXT[],
  homework_assigned TEXT,
  notes TEXT,
  audio_transcription TEXT,
  ai_summary TEXT,
  ai_insights JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create session documents table
CREATE TABLE public.session_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.therapy_sessions(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  uploaded_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapy_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for patients
CREATE POLICY "Therapists can view own patients"
  ON public.patients FOR SELECT
  TO authenticated
  USING (auth.uid() = therapist_id);

CREATE POLICY "Therapists can insert own patients"
  ON public.patients FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = therapist_id);

CREATE POLICY "Therapists can update own patients"
  ON public.patients FOR UPDATE
  TO authenticated
  USING (auth.uid() = therapist_id);

CREATE POLICY "Therapists can delete own patients"
  ON public.patients FOR DELETE
  TO authenticated
  USING (auth.uid() = therapist_id);

-- RLS Policies for therapy_sessions
CREATE POLICY "Therapists can view own sessions"
  ON public.therapy_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = therapist_id);

CREATE POLICY "Therapists can insert own sessions"
  ON public.therapy_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = therapist_id);

CREATE POLICY "Therapists can update own sessions"
  ON public.therapy_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = therapist_id);

CREATE POLICY "Therapists can delete own sessions"
  ON public.therapy_sessions FOR DELETE
  TO authenticated
  USING (auth.uid() = therapist_id);

-- RLS Policies for session_documents
CREATE POLICY "Therapists can view documents from own sessions"
  ON public.session_documents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.therapy_sessions
      WHERE therapy_sessions.id = session_documents.session_id
      AND therapy_sessions.therapist_id = auth.uid()
    )
  );

CREATE POLICY "Therapists can insert documents to own sessions"
  ON public.session_documents FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.therapy_sessions
      WHERE therapy_sessions.id = session_documents.session_id
      AND therapy_sessions.therapist_id = auth.uid()
    )
  );

CREATE POLICY "Therapists can delete documents from own sessions"
  ON public.session_documents FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.therapy_sessions
      WHERE therapy_sessions.id = session_documents.session_id
      AND therapy_sessions.therapist_id = auth.uid()
    )
  );

-- Create triggers for updated_at
CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON public.patients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_therapy_sessions_updated_at
  BEFORE UPDATE ON public.therapy_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();