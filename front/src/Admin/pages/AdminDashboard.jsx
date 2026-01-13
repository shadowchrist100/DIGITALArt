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

// Composant StatCard en dehors pour éviter les re-renders
const StatCard = ({ icon, title, value, color, bgColor, trend }) => {
  const Icon = icon;
  return (
    <div 
      className="p-6 transition-all shadow-md rounded-xl hover:shadow-lg"
      style={{ 
        backgroundColor: 'white',
        border: '1px solid #e9ecef'
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-1 text-sm font-medium" style={{ color: '#6c757d' }}>
            {title}
          </p>
          <h3 className="text-3xl font-bold" style={{ color: '#2b2d42' }}>
            {value.toLocaleString()}
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
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: bgColor }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalArtisans: 0,
    totalAteliers: 0,
    totalServices: 0,
    totalAvis: 0,
    artisansEnAttente: 0,
    serviceEnCours: 0,
    rdvAujourdhui: 0
  });

  const fetchStats = async () => {
    // TODO: Appeler l'API pour récupérer les stats
    // Exemple de données mockées pour l'instant
    setStats({
      totalClients: 1245,
      totalArtisans: 387,
      totalAteliers: 325,
      totalServices: 2156,
      totalAvis: 1842,
      artisansEnAttente: 12,
      serviceEnCours: 45,
      rdvAujourdhui: 23
    });
  };

  useEffect(() => {
    // Charger les statistiques depuis l'API
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="mx-auto max-w-7xl">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold" style={{ color: '#2b2d42' }}>
            Tableau de bord
          </h1>
          <p className="text-sm" style={{ color: '#6c757d' }}>
            Vue d'ensemble de la plateforme DigitalArt
          </p>
        </div>

        {/* Alertes */}
        {stats.artisansEnAttente > 0 && (
          <div 
            className="flex items-center gap-3 p-4 mb-6 rounded-lg"
            style={{ 
              backgroundColor: 'rgba(255, 193, 7, 0.1)',
              border: '1px solid rgba(255, 193, 7, 0.3)'
            }}
          >
            <AlertCircle className="w-5 h-5" style={{ color: '#ffc107' }} />
            <p className="text-sm font-medium" style={{ color: '#2b2d42' }}>
              {stats.artisansEnAttente} artisan{stats.artisansEnAttente > 1 ? 's' : ''} en attente de vérification
            </p>
          </div>
        )}

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Users}
            title="Total Clients"
            value={stats.totalClients}
            color="#4a6fa5"
            bgColor="rgba(74, 111, 165, 0.1)"
            trend={12}
          />
          <StatCard
            icon={Briefcase}
            title="Total Artisans"
            value={stats.totalArtisans}
            color="#ff7e5f"
            bgColor="rgba(255, 126, 95, 0.1)"
            trend={8}
          />
          <StatCard
            icon={Store}
            title="Ateliers Actifs"
            value={stats.totalAteliers}
            color="#22c55e"
            bgColor="rgba(34, 197, 94, 0.1)"
            trend={5}
          />
          <StatCard
            icon={Star}
            title="Total Avis"
            value={stats.totalAvis}
            color="#f59e0b"
            bgColor="rgba(245, 158, 11, 0.1)"
          />
        </div>

        {/* Statistiques secondaires */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <div 
            className="p-6 shadow-md rounded-xl"
            style={{ 
              backgroundColor: 'white',
              border: '1px solid #e9ecef'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-5 h-5" style={{ color: '#ffc107' }} />
              <h3 className="font-semibold" style={{ color: '#2b2d42' }}>
                Vérifications en attente
              </h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#2b2d42' }}>
              {stats.artisansEnAttente}
            </p>
          </div>

          <div 
            className="p-6 shadow-md rounded-xl"
            style={{ 
              backgroundColor: 'white',
              border: '1px solid #e9ecef'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-5 h-5" style={{ color: '#4a6fa5' }} />
              <h3 className="font-semibold" style={{ color: '#2b2d42' }}>
                Services en cours
              </h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#2b2d42' }}>
              {stats.serviceEnCours}
            </p>
          </div>

          <div 
            className="p-6 shadow-md rounded-xl"
            style={{ 
              backgroundColor: 'white',
              border: '1px solid #e9ecef'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-5 h-5" style={{ color: '#22c55e' }} />
              <h3 className="font-semibold" style={{ color: '#2b2d42' }}>
                RDV aujourd'hui
              </h3>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#2b2d42' }}>
              {stats.rdvAujourdhui}
            </p>
          </div>
        </div>

        {/* Graphiques et tableaux à venir */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Activité récente */}
          <div 
            className="p-6 shadow-md rounded-xl"
            style={{ 
              backgroundColor: 'white',
              border: '1px solid #e9ecef'
            }}
          >
            <h3 className="mb-4 text-lg font-bold" style={{ color: '#2b2d42' }}>
              Activité récente
            </h3>
            <p className="text-sm" style={{ color: '#6c757d' }}>
              Liste des dernières activités...
            </p>
          </div>

          {/* Services populaires */}
          <div 
            className="p-6 shadow-md rounded-xl"
            style={{ 
              backgroundColor: 'white',
              border: '1px solid #e9ecef'
            }}
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