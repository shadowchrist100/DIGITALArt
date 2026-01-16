import { useState, useEffect } from 'react';
import { statsService } from '../services/statsService';

export const useStats = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalArtisans: 0,
    totalAteliers: 0,
    totalServices: 0,
    totalAvis: 0,
    artisansEnAttente: 0,
    serviceEnCours: 0,
    rdvAujourdhui: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await statsService.getGlobalStats();
      setStats(data);
    } catch (err) {
      setError(err.message || 'Erreur lors de la récupération des statistiques');
      console.error('Erreur stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const refresh = () => {
    fetchStats();
  };

  return {
    stats,
    loading,
    error,
    refresh,
  };
};

export default useStats;