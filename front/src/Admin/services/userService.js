import API from './api';

export const userService = {
  // Obtenir la liste des utilisateurs avec pagination et filtres
  getUsers: async (params = {}) => {
    try {
      const response = await API.get('/admin/users', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des utilisateurs' };
    }
  },

  // Obtenir les détails d'un utilisateur
  getUserById: async (userId) => {
    try {
      const response = await API.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération de l\'utilisateur' };
    }
  },

  // Mettre à jour un utilisateur
  updateUser: async (userId, data) => {
    try {
      const response = await API.put(`/admin/users/${userId}`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la mise à jour de l\'utilisateur' };
    }
  },

  // Changer le statut d'un utilisateur
  updateUserStatus: async (userId, status) => {
    try {
      const response = await API.put(`/admin/users/${userId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors du changement de statut' };
    }
  },

  // Supprimer un utilisateur
  deleteUser: async (userId) => {
    try {
      const response = await API.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la suppression de l\'utilisateur' };
    }
  },

  // Obtenir l'historique d'un utilisateur
  getUserHistory: async (userId) => {
    try {
      const response = await API.get(`/admin/users/${userId}/history`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération de l\'historique' };
    }
  },

  // Obtenir les artisans en attente de vérification
  getPendingArtisans: async () => {
    try {
      const response = await API.get('/admin/artisans/pending');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des artisans en attente' };
    }
  },

  // Approuver un artisan
  approveArtisan: async (artisanId, data = {}) => {
    try {
      const response = await API.put(`/admin/artisans/${artisanId}/approve`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de l\'approbation de l\'artisan' };
    }
  },

  // Refuser un artisan
  rejectArtisan: async (artisanId, motif) => {
    try {
      const response = await API.put(`/admin/artisans/${artisanId}/reject`, { motif });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors du refus de l\'artisan' };
    }
  },
};

export default userService;