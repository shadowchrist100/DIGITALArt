import { useState, useEffect } from 'react';
import { Search, Trash2, Star } from 'lucide-react';
import moderationService from '../services/moderationService';

export default function AdminReviews() {
  const [avis, setAvis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAvis = async () => {
    try {
      setLoading(true);
      const data = await moderationService.getAvis();
      setAvis(data.data ?? data);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des avis');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAvis(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet avis définitivement ?')) return;
    try {
      await moderationService.deleteAvis(id);
      fetchAvis();
    } catch (err) {
      alert(err.message || 'Erreur lors de la suppression');
    }
  };

  const filteredAvis = avis.filter(a =>
    (a.client?.nom ?? a.user?.nom ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.commentaire ?? a.contenu ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (note) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-4 h-4" style={{ color: i <= note ? '#f59e0b' : '#e5e7eb', fill: i <= note ? '#f59e0b' : 'none' }} />
      ))}
    </div>
  );

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
          <h1 className="mb-2 text-3xl font-bold" style={{ color: '#2b2d42' }}>Modération des avis</h1>
          <p className="text-sm" style={{ color: '#6c757d' }}>Gérer et supprimer les avis de la plateforme</p>
        </div>

        {/* Recherche */}
        <div className="p-6 mb-6 shadow-md rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
          <div className="relative">
            <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2" style={{ color: '#6c757d' }} />
            <input type="text" placeholder="Rechercher un avis..."
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg outline-none"
              style={{ borderColor: '#e9ecef', backgroundColor: '#f8f9fa' }} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-3">
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>Total avis</p>
            <p className="text-2xl font-bold" style={{ color: '#2b2d42' }}>{avis.length}</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>Note moyenne</p>
            <p className="text-2xl font-bold" style={{ color: '#f59e0b' }}>
              {avis.length > 0 ? (avis.reduce((acc, a) => acc + (a.note ?? 0), 0) / avis.length).toFixed(1) : '-'}
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>5 étoiles</p>
            <p className="text-2xl font-bold" style={{ color: '#22c55e' }}>
              {avis.filter(a => a.note === 5).length}
            </p>
          </div>
        </div>

        {/* Liste */}
        <div className="space-y-4">
          {filteredAvis.map((a) => (
            <div key={a.id} className="p-6 shadow-md rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center text-sm font-bold text-white rounded-full w-9 h-9"
                      style={{ background: 'linear-gradient(135deg, #4a6fa5, #3a5784)' }}>
                      {(a.client?.prenom?.[0] ?? a.user?.prenom?.[0] ?? '?')}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#2b2d42' }}>
                        {a.client?.prenom} {a.client?.nom ?? a.user?.nom ?? 'Anonyme'}
                      </p>
                      <p className="text-xs" style={{ color: '#6c757d' }}>
                        {a.created_at ? new Date(a.created_at).toLocaleDateString('fr-FR') : '-'}
                      </p>
                    </div>
                    {renderStars(a.note)}
                  </div>
                  <p className="text-sm" style={{ color: '#2b2d42' }}>
                    {a.commentaire ?? a.contenu ?? '(sans commentaire)'}
                  </p>
                  {a.atelier?.nom && (
                    <p className="mt-1 text-xs" style={{ color: '#6c757d' }}>Atelier : {a.atelier.nom}</p>
                  )}
                </div>
                <button onClick={() => handleDelete(a.id)}
                  className="p-2 ml-4 transition-colors rounded-lg hover:bg-red-50">
                  <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                </button>
              </div>
            </div>
          ))}
          {filteredAvis.length === 0 && (
            <div className="p-12 text-center shadow-md rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
              <p className="text-sm" style={{ color: '#6c757d' }}>Aucun avis trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}