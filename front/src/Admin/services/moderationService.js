import API from './api';

export const moderationService = {
  // Obtenir la liste des signalements
  getSignalements: async (params = {}) => {
    try {
      const response = await API.get('/admin/signalements', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des signalements' };
    }
  },

  // Obtenir les détails d'un signalement
  getSignalementById: async (signalementId) => {
    try {
      const response = await API.get(`/admin/signalements/${signalementId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération du signalement' };
    }
  },

  // Résoudre un signalement
  resolveSignalement: async (signalementId, data) => {
    try {
      const response = await API.put(`/admin/signalements/${signalementId}/resolve`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la résolution du signalement' };
    }
  },

  // Rejeter un signalement
  rejectSignalement: async (signalementId, motif) => {
    try {
      const response = await API.put(`/admin/signalements/${signalementId}/reject`, { motif });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors du rejet du signalement' };
    }
  },

  // Appliquer une sanction
  applySanction: async (data) => {
    try {
      const response = await API.post('/admin/sanctions', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de l\'application de la sanction' };
    }
  },

  // Obtenir les sanctions actives
  getActiveSanctions: async () => {
    try {
      const response = await API.get('/admin/sanctions');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des sanctions' };
    }
  },

  // Obtenir les sanctions d'un utilisateur
  getUserSanctions: async (userId) => {
    try {
      const response = await API.get(`/admin/sanctions/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la récupération des sanctions utilisateur' };
    }
  },

  // Supprimer un contenu
  deleteContent: async (contentType, contentId) => {
    try {
      const response = await API.delete(`/admin/content/${contentType}/${contentId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la suppression du contenu' };
    }
  },

  // Suspendre un compte
  suspendAccount: async (userId, data) => {
    try {
      const response = await API.post('/admin/sanctions', {
        user_id: userId,
        type: data.permanent ? 'SUSPENSION_PERMANENTE' : 'SUSPENSION_TEMPORAIRE',
        motif: data.motif,
        duree_jours: data.permanent ? null : data.duree_jours || 30,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur lors de la suspension du compte' };
    }
  },
};

export default moderationService;