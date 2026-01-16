import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  UserCheck, 
  UserX, 
  Edit, 
  Trash2,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showActions, setShowActions] = useState(null);

  const fetchUsers = async () => {
    // TODO: Appeler l'API
    // Données mockées pour l'instant
    setUsers([
      {
        id: 1,
        nom: 'Doe',
        prenom: 'John',
        email: 'john.doe@example.com',
        role: 'CLIENT',
        status: 'ACTIF',
        created_at: '2024-01-15',
        photo_profil: null
      },
      {
        id: 2,
        nom: 'Martin',
        prenom: 'Sophie',
        email: 'sophie.martin@example.com',
        role: 'CLIENT',
        status: 'ACTIF',
        created_at: '2024-01-20',
        photo_profil: null
      },
      {
        id: 3,
        nom: 'Dubois',
        prenom: 'Pierre',
        email: 'pierre.dubois@example.com',
        role: 'ARTISAN',
        status: 'ACTIF',
        created_at: '2024-01-10',
        photo_profil: null,
        telephone: '+229 97 00 00 01',
        specialite: 'Menuiserie'
      }
    ]);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterRole, filterStatus]);

  const handleStatusChange = async (userId, newStatus) => {
    // TODO: Appeler l'API pour changer le statut
    console.log('Changement de statut:', userId, newStatus);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      // TODO: Appeler l'API pour supprimer
      console.log('Suppression:', userId);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchSearch = 
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchRole = filterRole === 'ALL' || user.role === filterRole;
    const matchStatus = filterStatus === 'ALL' || user.status === filterStatus;
    
    return matchSearch && matchRole && matchStatus;
  });

  const getRoleBadgeStyle = (role) => {
    const styles = {
      CLIENT: { bg: 'rgba(74, 111, 165, 0.1)', color: '#4a6fa5' },
      ARTISAN: { bg: 'rgba(255, 126, 95, 0.1)', color: '#ff7e5f' },
      ADMIN: { bg: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' }
    };
    return styles[role] || styles.CLIENT;
  };

  const getStatusBadgeStyle = (status) => {
    const styles = {
      ACTIF: { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' },
      INACTIF: { bg: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af' },
      SUSPENDU: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }
    };
    return styles[status] || styles.ACTIF;
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="mx-auto max-w-7xl">
        {/* En-tête */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold" style={{ color: '#2b2d42' }}>
            Gestion des utilisateurs
          </h1>
          <p className="text-sm" style={{ color: '#6c757d' }}>
            Liste et gestion de tous les utilisateurs de la plateforme
          </p>
        </div>

        {/* Filtres et recherche */}
        <div 
          className="p-6 mb-6 shadow-md rounded-xl"
          style={{ 
            backgroundColor: 'white',
            border: '1px solid #e9ecef'
          }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2" style={{ color: '#6c757d' }} />
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg outline-none"
                style={{ 
                  borderColor: '#e9ecef',
                  backgroundColor: '#f8f9fa'
                }}
              />
            </div>

            {/* Filtre par rôle */}
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 text-sm border rounded-lg outline-none"
              style={{ 
                borderColor: '#e9ecef',
                backgroundColor: '#f8f9fa'
              }}
            >
              <option value="ALL">Tous les rôles</option>
              <option value="CLIENT">Clients</option>
              <option value="ARTISAN">Artisans</option>
              <option value="ADMIN">Administrateurs</option>
            </select>

            {/* Filtre par statut */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 text-sm border rounded-lg outline-none"
              style={{ 
                borderColor: '#e9ecef',
                backgroundColor: '#f8f9fa'
              }}
            >
              <option value="ALL">Tous les statuts</option>
              <option value="ACTIF">Actifs</option>
              <option value="INACTIF">Inactifs</option>
              <option value="SUSPENDU">Suspendus</option>
            </select>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>Total</p>
            <p className="text-2xl font-bold" style={{ color: '#2b2d42' }}>{users.length}</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>Clients</p>
            <p className="text-2xl font-bold" style={{ color: '#4a6fa5' }}>
              {users.filter(u => u.role === 'CLIENT').length}
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>Artisans</p>
            <p className="text-2xl font-bold" style={{ color: '#ff7e5f' }}>
              {users.filter(u => u.role === 'ARTISAN').length}
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>Actifs</p>
            <p className="text-2xl font-bold" style={{ color: '#22c55e' }}>
              {users.filter(u => u.status === 'ACTIF').length}
            </p>
          </div>
        </div>

        {/* Table des utilisateurs */}
        <div 
          className="overflow-hidden shadow-md rounded-xl"
          style={{ 
            backgroundColor: 'white',
            border: '1px solid #e9ecef'
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                  <th className="px-6 py-4 text-xs font-semibold text-left" style={{ color: '#6c757d' }}>
                    UTILISATEUR
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-left" style={{ color: '#6c757d' }}>
                    RÔLE
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-left" style={{ color: '#6c757d' }}>
                    STATUT
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-left" style={{ color: '#6c757d' }}>
                    CONTACT
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-left" style={{ color: '#6c757d' }}>
                    INSCRIPTION
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-right" style={{ color: '#6c757d' }}>
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr 
                    key={user.id}
                    className="transition-colors hover:bg-gray-50"
                    style={{ borderBottom: '1px solid #e9ecef' }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="flex items-center justify-center w-10 h-10 font-semibold text-white rounded-full"
                          style={{ background: 'linear-gradient(135deg, #4a6fa5, #3a5784)' }}
                        >
                          {user.prenom[0]}{user.nom[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: '#2b2d42' }}>
                            {user.prenom} {user.nom}
                          </p>
                          <p className="text-xs" style={{ color: '#6c757d' }}>
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                        style={getRoleBadgeStyle(user.role)}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                        style={getStatusBadgeStyle(user.status)}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" style={{ color: '#6c757d' }} />
                          <span className="text-xs" style={{ color: '#2b2d42' }}>
                            {user.email}
                          </span>
                        </div>
                        {user.telephone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3" style={{ color: '#6c757d' }} />
                            <span className="text-xs" style={{ color: '#2b2d42' }}>
                              {user.telephone}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm" style={{ color: '#6c757d' }}>
                        {new Date(user.created_at).toLocaleDateString('fr-FR')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setShowActions(showActions === user.id ? null : user.id)}
                          className="p-2 transition-colors rounded-lg hover:bg-gray-100"
                        >
                          <MoreVertical className="w-5 h-5" style={{ color: '#6c757d' }} />
                        </button>
                        
                        {showActions === user.id && (
                          <div 
                            className="absolute right-0 z-10 w-48 mt-2 rounded-lg shadow-lg"
                            style={{ 
                              backgroundColor: 'white',
                              border: '1px solid #e9ecef'
                            }}
                          >
                            <button
                              onClick={() => handleStatusChange(user.id, user.status === 'ACTIF' ? 'SUSPENDU' : 'ACTIF')}
                              className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left transition-colors hover:bg-gray-50"
                            >
                              {user.status === 'ACTIF' ? (
                                <>
                                  <UserX className="w-4 h-4" style={{ color: '#ef4444' }} />
                                  <span style={{ color: '#2b2d42' }}>Suspendre</span>
                                </>
                              ) : (
                                <>
                                  <UserCheck className="w-4 h-4" style={{ color: '#22c55e' }} />
                                  <span style={{ color: '#2b2d42' }}>Activer</span>
                                </>
                              )}
                            </button>
                            <button
                              className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left transition-colors hover:bg-gray-50"
                            >
                              <Edit className="w-4 h-4" style={{ color: '#4a6fa5' }} />
                              <span style={{ color: '#2b2d42' }}>Modifier</span>
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left transition-colors rounded-b-lg hover:bg-gray-50"
                            >
                              <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                              <span style={{ color: '#ef4444' }}>Supprimer</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-sm" style={{ color: '#6c757d' }}>
                Aucun utilisateur trouvé
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}