import { useState, useEffect } from 'react';
import {
  Search,
  MoreVertical,
  UserCheck,
  UserX,
  Trash2,
  Mail,
  Phone,
} from 'lucide-react';
import userService from '../services/userService';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showActions, setShowActions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterRole !== 'ALL') params.role = filterRole;
      if (filterStatus !== 'ALL') params.status = filterStatus;
      const data = await userService.getUsers(params);
      setUsers(data.data ?? data); // supporte pagination Laravel ou tableau simple
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRole, filterStatus]);

  const handleSuspendre = async (userId) => {
    if (!window.confirm('Suspendre cet utilisateur ?')) return;
    try {
      await userService.suspendreUser(userId);
      fetchUsers();
    } catch (err) {
      alert(err.message || 'Erreur lors de la suspension');
    }
    setShowActions(null);
  };

  const handleReactiver = async (userId) => {
    if (!window.confirm('Réactiver cet utilisateur ?')) return;
    try {
      await userService.reactiver(userId);
      fetchUsers();
    } catch (err) {
      alert(err.message || 'Erreur lors de la réactivation');
    }
    setShowActions(null);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Supprimer définitivement cet utilisateur ?')) return;
    try {
      await userService.deleteUser(userId);
      fetchUsers();
    } catch (err) {
      alert(err.message || 'Erreur lors de la suppression');
    }
    setShowActions(null);
  };

  const filteredUsers = users.filter(user => {
    const nom = user.nom ?? '';
    const prenom = user.prenom ?? '';
    const email = user.email ?? '';
    const matchSearch =
      nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === 'ALL' || user.role === filterRole;
    const matchStatus = filterStatus === 'ALL' || user.statut === filterStatus || user.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const getRoleBadgeStyle = (role) => {
    const styles = {
      CLIENT: { backgroundColor: 'rgba(74, 111, 165, 0.1)', color: '#4a6fa5' },
      ARTISAN: { backgroundColor: 'rgba(255, 126, 95, 0.1)', color: '#ff7e5f' },
      ADMIN: { backgroundColor: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' },
    };
    return styles[role] || styles.CLIENT;
  };

  const getStatusBadgeStyle = (status) => {
    const styles = {
      ACTIF: { backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' },
      INACTIF: { backgroundColor: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af' },
      SUSPENDU: { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' },
    };
    return styles[status] || styles.ACTIF;
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
          <h1 className="mb-2 text-3xl font-bold" style={{ color: '#2b2d42' }}>Gestion des utilisateurs</h1>
          <p className="text-sm" style={{ color: '#6c757d' }}>Liste et gestion de tous les utilisateurs de la plateforme</p>
        </div>

        {/* Filtres */}
        <div className="p-6 mb-6 shadow-md rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2" style={{ color: '#6c757d' }} />
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg outline-none"
                style={{ borderColor: '#e9ecef', backgroundColor: '#f8f9fa' }}
              />
            </div>
            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 text-sm border rounded-lg outline-none"
              style={{ borderColor: '#e9ecef', backgroundColor: '#f8f9fa' }}>
              <option value="ALL">Tous les rôles</option>
              <option value="CLIENT">Clients</option>
              <option value="ARTISAN">Artisans</option>
              <option value="ADMIN">Administrateurs</option>
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 text-sm border rounded-lg outline-none"
              style={{ borderColor: '#e9ecef', backgroundColor: '#f8f9fa' }}>
              <option value="ALL">Tous les statuts</option>
              <option value="ACTIF">Actifs</option>
              <option value="SUSPENDU">Suspendus</option>
            </select>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
          {[
            { label: 'Total', value: users.length, color: '#2b2d42' },
            { label: 'Clients', value: users.filter(u => u.role === 'CLIENT').length, color: '#4a6fa5' },
            { label: 'Artisans', value: users.filter(u => u.role === 'ARTISAN').length, color: '#ff7e5f' },
            { label: 'Actifs', value: users.filter(u => (u.statut ?? u.status) === 'ACTIF').length, color: '#22c55e' },
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
                  {['UTILISATEUR', 'RÔLE', 'STATUT', 'CONTACT', 'INSCRIPTION', 'ACTIONS'].map((h, i) => (
                    <th key={h} className={`px-6 py-4 text-xs font-semibold ${i === 5 ? 'text-right' : 'text-left'}`} style={{ color: '#6c757d' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const statut = user.statut ?? user.status ?? 'ACTIF';
                  return (
                    <tr key={user.id} className="transition-colors hover:bg-gray-50" style={{ borderBottom: '1px solid #e9ecef' }}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 font-semibold text-white rounded-full"
                            style={{ background: 'linear-gradient(135deg, #4a6fa5, #3a5784)' }}>
                            {(user.prenom?.[0] ?? '?')}{(user.nom?.[0] ?? '?')}
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: '#2b2d42' }}>{user.prenom} {user.nom}</p>
                            <p className="text-xs" style={{ color: '#6c757d' }}>ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full" style={getRoleBadgeStyle(user.role)}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full" style={getStatusBadgeStyle(statut)}>
                          {statut}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3" style={{ color: '#6c757d' }} />
                            <span className="text-xs" style={{ color: '#2b2d42' }}>{user.email}</span>
                          </div>
                          {user.telephone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3" style={{ color: '#6c757d' }} />
                              <span className="text-xs" style={{ color: '#2b2d42' }}>{user.telephone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm" style={{ color: '#6c757d' }}>
                          {user.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR') : '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block">
                          <button onClick={() => setShowActions(showActions === user.id ? null : user.id)}
                            className="p-2 transition-colors rounded-lg hover:bg-gray-100">
                            <MoreVertical className="w-5 h-5" style={{ color: '#6c757d' }} />
                          </button>
                          {showActions === user.id && (
                            <div className="absolute right-0 z-10 w-48 mt-2 rounded-lg shadow-lg"
                              style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
                              {statut === 'ACTIF' ? (
                                <button onClick={() => handleSuspendre(user.id)}
                                  className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left transition-colors hover:bg-gray-50">
                                  <UserX className="w-4 h-4" style={{ color: '#ef4444' }} />
                                  <span style={{ color: '#2b2d42' }}>Suspendre</span>
                                </button>
                              ) : (
                                <button onClick={() => handleReactiver(user.id)}
                                  className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left transition-colors hover:bg-gray-50">
                                  <UserCheck className="w-4 h-4" style={{ color: '#22c55e' }} />
                                  <span style={{ color: '#2b2d42' }}>Réactiver</span>
                                </button>
                              )}
                              <button onClick={() => handleDelete(user.id)}
                                className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left transition-colors rounded-b-lg hover:bg-gray-50">
                                <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                                <span style={{ color: '#ef4444' }}>Supprimer</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-sm" style={{ color: '#6c757d' }}>Aucun utilisateur trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}