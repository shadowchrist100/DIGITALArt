import { Navigate } from 'react-router-dom';
import { useAuth } from '../Clients/components/Auth/AuthContext';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, accesToken } = useAuth();

  // Pas connecté → login
  if (!accesToken || !user) {
    return <Navigate to="/login" replace />;
  }

  // Rôle non autorisé
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}