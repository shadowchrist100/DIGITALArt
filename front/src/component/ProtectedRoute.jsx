import { Navigate } from 'react-router-dom';
import { authService } from '../Admin/services/authService';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  // Si pas connecté, rediriger vers login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si des rôles sont spécifiés et que l'utilisateur n'a pas le bon rôle
  if (allowedRoles.length > 0 && currentUser) {
    if (!allowedRoles.includes(currentUser.role)) {
      // Rediriger vers la page appropriée selon le rôle
      if (currentUser.role === 'CLIENT') {
        return <Navigate to="/" replace />;
      }
      if (currentUser.role === 'ARTISAN') {
        return <Navigate to="/artisan/dashboard" replace />;
      }
      return <Navigate to="/" replace />;
    }
  }

  return children;
}