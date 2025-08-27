-- Fix security issues by setting search_path for functions
ALTER FUNCTION public.update_updated_at_column() 
SET search_path = public;

ALTER FUNCTION public.get_affiliate_earnings(uuid) 
SET search_path = public;

ALTER FUNCTION public.handle_affiliate_registration() 
SET search_path = public;