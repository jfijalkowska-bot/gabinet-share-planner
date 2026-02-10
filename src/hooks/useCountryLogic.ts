import { useLanguagePrefix } from "./useLanguagePrefix";

export type CountryMarket = "PL" | "IT";

export const useCountryLogic = () => {
  const { currentLang } = useLanguagePrefix();

  const market: CountryMarket = currentLang === "it" ? "IT" : "PL";

  const isItaly = market === "IT";
  const isPoland = market === "PL";

  // Italy: payment required at booking; Poland: no payment required
  const requiresPaymentAtBooking = isItaly;

  // Italy: free 15-min consultation available
  const hasFreeConsultation = isItaly;

  // Italy: 15min + 50min slots; Poland: standard slots
  const defaultSlotMinutes = isItaly ? [15, 50] : [30, 60, 90, 120];

  return {
    market,
    isItaly,
    isPoland,
    requiresPaymentAtBooking,
    hasFreeConsultation,
    defaultSlotMinutes,
    currentLang,
  };
};
