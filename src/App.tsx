
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth/AuthProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Index from "@/pages/Index";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import SearchPage from "@/pages/SearchPage";
import CalendarPage from "@/pages/CalendarPage";
import AppointmentsPage from "@/pages/AppointmentsPage";
import ManagementPage from "@/pages/ManagementPage";
import RentalPage from "@/pages/RentalPage";
import EmbedPage from "@/pages/EmbedPage";
import CommunityPage from "@/pages/CommunityPage";
import AffiliatePage from "@/pages/AffiliatePage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import NotFound from "@/pages/NotFound";
import PaymentsInfoPage from "@/pages/PaymentsInfoPage";
import TermsPage from "@/pages/TermsPage";

import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Strony dostępne dla wszystkich bez logowania */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/affiliate" element={<AffiliatePage />} />
          <Route path="/payments-info" element={<PaymentsInfoPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
          <Route path="/rental" element={<ProtectedRoute><RentalPage /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
          
          {/* Strony wymagające uwierzytelnienia */}
          <Route path="/appointments" element={<ProtectedRoute requireAuth={true}><AppointmentsPage /></ProtectedRoute>} />
          <Route path="/management" element={<ProtectedRoute requireAuth={true}><ManagementPage /></ProtectedRoute>} />
          <Route path="/embed" element={<ProtectedRoute requireAuth={true}><EmbedPage /></ProtectedRoute>} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
