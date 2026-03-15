import { useState, useEffect, useCallback } from 'react';
import moderationService from '../services/moderationService';

export const useModeration = () => {
  const [avis, setAvis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAvis = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await moderationService.getAvis();
      setAvis(data.data ?? data);
    } catch (err) {
      setError(err.message || 'Erreur lors de la récupération des avis');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAvis();
  }, [fetchAvis]);

  // Supprimer un avis → DELETE /admin/avis/{id}
  const deleteAvis = async (avisId) => {
    await moderationService.deleteAvis(avisId);
    fetchAvis();
  };

  // Suspendre un user → PATCH /admin/users/{id}/suspendre
  const suspendreUser = async (userId) => {
    await moderationService.suspendreUser(userId);
    fetchAvis();
  };

  // Réactiver un user → PATCH /admin/users/{id}/reactiver
  const reactiverUser = async (userId) => {
    await moderationService.reactiverUser(userId);
    fetchAvis();
  };

  // Suspendre un atelier → PATCH /admin/ateliers/{id}/suspendre
  const suspendreAtelier = async (atelierId) => {
    await moderationService.suspendreAtelier(atelierId);
    fetchAvis();
  };

  // Réactiver un atelier → PATCH /admin/ateliers/{id}/reactiver
  const reactiverAtelier = async (atelierId) => {
    await moderationService.reactiverAtelier(atelierId);
    fetchAvis();
  };

  const refresh = () => fetchAvis();

  return {
    avis,
    loading,
    error,
    deleteAvis,
    suspendreUser,
    reactiverUser,
    suspendreAtelier,
    reactiverAtelier,
    refresh,
  };
};

export default useModeration;