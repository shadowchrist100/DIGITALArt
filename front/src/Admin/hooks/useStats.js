import { useState, useEffect } from 'react';
import statsService from '../services/statsService';

export const useStats = () => {
  const [stats, setStats] = useState(null);
  const [inscriptions, setInscriptions] = useState(null);
  const [servicesEvolution, setServicesEvolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // GET /admin/dashboard
      const dashboardData = await statsService.getDashboard();
      setStats(dashboardData);

      // GET /admin/dashboard/inscriptions
      const inscriptionsData = await statsService.getInscriptions();
      setInscriptions(inscriptionsData);

      // GET /admin/dashboard/services-evolution
      const evolutionData = await statsService.getServicesEvolution();
      setServicesEvolution(evolutionData);

    } catch (err) {
      setError(err.message || 'Erreur lors de la récupération des statistiques');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const refresh = () => fetchStats();

  return {
    stats,
    inscriptions,
    servicesEvolution,
    loading,
    error,
    refresh,
  };
};

export default useStats;