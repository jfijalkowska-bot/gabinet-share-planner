import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Check, X, Users, Briefcase, Building2, Star, CreditCard, Calendar, FileText, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

type PlanType = 'client' | 'wizytowka' | 'therapist' | 'owner';

const plans = [
  {
    id: 'client' as PlanType,
    name: "Klient",
    description: "Dla osób szukających terapeuty lub gabinetu",
    price: "0",
    period: "za darmo",
    icon: Users,
    popular: false,
    features: [
      { name: "Wyszukiwarka terapeutów", included: true },
      { name: "Wyszukiwarka gabinetów", included: true },
      { name: "Dostęp do forum ogólnego", included: true },
      { name: "Rezerwacja wizyt online", included: true },
      { name: "Program partnerski", included: true },
      { name: "Forum specjalistów", included: false },
      { name: "Superwizje i szkolenia", included: false },
      { name: "Profil terapeuty publiczny", included: false },
      { name: "Kalendarz z widget do embed", included: false },
      { name: "Dokumentacja pacjentów + AI", included: false },
      { name: "Zarządzanie gabinetem", included: false },
    ],
    cta: "Załóż darmowe konto",
    ctaVariant: "outline" as const,
    isPaid: false,
  },
  {
    id: 'wizytowka' as PlanType,
    name: "Wizytówka",
    description: "Publiczny profil w wyszukiwarce",
    price: "49",
    period: "PLN jednorazowo",
    icon: CreditCard,
    popular: false,
    features: [
      { name: "Wyszukiwarka terapeutów", included: true },
      { name: "Wyszukiwarka gabinetów", included: true },
      { name: "Dostęp do forum ogólnego", included: true },
      { name: "Rezerwacja wizyt online", included: true },
      { name: "Program partnerski", included: true },
      { name: "Forum specjalistów", included: false },
      { name: "Superwizje i szkolenia", included: false },
      { name: "Profil terapeuty publiczny", included: true },
      { name: "Kalendarz z widget do embed", included: false },
      { name: "Dokumentacja pacjentów + AI", included: false },
      { name: "Zarządzanie gabinetem", included: false },
    ],
    cta: "Kup wizytówkę",
    ctaVariant: "outline" as const,
    isPaid: true,
  },
  {
    id: 'therapist' as PlanType,
    name: "Terapeuta",
    description: "Pełny pakiet dla psychologów i psychoterapeutów",
    price: "49",
    period: "PLN/miesiąc",
    icon: Briefcase,
    popular: true,
    trial: "30 dni za darmo",
    features: [
      { name: "Wyszukiwarka terapeutów", included: true },
      { name: "Wyszukiwarka gabinetów", included: true },
      { name: "Dostęp do forum ogólnego", included: true },
      { name: "Rezerwacja wizyt online", included: true },
      { name: "Program partnerski", included: true },
      { name: "Forum specjalistów", included: true },
      { name: "Superwizje i szkolenia", included: true },
      { name: "Profil terapeuty publiczny", included: true },
      { name: "Kalendarz z widget do embed", included: true },
      { name: "Dokumentacja pacjentów + AI", included: true },
      { name: "Zarządzanie gabinetem", included: false },
    ],
    cta: "Rozpocznij okres próbny",
    ctaVariant: "default" as const,
    isPaid: true,
  },
  {
    id: 'owner' as PlanType,
    name: "Właściciel",
    description: "Dla właścicieli gabinetów i klinik",
    price: "59",
    period: "PLN/miesiąc",
    icon: Building2,
    popular: false,
    trial: "30 dni za darmo",
    features: [
      { name: "Wyszukiwarka terapeutów", included: true },
      { name: "Wyszukiwarka gabinetów", included: true },
      { name: "Dostęp do forum ogólnego", included: true },
      { name: "Rezerwacja wizyt online", included: true },
      { name: "Program partnerski", included: true },
      { name: "Forum specjalistów", included: true },
      { name: "Superwizje i szkolenia", included: true },
      { name: "Profil terapeuty publiczny", included: true },
      { name: "Kalendarz z widget do embed", included: true },
      { name: "Dokumentacja pacjentów + AI", included: true },
      { name: "Zarządzanie gabinetem", included: true },
    ],
    cta: "Rozpocznij okres próbny",
    ctaVariant: "default" as const,
    isPaid: true,
  },
];

