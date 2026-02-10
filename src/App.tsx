import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Index from "./pages/Index";
import CookieConsent from "@/components/common/CookieConsent";
import { useAnalytics } from "@/hooks/useAnalytics";
import LanguageLayout from "@/components/layout/LanguageLayout";
import LanguageRedirect from "@/components/common/LanguageRedirect";
import HreflangTags from "@/components/common/HreflangTags";
import "./i18n/config";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

const SupervisionsPage = lazy(() => import("./pages/SupervisionsPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const CalendarPage = lazy(() => import("./pages/CalendarPage"));
const RentalPage = lazy(() => import("./pages/RentalPage"));
const AppointmentsPage = lazy(() => import("./pages/AppointmentsPage"));
const ManagementPage = lazy(() => import("./pages/ManagementPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const MessagesPage = lazy(() => import("./pages/MessagesPage"));
const TrainingsPage = lazy(() => import("./pages/TrainingsPage"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorksPage"));
const PaymentsInfoPage = lazy(() => import("./pages/PaymentsInfoPage"));
const AffiliatePage = lazy(() => import("./pages/AffiliatePage"));
const EmbedPage = lazy(() => import("./pages/EmbedPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const GDPRPage = lazy(() => import("./pages/GDPRPage"));
const KnowledgeBasePage = lazy(() => import("./pages/KnowledgeBasePage"));
const TherapistProfileDemo = lazy(() => import("./pages/TherapistProfileDemo"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));
const PatientsPage = lazy(() => import("./pages/PatientsPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AnalyticsWrapper = ({ children }: { children: React.ReactNode }) => {
  useAnalytics();
  return <>{children}</>;
};

const AppRoutes = () => (
  <Route element={<LanguageLayout />}>
    <Route index element={<Index />} />
    <Route path="supervisions" element={<SupervisionsPage />} />
    <Route path="search" element={<SearchPage />} />
    <Route path="calendar" element={<CalendarPage />} />
    <Route path="rental" element={<RentalPage />} />
    <Route path="appointments" element={<AppointmentsPage />} />
    <Route path="management" element={<ManagementPage />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />
    <Route path="community" element={<CommunityPage />} />
    <Route path="messages" element={<MessagesPage />} />
    <Route path="trainings" element={<TrainingsPage />} />
    <Route path="how-it-works" element={<HowItWorksPage />} />
    <Route path="payments-info" element={<PaymentsInfoPage />} />
    <Route path="affiliate" element={<AffiliatePage />} />
    <Route path="embed" element={<EmbedPage />} />
    <Route path="terms" element={<TermsPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="gdpr" element={<GDPRPage />} />
    <Route path="knowledge-base" element={<KnowledgeBasePage />} />
    <Route path="therapist-demo" element={<TherapistProfileDemo />} />
    <Route path="payment-success" element={<PaymentSuccessPage />} />
    <Route 
      path="patients" 
      element={
        <ProtectedRoute excludeRoles={['client']}>
          <PatientsPage />
        </ProtectedRoute>
      } 
    />
    <Route path="pricing" element={<PricingPage />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CookieConsent />
        <AuthProvider>
          <AnalyticsWrapper>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* Root redirect based on browser language */}
                <Route path="/" element={<LanguageRedirect />} />
                
                {/* Language-prefixed routes */}
                <Route path="/:lang">
                  {AppRoutes()}
                </Route>

                {/* Fallback for old unprefixed routes - redirect to default lang */}
                <Route path="*" element={<LanguageRedirect />} />
              </Routes>
            </Suspense>
          </AnalyticsWrapper>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
