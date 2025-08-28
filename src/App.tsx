
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Index from "./pages/Index";

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
const TherapistProfileDemo = lazy(() => import("./pages/TherapistProfileDemo"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/supervisions" element={<SupervisionsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/rental" element={<RentalPage />} />
              <Route path="/appointments" element={<AppointmentsPage />} />
              <Route path="/management" element={<ManagementPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/trainings" element={<TrainingsPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/payments-info" element={<PaymentsInfoPage />} />
              <Route path="/affiliate" element={<AffiliatePage />} />
              <Route path="/embed" element={<EmbedPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/therapist-demo" element={<TherapistProfileDemo />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
