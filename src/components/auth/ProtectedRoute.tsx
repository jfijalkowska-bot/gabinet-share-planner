
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Jeśli trwa ładowanie, wyświetlamy ekran ładowania
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-therapy-600"></div>
      </div>
    );
  }

  // Jeśli brak zalogowanego użytkownika, przekieruj do strony logowania
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jeśli użytkownik jest zalogowany, wyświetlamy zawartość
  return <>{children}</>;
};

export default ProtectedRoute;
