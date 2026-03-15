import { useState, useEffect } from 'react';
import { Star, Trash2, UserX, UserCheck, AlertCircle } from 'lucide-react';
import moderationService from '../services/moderationService';
import userService from '../services/userService';

/**
 * AdminModeration
 * Le back ne dispose pas de routes "signalements" dédiées.
 * Cette page centralise les actions de modération disponibles :
 *   - Supprimer des avis → DELETE /admin/avis/{id}
 *   - Suspendre / Réactiver des utilisateurs → PATCH /admin/users/{id}/suspendre|reactiver
 *   - Suspendre / Réactiver des ateliers → PATCH /admin/ateliers/{id}/suspendre|reactiver
 */
export default function AdminModeration() {
  const [avis, setAvis] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState('avis'); // 'avis' | 'users'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [avisData, usersData] = await Promise.all([
        moderationService.getAvis(),
        userService.getUsers(),
      ]);
      setAvis(avisData.data ?? avisData);
      setUsers(usersData.data ?? usersData);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDeleteAvis = async (id) => {
    if (!window.confirm('Supprimer cet avis ?')) return;
    try {
      await moderationService.deleteAvis(id);
      setAvis(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      alert(err.message || 'Erreur');
    }
  };

  const handleSuspendreUser = async (id) => {
    if (!window.confirm('Suspendre cet utilisateur ?')) return;
    try {
      await moderationService.suspendreUser(id);
      fetchData();
    } catch (err) {
      alert(err.message || 'Erreur');
    }
  };

  const handleReactiverUser = async (id) => {
    if (!window.confirm('Réactiver cet utilisateur ?')) return;
    try {
      await moderationService.reactiverUser(id);
      fetchData();
    } catch (err) {
      alert(err.message || 'Erreur');
    }
  };

  const renderStars = (note) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-3 h-3" style={{ color: i <= note ? '#f59e0b' : '#e5e7eb', fill: i <= note ? '#f59e0b' : 'none' }} />
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
          <h1 className="mb-2 text-3xl font-bold" style={{ color: '#2b2d42' }}>Modération</h1>
          <p className="text-sm" style={{ color: '#6c757d' }}>Gérer les avis et suspendre les comptes</p>
        </div>

        {/* Info */}
        <div className="flex items-center gap-3 p-4 mb-6 rounded-lg"
          style={{ backgroundColor: 'rgba(74, 111, 165, 0.08)', border: '1px solid rgba(74, 111, 165, 0.2)' }}>
          <AlertCircle className="flex-shrink-0 w-5 h-5" style={{ color: '#4a6fa5' }} />
          <p className="text-sm" style={{ color: '#2b2d42' }}>
            Les actions disponibles correspondent aux routes de l'API : suppression d'avis, suspension et réactivation d'utilisateurs.
          </p>
        </div>

        {/* Onglets */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'avis', label: `Avis (${avis.length})` },
            { key: 'users', label: `Utilisateurs (${users.length})` },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setTab(key)}
              className="px-5 py-2 text-sm font-semibold transition-all rounded-lg"
              style={{
                backgroundColor: tab === key ? '#4a6fa5' : 'white',
                color: tab === key ? 'white' : '#6c757d',
                border: '1px solid #e9ecef',
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* Onglet Avis */}
        {tab === 'avis' && (
          <div className="space-y-4">
            {avis.length === 0 && (
              <div className="p-12 text-center shadow-md rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
                <p className="text-sm" style={{ color: '#6c757d' }}>Aucun avis</p>
              </div>
            )}
            {avis.map((a) => (
              <div key={a.id} className="flex items-start justify-between gap-4 p-5 shadow-md rounded-xl"
                style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium" style={{ color: '#2b2d42' }}>
                      {a.client?.prenom} {a.client?.nom ?? a.user?.nom ?? 'Anonyme'}
                    </p>
                    {renderStars(a.note)}
                    <span className="text-xs" style={{ color: '#6c757d' }}>
                      {a.created_at ? new Date(a.created_at).toLocaleDateString('fr-FR') : ''}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: '#6c757d' }}>
                    {a.commentaire ?? a.contenu ?? '(sans commentaire)'}
                  </p>
                </div>
                <button onClick={() => handleDeleteAvis(a.id)}
                  className="flex-shrink-0 p-2 transition-colors rounded-lg hover:bg-red-50">
                  <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Onglet Utilisateurs */}
        {tab === 'users' && (
          <div className="overflow-hidden shadow-md rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                  {['UTILISATEUR', 'RÔLE', 'STATUT', 'ACTION'].map((h, i) => (
                    <th key={h} className={`px-6 py-4 text-xs font-semibold ${i === 3 ? 'text-right' : 'text-left'}`} style={{ color: '#6c757d' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const statut = u.statut ?? u.status ?? 'ACTIF';
                  return (
                    <tr key={u.id} className="hover:bg-gray-50" style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td className="px-6 py-4 text-sm" style={{ color: '#2b2d42' }}>{u.prenom} {u.nom}</td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#6c757d' }}>{u.role}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                          style={{
                            backgroundColor: statut === 'SUSPENDU' ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
                            color: statut === 'SUSPENDU' ? '#ef4444' : '#22c55e',
                          }}>
                          {statut}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {statut === 'SUSPENDU' ? (
                          <button onClick={() => handleReactiverUser(u.id)}
                            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg hover:shadow-sm"
                            style={{ backgroundColor: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
                            <UserCheck className="w-3 h-3" /> Réactiver
                          </button>
                        ) : (
                          <button onClick={() => handleSuspendreUser(u.id)}
                            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg hover:shadow-sm"
                            style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                            <UserX className="w-3 h-3" /> Suspendre
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}