-- Add cleaning_included field to office_profiles table
ALTER TABLE office_profiles 
ADD COLUMN IF NOT EXISTS cleaning_included boolean DEFAULT false;

-- Add neurotherapist specialization
INSERT INTO therapist_specializations (value, label, category) 
VALUES ('neurotherapist', 'Neuroterapeuta', 'specialization')
ON CONFLICT DO NOTHING;