import { useState, useEffect, useCallback } from 'react';
import { moderationService } from '../services/moderationService';

export const useModeration = (filters = {}) => {
  const [signalements, setSignalements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSignalements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await moderationService.getSignalements(filters);
      setSignalements(data);
    } catch (err) {
      setError(err.message || 'Erreur lors de la récupération des signalements');
      console.error('Erreur signalements:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchSignalements();
  }, [fetchSignalements]);

  const resolveSignalement = async (signalementId, data) => {
    await moderationService.resolveSignalement(signalementId, data);
    fetchSignalements(); // Rafraîchir la liste
  };

  const rejectSignalement = async (signalementId, motif) => {
    await moderationService.rejectSignalement(signalementId, motif);
    fetchSignalements(); // Rafraîchir la liste
  };

  const suspendAccount = async (userId, data) => {
    await moderationService.suspendAccount(userId, data);
    fetchSignalements(); // Rafraîchir la liste
  };

  const deleteContent = async (contentType, contentId) => {
    await moderationService.deleteContent(contentType, contentId);
    fetchSignalements(); // Rafraîchir la liste
  };

  const refresh = () => {
    fetchSignalements();
  };

  return {
    signalements,
    loading,
    error,
    resolveSignalement,
    rejectSignalement,
    suspendAccount,
    deleteContent,
    refresh,
  };
};

export default useModeration;