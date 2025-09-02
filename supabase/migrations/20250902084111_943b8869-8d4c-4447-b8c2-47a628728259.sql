-- Dodanie brakujących specjalizacji do tabeli therapist_specializations
INSERT INTO therapist_specializations (value, label, category) VALUES
('psycholog', 'Psycholog', 'podstawowe'),
('logopeda', 'Logopeda', 'podstawowe'),
('neurologopeda', 'Neurologopeda', 'specjalistyczne'),
('terapeuta_pedagogiczny', 'Specjalista terapii pedagogicznej', 'specjalistyczne'),
('terapeuta_integracji_sensorycznej', 'Terapeuta integracji sensorycznej', 'specjalistyczne'),
('terapeuta_pracy_z_cialem', 'Terapeuta pracy z ciałem', 'specjalistyczne')
ON CONFLICT (value) DO NOTHING;