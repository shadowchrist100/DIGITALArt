import { useState, useEffect } from 'react';
import { Search, Trash2, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import API from '../services/api';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await API.get('/admin/services');
      setServices(response.data.data ?? response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce service ?')) return;
    try {
      await API.delete(`/admin/services/${id}`);
      fetchServices();
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      EN_ATTENTE: { backgroundColor: 'rgba(251, 146, 60, 0.1)', color: '#fb923c' },
      ACCEPTE: { backgroundColor: 'rgba(74, 111, 165, 0.1)', color: '#4a6fa5' },
      EN_COURS: { backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' },
      TERMINE: { backgroundColor: 'rgba(107, 114, 128, 0.1)', color: '#6b7280' },
      ANNULE: { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' },
    };
    return styles[status] ?? styles.EN_ATTENTE;
  };

  const filteredServices = services.filter(s =>
    (s.client?.nom ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.artisan?.user?.nom ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.description ?? '').toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="mb-2 text-3xl font-bold" style={{ color: '#2b2d42' }}>Supervision des services</h1>
          <p className="text-sm" style={{ color: '#6c757d' }}>Liste de tous les services de la plateforme</p>
        </div>

        {/* Recherche */}
        <div className="p-6 mb-6 shadow-md rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
          <div className="relative">
            <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2" style={{ color: '#6c757d' }} />
            <input type="text" placeholder="Rechercher un service..."
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg outline-none"
              style={{ borderColor: '#e9ecef', backgroundColor: '#f8f9fa' }} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
          {[
            { label: 'Total', value: services.length, color: '#2b2d42' },
            { label: 'En attente', value: services.filter(s => s.statut === 'EN_ATTENTE').length, color: '#fb923c' },
            { label: 'En cours', value: services.filter(s => s.statut === 'EN_COURS').length, color: '#22c55e' },
            { label: 'Terminés', value: services.filter(s => s.statut === 'TERMINE').length, color: '#6b7280' },
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
                  {['ID', 'CLIENT', 'ARTISAN', 'STATUT', 'DATE', 'ACTIONS'].map((h, i) => (
                    <th key={h} className={`px-6 py-4 text-xs font-semibold ${i === 5 ? 'text-right' : 'text-left'}`} style={{ color: '#6c757d' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((s) => (
                  <tr key={s.id} className="transition-colors hover:bg-gray-50" style={{ borderBottom: '1px solid #e9ecef' }}>
                    <td className="px-6 py-4 font-mono text-sm" style={{ color: '#6c757d' }}>#{s.id}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#2b2d42' }}>
                      {s.client?.prenom} {s.client?.nom ?? '-'}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#2b2d42' }}>
                      {s.artisan?.user?.prenom} {s.artisan?.user?.nom ?? '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full" style={getStatusStyle(s.statut)}>
                        {s.statut ?? '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#6c757d' }}>
                      {s.created_at ? new Date(s.created_at).toLocaleDateString('fr-FR') : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(s.id)}
                        className="p-2 transition-colors rounded-lg hover:bg-red-50">
                        <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredServices.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-sm" style={{ color: '#6c757d' }}>Aucun service trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}