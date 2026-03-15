import { useState, useEffect } from 'react';
import { Search, MoreVertical, Eye, Trash2, MapPin, Star, ShieldOff, ShieldCheck } from 'lucide-react';
import moderationService from '../services/moderationService';

export default function AdminAteliers() {
  const [ateliers, setAteliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showActions, setShowActions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAteliers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterStatus !== 'ALL') params.status = filterStatus;
      const data = await moderationService.getAteliers(params);
      setAteliers(data.data ?? data);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des ateliers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAteliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  const handleSuspendre = async (id) => {
    if (!window.confirm('Suspendre cet atelier ?')) return;
    try {
      await moderationService.suspendreAtelier(id);
      fetchAteliers();
    } catch (err) {
      alert(err.message || 'Erreur');
    }
    setShowActions(null);
  };

  const handleReactiver = async (id) => {
    if (!window.confirm('Réactiver cet atelier ?')) return;
    try {
      await moderationService.reactiverAtelier(id);
      fetchAteliers();
    } catch (err) {
      alert(err.message || 'Erreur');
    }
    setShowActions(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer définitivement cet atelier ?')) return;
    try {
      await moderationService.deleteAtelier(id);
      fetchAteliers();
    } catch (err) {
      alert(err.message || 'Erreur');
    }
    setShowActions(null);
  };

  const filteredAteliers = ateliers.filter(atelier => {
    const matchSearch =
      (atelier.nom ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (atelier.artisan_nom ?? atelier.artisan?.user?.nom ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (atelier.ville ?? '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'ALL' || atelier.status === filterStatus || atelier.statut === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusBadgeStyle = (status) => {
    const styles = {
      ACTIF: { backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' },
      INACTIF: { backgroundColor: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af' },
      SUSPENDU: { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' },
    };
    return styles[status] ?? styles.INACTIF;
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-4 text-red-600 bg-red-100 rounded-lg">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold" style={{ color: '#2b2d42' }}>Gestion des ateliers</h1>
          <p className="text-sm" style={{ color: '#6c757d' }}>Liste et gestion de tous les ateliers de la plateforme</p>
        </div>

        {/* Filtres */}
        <div className="p-6 mb-6 shadow-md rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2" style={{ color: '#6c757d' }} />
              <input type="text" placeholder="Rechercher un atelier..."
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg outline-none"
                style={{ borderColor: '#e9ecef', backgroundColor: '#f8f9fa' }} />
            </div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 text-sm border rounded-lg outline-none"
              style={{ borderColor: '#e9ecef', backgroundColor: '#f8f9fa' }}>
              <option value="ALL">Tous les statuts</option>
              <option value="ACTIF">Actifs</option>
              <option value="SUSPENDU">Suspendus</option>
              <option value="INACTIF">Inactifs</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>Total ateliers</p>
            <p className="text-2xl font-bold" style={{ color: '#2b2d42' }}>{ateliers.length}</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>Actifs</p>
            <p className="text-2xl font-bold" style={{ color: '#22c55e' }}>
              {ateliers.filter(a => (a.status ?? a.statut) === 'ACTIF').length}
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>Suspendus</p>
            <p className="text-2xl font-bold" style={{ color: '#ef4444' }}>
              {ateliers.filter(a => (a.status ?? a.statut) === 'SUSPENDU').length}
            </p>
          </div>
        </div>

        {/* Liste */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAteliers.map((atelier) => {
            const statut = atelier.status ?? atelier.statut ?? 'INACTIF';
            const artisanNom = atelier.artisan_nom ?? atelier.artisan?.user?.nom ?? 'Inconnu';
            return (
              <div key={atelier.id} className="p-6 transition-all shadow-md rounded-xl hover:shadow-lg"
                style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-bold" style={{ color: '#2b2d42' }}>{atelier.nom}</h3>
                    <p className="mb-2 text-sm" style={{ color: '#6c757d' }}>Par {artisanNom}</p>
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full" style={getStatusBadgeStyle(statut)}>
                      {statut}
                    </span>
                  </div>
                  <button onClick={() => setShowActions(showActions === atelier.id ? null : atelier.id)}
                    className="p-2 transition-colors rounded-lg hover:bg-gray-100">
                    <MoreVertical className="w-5 h-5" style={{ color: '#6c757d' }} />
                  </button>
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: '#6c757d' }} />
                    <span className="text-sm" style={{ color: '#2b2d42' }}>
                      {atelier.ville ?? '-'} · {atelier.domaine ?? '-'}
                    </span>
                  </div>
                  {atelier.note_moyenne != null && (
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" style={{ color: '#f59e0b' }} />
                      <span className="text-sm font-medium" style={{ color: '#2b2d42' }}>
                        {atelier.note_moyenne} ({atelier.nombre_avis ?? 0} avis)
                      </span>
                    </div>
                  )}
                </div>

                {showActions === atelier.id && (
                  <div className="mb-2 overflow-hidden rounded-lg" style={{ border: '1px solid #e9ecef' }}>
                    {statut === 'ACTIF' ? (
                      <button onClick={() => handleSuspendre(atelier.id)}
                        className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left hover:bg-gray-50">
                        <ShieldOff className="w-4 h-4" style={{ color: '#ef4444' }} />
                        <span style={{ color: '#2b2d42' }}>Suspendre</span>
                      </button>
                    ) : (
                      <button onClick={() => handleReactiver(atelier.id)}
                        className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left hover:bg-gray-50">
                        <ShieldCheck className="w-4 h-4" style={{ color: '#22c55e' }} />
                        <span style={{ color: '#2b2d42' }}>Réactiver</span>
                      </button>
                    )}
                    <button onClick={() => handleDelete(atelier.id)}
                      className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left hover:bg-gray-50">
                      <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                      <span style={{ color: '#ef4444' }}>Supprimer</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredAteliers.length === 0 && (
          <div className="p-12 text-center shadow-md rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="text-sm" style={{ color: '#6c757d' }}>Aucun atelier trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}