const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<PlanType | null>(null);

  const handlePlanClick = async (planId: PlanType) => {
    if (planId === 'client') {
      navigate('/register');
      return;
    }

    if (!user) {
      toast.info("Zaloguj się, aby wybrać plan");
      navigate('/login');
      return;
    }

    setLoading(planId);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planType: planId }
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error('Błąd przy tworzeniu sesji płatności');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="py-16 bg-therapy-50">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Prosty i przejrzysty cennik
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Wybierz plan dopasowany do Twoich potrzeb. Subskrypcje
              zawierają 30-dniowy bezpłatny okres próbny.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative flex flex-col ${
                    plan.popular
                      ? "border-therapy-500 border-2 shadow-xl scale-105 z-10"
                      : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-therapy-600 text-white px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        Najpopularniejszy
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-therapy-100">
                      <plan.icon className="w-8 h-8 text-therapy-600" />
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <div className="text-center mb-6">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2 text-sm">
                        {plan.period}
                      </span>
                      {plan.trial && (
                        <p className="text-sm text-therapy-600 font-medium mt-2">
                          {plan.trial}
                        </p>
                      )}
                    </div>

                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li
                          key={feature.name}
                          className="flex items-center gap-2 text-sm"
                        >
                          {feature.included ? (
                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                          ) : (
                            <X className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                          )}
                          <span
                            className={
                              feature.included
                                ? "text-foreground"
                                : "text-muted-foreground/60"
                            }
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      onClick={() => handlePlanClick(plan.id)}
                      variant={plan.ctaVariant}
                      disabled={loading !== null}
                      className={`w-full ${
                        plan.popular
                          ? "bg-therapy-600 hover:bg-therapy-700"
                          : ""
                      }`}
                    >
                      {loading === plan.id ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : null}
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features Highlight */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <Calendar className="w-12 h-12 text-therapy-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Kalendarz z Widget</h3>
                <p className="text-sm text-muted-foreground">
                  Umieść kalendarz rezerwacji na swojej stronie WWW
                </p>
              </div>
              <div className="text-center">
                <FileText className="w-12 h-12 text-therapy-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Dokumentacja + AI</h3>
                <p className="text-sm text-muted-foreground">
                  Notatki z sesji, transkrypcja głosu, analiza AI
                </p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-therapy-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Program Partnerski</h3>
                <p className="text-sm text-muted-foreground">
                  Zarabiaj 10% prowizji za każde polecenie
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ / Additional Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Często zadawane pytania
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Czy mogę anulować w dowolnym momencie?
                </h3>
                <p className="text-muted-foreground">
                  Tak, możesz anulować subskrypcję w dowolnym momencie. Dostęp
                  do funkcji premium będzie aktywny do końca opłaconego okresu.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Co obejmuje okres próbny?
                </h3>
                <p className="text-muted-foreground">
                  Przez 30 dni masz pełny dostęp do wszystkich funkcji wybranego
                  planu. Nie pobieramy opłaty, jeśli anulujesz przed końcem
                  okresu próbnego.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Jak działają płatności między terapeutą a pacjentem?
                </h3>
                <p className="text-muted-foreground">
                  Platforma nie pośredniczy w płatnościach za sesje terapeutyczne.
                  Rozliczenia odbywają się bezpośrednio między terapeutą a klientem.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Czym różni się Wizytówka od planu Terapeuta?
                </h3>
                <p className="text-muted-foreground">
                  Wizytówka to jednorazowa opłata za publiczny profil. Plan Terapeuta 
                  dodatkowo daje dostęp do kalendarza, dokumentacji pacjentów z AI i forum specjalistów.
                </p>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Masz dodatkowe pytania?
              </p>
              <Button asChild variant="outline">
                <Link to="/contact">Skontaktuj się z nami</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Program partnerski */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <Card className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-therapy-50 to-white">
              <h2 className="text-2xl font-bold mb-4">Program partnerski</h2>
              <p className="text-muted-foreground mb-6">
                Niezależnie od wybranego planu, możesz zarabiać 10% prowizji za
                każde polecenie nowego płatnego użytkownika. Prowizja wypłacana
                co miesiąc!
              </p>
              <Button asChild className="bg-therapy-600 hover:bg-therapy-700">
                <Link to="/affiliate">Dowiedz się więcej</Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
