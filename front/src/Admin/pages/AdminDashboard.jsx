import { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  Store,
  Star,
  Calendar,
  TrendingUp,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import statsService from '../services/statsService';

const StatCard = ({ icon, title, value, color, bgColor, trend }) => {
  const Icon = icon;
  return (
    <div
      className="p-6 transition-all shadow-md rounded-xl hover:shadow-lg"
      style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-1 text-sm font-medium" style={{ color: '#6c757d' }}>
            {title}
          </p>
          <h3 className="text-3xl font-bold" style={{ color: '#2b2d42' }}>
            {(value ?? 0).toLocaleString()}
          </h3>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4" style={{ color: '#22c55e' }} />
              <span className="text-xs font-medium" style={{ color: '#22c55e' }}>
                +{trend}%
              </span>
              <span className="text-xs" style={{ color: '#6c757d' }}>
                ce mois
              </span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: bgColor }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await statsService.getDashboard();
        setStats(data);
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement des statistiques');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="p-4 text-red-600 bg-red-100 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="mx-auto max-w-7xl">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold" style={{ color: '#2b2d42' }}>
            Tableau de bord
          </h1>
          <p className="text-sm" style={{ color: '#6c757d' }}>
            Vue d'ensemble de la plateforme ArtisanConnect
          </p>
        </div>

        {/* Alerte artisans en attente */}
        {stats?.artisans_en_attente > 0 && (
          <div
            className="flex items-center gap-3 p-4 mb-6 rounded-lg"
            style={{
              backgroundColor: 'rgba(255, 193, 7, 0.1)',
              border: '1px solid rgba(255, 193, 7, 0.3)'
            }}
          >
            <AlertCircle className="w-5 h-5" style={{ color: '#ffc107' }} />
            <p className="text-sm font-medium" style={{ color: '#2b2d42' }}>
              {stats.artisans_en_attente} artisan{stats.artisans_en_attente > 1 ? 's' : ''} en attente de vérification
            </p>
          </div>
        )}

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Users}
            title="Total Clients"
            value={stats?.total_clients}
            color="#4a6fa5"
            bgColor="rgba(74, 111, 165, 0.1)"
          />
          <StatCard
            icon={Briefcase}
            title="Total Artisans"
            value={stats?.total_artisans}
            color="#ff7e5f"
            bgColor="rgba(255, 126, 95, 0.1)"
          />
          <StatCard
            icon={Store}
            title="Ateliers Actifs"
            value={stats?.total_ateliers}
            color="#22c55e"
            bgColor="rgba(34, 197, 94, 0.1)"
          />
          <StatCard
            icon={Star}
            title="Total Avis"
            value={stats?.total_avis}
            color="#f59e0b"
            bgColor="rgba(245, 158, 11, 0.1)"
          />
        </div>

        {/* Statistiques secondaires */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <div
            className="p-6 shadow-md rounded-xl"
            style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-5 h-5" style={{ color: '#ffc107' }} />
              <h3 className="font-semibold" style={{ color: '#2b2d42' }}>
                Vérifications en attente
              </h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#2b2d42' }}>
              {stats?.artisans_en_attente ?? 0}
            </p>
          </div>

          <div
            className="p-6 shadow-md rounded-xl"
            style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-5 h-5" style={{ color: '#4a6fa5' }} />
              <h3 className="font-semibold" style={{ color: '#2b2d42' }}>
                Services en cours
              </h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#2b2d42' }}>
              {stats?.services_en_cours ?? 0}
            </p>
          </div>

          <div
            className="p-6 shadow-md rounded-xl"
            style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5" style={{ color: '#22c55e' }} />
              <h3 className="font-semibold" style={{ color: '#2b2d42' }}>
                RDV aujourd'hui
              </h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#2b2d42' }}>
              {stats?.rdv_aujourd_hui ?? 0}
            </p>
          </div>
        </div>

        {/* Sections à compléter */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div
            className="p-6 shadow-md rounded-xl"
            style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}
          >
            <h3 className="mb-4 text-lg font-bold" style={{ color: '#2b2d42' }}>
              Activité récente
            </h3>
            <p className="text-sm" style={{ color: '#6c757d' }}>
              Liste des dernières activités...
            </p>
          </div>

          <div
            className="p-6 shadow-md rounded-xl"
            style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}
          >
            <h3 className="mb-4 text-lg font-bold" style={{ color: '#2b2d42' }}>
              Services populaires
            </h3>
            <p className="text-sm" style={{ color: '#6c757d' }}>
              Top des services demandés...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}