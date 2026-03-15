import { useState, useEffect } from 'react';
import { Phone, Mail, Briefcase, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import userService from '../services/userService';

/**
 * AdminArtisanVerification
 * Le back n'a pas de route dédiée "artisans en attente de vérification".
 * On filtre les utilisateurs avec role=ARTISAN depuis GET /admin/users.
 * Pour "approuver" → on change le rôle (PATCH /admin/users/{id}/role)
 * Pour "suspendre" → PATCH /admin/users/{id}/suspendre
 */
export default function AdminArtisanVerification() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchArtisans = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers({ role: 'ARTISAN' });
      const list = data.data ?? data;
      setArtisans(list);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArtisans(); }, []);

  const handleSuspendre = async (userId) => {
    if (!window.confirm('Suspendre cet artisan ?')) return;
    try {
      await userService.suspendreUser(userId);
      fetchArtisans();
    } catch (err) {
      alert(err.message || 'Erreur');
    }
  };

  const handleReactiver = async (userId) => {
    try {
      await userService.reactiver(userId);
      fetchArtisans();
    } catch (err) {
      alert(err.message || 'Erreur');
    }
    
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

  const suspendus = artisans.filter(a => (a.statut ?? a.status) === 'SUSPENDU');
  const actifs = artisans.filter(a => (a.statut ?? a.status) !== 'SUSPENDU');

  const ArtisanCard = ({ artisan }) => {
    const statut = artisan.statut ?? artisan.status ?? 'ACTIF';
    return (
      <div className="p-6 transition-all shadow-md rounded-xl hover:shadow-lg"
        style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-16 h-16 text-xl font-bold text-white rounded-full"
              style={{ background: 'linear-gradient(135deg, #4a6fa5, #3a5784)' }}>
              {artisan.prenom?.[0]}{artisan.nom?.[0]}
            </div>
            <div>
              <h3 className="mb-1 text-lg font-bold" style={{ color: '#2b2d42' }}>{artisan.prenom} {artisan.nom}</h3>
              {artisan.artisan?.specialite && (
                <div className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full"
                  style={{ backgroundColor: 'rgba(255, 126, 95, 0.1)', color: '#ff7e5f' }}>
                  {artisan.artisan.specialite}
                </div>
              )}
              <p className="flex items-center gap-2 text-xs" style={{ color: '#6c757d' }}>
                <Clock className="w-3 h-3" />
                Inscrit le {artisan.created_at ? new Date(artisan.created_at).toLocaleDateString('fr-FR') : '-'}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-semibold rounded-full"
            style={{
              backgroundColor: statut === 'SUSPENDU' ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
              color: statut === 'SUSPENDU' ? '#ef4444' : '#22c55e',
            }}>
            {statut}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" style={{ color: '#6c757d' }} />
              <span className="text-sm" style={{ color: '#2b2d42' }}>{artisan.email}</span>
            </div>
            {artisan.telephone && (
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4" style={{ color: '#6c757d' }} />
                <span className="text-sm" style={{ color: '#2b2d42' }}>{artisan.telephone}</span>
              </div>
            )}
            {artisan.artisan?.experience_annees && (
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" style={{ color: '#6c757d' }} />
                <span className="text-sm" style={{ color: '#2b2d42' }}>{artisan.artisan.experience_annees} ans d'expérience</span>
              </div>
            )}
          </div>
          {artisan.artisan?.atelier && (
            <div>
              <h4 className="mb-2 text-sm font-semibold" style={{ color: '#2b2d42' }}>Atelier</h4>
              <p className="mb-1 text-sm font-medium" style={{ color: '#4a6fa5' }}>{artisan.artisan.atelier.nom}</p>
              <p className="text-xs" style={{ color: '#6c757d' }}>{artisan.artisan.atelier.ville}</p>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t" style={{ borderColor: '#e9ecef' }}>
          {statut === 'SUSPENDU' ? (
            <button onClick={() => handleReactiver(artisan.id)}
              className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-semibold transition-all rounded-lg hover:shadow-md"
              style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
              <CheckCircle className="w-4 h-4" />
              Réactiver
            </button>
          ) : (
            <button onClick={() => handleSuspendre(artisan.id)}
              className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-semibold transition-all rounded-lg hover:shadow-md"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
              <XCircle className="w-4 h-4" />
              Suspendre
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold" style={{ color: '#2b2d42' }}>Gestion des artisans</h1>
          <p className="text-sm" style={{ color: '#6c757d' }}>Superviser et gérer les comptes artisans</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total artisans', value: artisans.length, color: '#2b2d42' },
            { label: 'Actifs', value: actifs.length, color: '#22c55e' },
            { label: 'Suspendus', value: suspendus.length, color: '#ef4444' },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
              <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>{label}</p>
              <p className="text-2xl font-bold" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        {suspendus.length > 0 && (
          <div className="flex items-center gap-3 p-4 mb-6 rounded-lg"
            style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            <AlertCircle className="w-5 h-5" style={{ color: '#ef4444' }} />
            <p className="text-sm font-medium" style={{ color: '#2b2d42' }}>
              {suspendus.length} artisan{suspendus.length > 1 ? 's' : ''} suspendu{suspendus.length > 1 ? 's' : ''}
            </p>
          </div>
        )}

        {artisans.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {artisans.map((a) => <ArtisanCard key={a.id} artisan={a} />)}
          </div>
        ) : (
          <div className="p-12 text-center shadow-md rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#22c55e' }} />
            <h3 className="mb-2 text-lg font-bold" style={{ color: '#2b2d42' }}>Aucun artisan</h3>
          </div>
        )}
      </div>
    </div>
  );
}