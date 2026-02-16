
-- 1. Fix get_affiliate_earnings: add authorization check
CREATE OR REPLACE FUNCTION public.get_affiliate_earnings(affiliate_id uuid)
 RETURNS TABLE(total_earnings numeric, pending_earnings numeric, paid_earnings numeric)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $$
BEGIN
  -- Authorization: only own earnings or admin
  IF affiliate_id != auth.uid() AND NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Unauthorized: can only view own earnings';
  END IF;

  RETURN QUERY
  SELECT
    COALESCE(SUM(ac.commission), 0) AS total_earnings,
    COALESCE(SUM(CASE WHEN ac.status IN ('pending', 'pending_payout', 'registered') THEN ac.commission ELSE 0 END), 0) AS pending_earnings,
    COALESCE(SUM(CASE WHEN ac.status = 'paid' THEN ac.commission ELSE 0 END), 0) AS paid_earnings
  FROM affiliate_conversions ac
  WHERE ac.referrer_id = affiliate_id;
END;
$$;

-- 2. Analytics: add constraints for input validation
ALTER TABLE public.analytics_events
ADD CONSTRAINT valid_event_type CHECK (
  event_type IN ('page_view', 'click', 'conversion', 'signup', 'booking_completed', 'search', 'ai_chat_request', 'audio_transcription')
);

ALTER TABLE public.analytics_events
ADD CONSTRAINT page_url_length CHECK (
  page_url IS NULL OR length(page_url) <= 2048
);

ALTER TABLE public.analytics_events
ADD CONSTRAINT referrer_length CHECK (
  referrer IS NULL OR length(referrer) <= 4096
);

ALTER TABLE public.analytics_events
ADD CONSTRAINT user_agent_length CHECK (
  user_agent IS NULL OR length(user_agent) <= 1024
);
