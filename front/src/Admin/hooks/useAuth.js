import { useState, useEffect } from 'react';
import authService from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Vérifie le token via GET /auth/me au démarrage
    const checkAuth = async () => {
      const storedUser = authService.getCurrentUser();
      if (!storedUser || !authService.isAuthenticated()) {
        setLoading(false);
        return;
      }
      try {
        const data = await authService.getMe();
        setUser(data.user ?? data);
      } catch {
        // Token invalide → on nettoie
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const data = await authService.login(email, password);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message || 'Erreur de connexion');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    } finally {
      setUser(null);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: authService.isAuthenticated(),
    isAdmin: authService.isAdmin(),
  };
};

export default useAuth;