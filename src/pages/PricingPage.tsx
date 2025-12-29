import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Check, X, Users, Briefcase, Building2, Star } from "lucide-react";

const plans = [
  {
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
      { name: "Forum specjalistów", included: false },
      { name: "Superwizje i szkolenia", included: false },
      { name: "Profil terapeuty", included: false },
      { name: "Dokumentacja pacjentów", included: false },
      { name: "Zarządzanie gabinetem", included: false },
    ],
    cta: "Załóż darmowe konto",
    ctaVariant: "outline" as const,
  },
  {
    name: "Terapeuta",
    description: "Dla psychologów i psychoterapeutów",
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
      { name: "Forum specjalistów", included: true },
      { name: "Superwizje i szkolenia", included: true },
      { name: "Profil terapeuty publiczny", included: true },
      { name: "Dokumentacja pacjentów + AI", included: true },
      { name: "Zarządzanie gabinetem", included: false },
    ],
    cta: "Rozpocznij okres próbny",
    ctaVariant: "default" as const,
  },
  {
    name: "Właściciel",
    description: "Dla właścicieli gabinetów i klinik",
    price: "99",
    period: "PLN/miesiąc",
    icon: Building2,
    popular: false,
    trial: "30 dni za darmo",
    features: [
      { name: "Wyszukiwarka terapeutów", included: true },
      { name: "Wyszukiwarka gabinetów", included: true },
      { name: "Dostęp do forum ogólnego", included: true },
      { name: "Rezerwacja wizyt online", included: true },
      { name: "Forum specjalistów", included: true },
      { name: "Superwizje i szkolenia", included: true },
      { name: "Profil terapeuty publiczny", included: true },
      { name: "Dokumentacja pacjentów + AI", included: true },
      { name: "Zarządzanie gabinetem", included: true },
    ],
    cta: "Rozpocznij okres próbny",
    ctaVariant: "default" as const,
  },
];

const PricingPage = () => {
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
              Wybierz plan dopasowany do Twoich potrzeb. Wszystkie płatne plany
              zawierają 30-dniowy bezpłatny okres próbny.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative flex flex-col ${
                    plan.popular
                      ? "border-therapy-500 border-2 shadow-xl scale-105"
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
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <div className="text-center mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">
                        {plan.period}
                      </span>
                      {plan.trial && (
                        <p className="text-sm text-therapy-600 font-medium mt-2">
                          {plan.trial}
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature.name}
                          className="flex items-center gap-3"
                        >
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-500 shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground/40 shrink-0" />
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
                      asChild
                      variant={plan.ctaVariant}
                      className={`w-full ${
                        plan.popular
                          ? "bg-therapy-600 hover:bg-therapy-700"
                          : ""
                      }`}
                    >
                      <Link to="/register">{plan.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ / Additional Info */}
        <section className="py-16 bg-muted/30">
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
                  Czy mogę zmienić plan później?
                </h3>
                <p className="text-muted-foreground">
                  Oczywiście! Możesz w dowolnym momencie przejść na wyższy plan
                  lub obniżyć go przy następnym cyklu rozliczeniowym.
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
        <section className="py-16">
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
