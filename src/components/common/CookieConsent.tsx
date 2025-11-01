import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom">
      <Card className="max-w-4xl mx-auto p-6 shadow-lg border-2">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Używamy plików cookies</h3>
            <p className="text-sm text-muted-foreground">
              Ta strona używa plików cookies w celu zapewnienia prawidłowego funkcjonowania serwisu, 
              analizy ruchu oraz poprawy doświadczeń użytkownika. Korzystając z serwisu, zgadzasz się 
              na używanie cookies zgodnie z{" "}
              <Link to="/terms" className="underline hover:text-primary">
                Polityką Cookies
              </Link>.
            </p>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            <Button 
              variant="outline" 
              onClick={declineCookies}
              className="whitespace-nowrap"
            >
              Odrzuć
            </Button>
            <Button 
              onClick={acceptCookies}
              className="bg-therapy-600 hover:bg-therapy-700 whitespace-nowrap"
            >
              Akceptuję
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;
