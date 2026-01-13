import API from './api';

export const statsService = {
  // Obtenir les statistiques globales
  getGlobalStats: async () => {
    try {
      const response = await API.get('/admin/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des statistiques' };
    }
  },

  // Obtenir les statistiques des utilisateurs
  getUserStats: async () => {
    try {
      const response = await API.get('/admin/stats/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des stats utilisateurs' };
    }
  },

  // Obtenir les statistiques des services
  getServiceStats: async () => {
    try {
      const response = await API.get('/admin/stats/services');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des stats services' };
    }
  },

  // Obtenir l'activité récente
  getRecentActivity: async (limit = 10) => {
    try {
      const response = await API.get('/admin/activity', { params: { limit } });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération de l\'activité' };
    }
  },

  // Obtenir les statistiques d'un atelier
  getAtelierStats: async (atelierId) => {
    try {
      const response = await API.get(`/admin/ateliers/${atelierId}/stats`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des stats atelier' };
    }
  },
};

export default statsService;