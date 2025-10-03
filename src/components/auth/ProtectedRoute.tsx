
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  excludeRoles?: string[]; // Role, które NIE mają dostępu
}

const ProtectedRoute = ({ children, requireAuth = false, excludeRoles = [] }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const accountType = user?.user_metadata?.account_type;

  // Jeśli trwa ładowanie, wyświetlamy ekran ładowania
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-therapy-600"></div>
      </div>
    );
  }

  // Jeśli strona wymaga uwierzytelnienia i nie ma zalogowanego użytkownika, przekieruj do strony logowania
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Sprawdź czy rola użytkownika jest wykluczona
  if (user && excludeRoles.length > 0 && accountType && excludeRoles.includes(accountType)) {
    return <Navigate to="/" replace />;
  }

  // W przeciwnym razie wyświetlamy zawartość
  return <>{children}</>;
};

export default ProtectedRoute;
