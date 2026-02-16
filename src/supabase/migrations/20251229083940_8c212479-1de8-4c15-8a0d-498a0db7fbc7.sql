-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create payment_exemptions table
CREATE TABLE public.payment_exemptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    exemption_type TEXT NOT NULL DEFAULT 'full',
    reason TEXT,
    granted_by UUID REFERENCES auth.users(id),
    valid_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.payment_exemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage payment exemptions"
ON public.payment_exemptions FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own exemption"
ON public.payment_exemptions FOR SELECT
USING (auth.uid() = user_id);

-- Create analytics_events table
CREATE TABLE public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    event_data JSONB DEFAULT '{}',
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address TEXT,
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all analytics"
ON public.analytics_events FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert analytics events"
ON public.analytics_events FOR INSERT
WITH CHECK (true);

-- Create indexes for analytics performance
CREATE INDEX idx_analytics_events_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at);
CREATE INDEX idx_analytics_events_user_id ON public.analytics_events(user_id);

-- Trigger for payment_exemptions updated_at
CREATE TRIGGER update_payment_exemptions_updated_at
BEFORE UPDATE ON public.payment_exemptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();