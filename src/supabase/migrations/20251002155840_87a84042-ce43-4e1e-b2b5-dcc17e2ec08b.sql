-- Add missing columns to bookings table for reservation workflow
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected', 'cancelled')),
ADD COLUMN IF NOT EXISTS provider_id uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS conversation_id uuid REFERENCES conversations(id);

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_provider_id ON bookings(provider_id);
CREATE INDEX IF NOT EXISTS idx_bookings_conversation_id ON bookings(conversation_id);

-- Update RLS policies to allow providers to see their bookings
DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
CREATE POLICY "Users can view own bookings or provider bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = provider_id);

DROP POLICY IF EXISTS "Users can update own bookings" ON bookings;
CREATE POLICY "Users and providers can update bookings"
  ON bookings FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() = provider_id);