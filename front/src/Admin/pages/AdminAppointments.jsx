import { useState, useEffect } from 'react';
import { Search, Trash2, Calendar } from 'lucide-react';
import API from '../services/api';

export default function AdminAppointments() {
  const [rdvs, setRdvs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRdvs = async () => {
    try {
      setLoading(true);
      const response = await API.get('/admin/rendez-vous');
      setRdvs(response.data.data ?? response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des rendez-vous');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRdvs(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce rendez-vous ?')) return;
    try {
      await API.delete(`/admin/rendez-vous/${id}`);
      fetchRdvs();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      EN_ATTENTE: { backgroundColor: 'rgba(251, 146, 60, 0.1)', color: '#fb923c' },
      ACCEPTE: { backgroundColor: 'rgba(74, 111, 165, 0.1)', color: '#4a6fa5' },
      REFUSE: { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' },
      ANNULE: { backgroundColor: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af' },
    };
    return styles[status] ?? styles.EN_ATTENTE;
  };

  const filteredRdvs = rdvs.filter(r =>
    (r.client?.nom ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.artisan?.user?.nom ?? '').toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="mb-2 text-3xl font-bold" style={{ color: '#2b2d42' }}>Supervision des rendez-vous</h1>
          <p className="text-sm" style={{ color: '#6c757d' }}>Liste de tous les rendez-vous de la plateforme</p>
        </div>

        {/* Recherche */}
        <div className="p-6 mb-6 shadow-md rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
          <div className="relative">
            <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2" style={{ color: '#6c757d' }} />
            <input type="text" placeholder="Rechercher par client ou artisan..."
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg outline-none"
              style={{ borderColor: '#e9ecef', backgroundColor: '#f8f9fa' }} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
          {[
            { label: 'Total', value: rdvs.length, color: '#2b2d42' },
            { label: 'En attente', value: rdvs.filter(r => r.statut === 'EN_ATTENTE').length, color: '#fb923c' },
            { label: 'Acceptés', value: rdvs.filter(r => r.statut === 'ACCEPTE').length, color: '#4a6fa5' },
            { label: 'Refusés', value: rdvs.filter(r => r.statut === 'REFUSE').length, color: '#ef4444' },
          ].map(({ label, value, color }) => (
            <div key={label} className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
              <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>{label}</p>
              <p className="text-2xl font-bold" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-hidden shadow-md rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                  {['ID', 'CLIENT', 'ARTISAN', 'DATE RDV', 'STATUT', 'ACTIONS'].map((h, i) => (
                    <th key={h} className={`px-6 py-4 text-xs font-semibold ${i === 5 ? 'text-right' : 'text-left'}`} style={{ color: '#6c757d' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRdvs.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-gray-50" style={{ borderBottom: '1px solid #e9ecef' }}>
                    <td className="px-6 py-4 font-mono text-sm" style={{ color: '#6c757d' }}>#{r.id}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#2b2d42' }}>
                      {r.client?.prenom} {r.client?.nom ?? '-'}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#2b2d42' }}>
                      {r.artisan?.user?.prenom} {r.artisan?.user?.nom ?? '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" style={{ color: '#6c757d' }} />
                        <span className="text-sm" style={{ color: '#2b2d42' }}>
                          {r.date_heure ? new Date(r.date_heure).toLocaleString('fr-FR') : '-'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full" style={getStatusStyle(r.statut)}>
                        {r.statut ?? '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(r.id)}
                        className="p-2 transition-colors rounded-lg hover:bg-red-50">
                        <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredRdvs.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-sm" style={{ color: '#6c757d' }}>Aucun rendez-vous trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}