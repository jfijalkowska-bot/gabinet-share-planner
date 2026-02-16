-- Create conversations table for private messaging
CREATE TABLE public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create conversation participants table (many-to-many between users and conversations)
CREATE TABLE public.conversation_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_read_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(conversation_id, user_id)
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_read BOOLEAN DEFAULT false
);

-- Create trainings table
CREATE TABLE public.trainings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organizer_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  topic TEXT,
  keywords TEXT[],
  format TEXT NOT NULL, -- 'online' or 'offline'
  location TEXT,
  price NUMERIC(10,2),
  currency TEXT DEFAULT 'PLN',
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  instructor_name TEXT,
  instructor_bio TEXT,
  requirements TEXT,
  certificate_available BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create training registrations table
CREATE TABLE public.training_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  training_id UUID NOT NULL REFERENCES public.trainings(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'failed'
  notes TEXT,
  UNIQUE(training_id, participant_id)
);

-- Enable RLS
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversations
CREATE POLICY "Users can view conversations they participate in"
ON public.conversations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.conversation_participants 
    WHERE conversation_id = conversations.id AND user_id = auth.uid()
  )
);

-- RLS Policies for conversation_participants
CREATE POLICY "Users can view participants of their conversations"
ON public.conversation_participants FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.conversation_participants cp2 
    WHERE cp2.conversation_id = conversation_participants.conversation_id AND cp2.user_id = auth.uid()
  )
);

CREATE POLICY "Users can join conversations"
ON public.conversation_participants FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own participation"
ON public.conversation_participants FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their conversations"
ON public.messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.conversation_participants 
    WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can send messages to their conversations"
ON public.messages FOR INSERT
WITH CHECK (
  auth.uid() = sender_id AND
  EXISTS (
    SELECT 1 FROM public.conversation_participants 
    WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own messages"
ON public.messages FOR UPDATE
USING (auth.uid() = sender_id);

-- RLS Policies for trainings
CREATE POLICY "Everyone can view active trainings"
ON public.trainings FOR SELECT
USING (is_active = true);

CREATE POLICY "Organizers can manage their own trainings"
ON public.trainings FOR ALL
USING (auth.uid() = organizer_id);

-- RLS Policies for training_registrations
CREATE POLICY "Participants can view their own registrations"
ON public.training_registrations FOR SELECT
USING (auth.uid() = participant_id);

CREATE POLICY "Organizers can view registrations for their trainings"
ON public.training_registrations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.trainings 
    WHERE id = training_registrations.training_id AND organizer_id = auth.uid()
  )
);

CREATE POLICY "Users can register for trainings"
ON public.training_registrations FOR INSERT
WITH CHECK (auth.uid() = participant_id);

CREATE POLICY "Participants can update their own registrations"
ON public.training_registrations FOR UPDATE
USING (auth.uid() = participant_id);

CREATE POLICY "Organizers can update registrations for their trainings"
ON public.training_registrations FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.trainings 
    WHERE id = training_registrations.training_id AND organizer_id = auth.uid()
  )
);

-- Create indexes for better performance
CREATE INDEX idx_conversation_participants_user_id ON public.conversation_participants(user_id);
CREATE INDEX idx_conversation_participants_conversation_id ON public.conversation_participants(conversation_id);
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_trainings_format ON public.trainings(format);
CREATE INDEX idx_trainings_start_date ON public.trainings(start_date);
CREATE INDEX idx_training_registrations_participant_id ON public.training_registrations(participant_id);
CREATE INDEX idx_training_registrations_training_id ON public.training_registrations(training_id);

-- Create triggers for updating timestamps
CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trainings_updated_at
  BEFORE UPDATE ON public.trainings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();