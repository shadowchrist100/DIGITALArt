import API from './api';

export const authService = {
  // Connexion admin
  login: async (email, password) => {
    try {
      const response = await API.post('/admin/login', { email, password });
      
      // Stocker le token et les infos utilisateur
      if (response.data.token) {
        localStorage.setItem('admin_token', response.data.token);
        localStorage.setItem('admin_user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur de connexion' };
    }
  },

  // Déconnexion
  logout: async () => {
    try {
      await API.post('/admin/logout');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      // Nettoyer le localStorage même en cas d'erreur
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/login';
    }
  },

  // Obtenir l'utilisateur actuel
  getCurrentUser: () => {
    const userStr = localStorage.getItem('admin_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('admin_token');
  },

  // Vérifier si l'utilisateur est admin
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user && user.role === 'ADMIN';
  },

  // Obtenir le profil admin
  getProfile: async () => {
    try {
      const response = await API.get('/admin/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération du profil' };
    }
  },
};

export default authService;