-- Najpierw usuń starą funkcję
DROP FUNCTION IF EXISTS public.get_affiliate_earnings(uuid);

-- Utwórz nową funkcję z zaktualizowanymi statusami
CREATE OR REPLACE FUNCTION public.get_affiliate_earnings(affiliate_id UUID)
RETURNS TABLE(
  total_earnings NUMERIC,
  pending_earnings NUMERIC,
  paid_earnings NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(SUM(ac.commission), 0) AS total_earnings,
    COALESCE(SUM(CASE WHEN ac.status IN ('pending', 'pending_payout', 'registered') THEN ac.commission ELSE 0 END), 0) AS pending_earnings,
    COALESCE(SUM(CASE WHEN ac.status = 'paid' THEN ac.commission ELSE 0 END), 0) AS paid_earnings
  FROM affiliate_conversions ac
  WHERE ac.referrer_id = affiliate_id;
END;
$$;