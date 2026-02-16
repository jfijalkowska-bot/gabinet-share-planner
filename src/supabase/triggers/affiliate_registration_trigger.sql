
-- Aktywuj trigger dla funkcji obsługującej program partnerski
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_affiliate_registration();
