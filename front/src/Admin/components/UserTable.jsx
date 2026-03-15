import { MoreVertical, Mail, Phone } from 'lucide-react';

// Helpers inline (n'importe pas depuis utils pour éviter les dépendances cassées)
const getInitials = (prenom, nom) => `${prenom?.[0] ?? '?'}${nom?.[0] ?? '?'}`;

const getRoleBadgeStyle = (role) => {
  const styles = {
    CLIENT:  { bg: 'rgba(74, 111, 165, 0.1)',  color: '#4a6fa5', label: 'Client' },
    ARTISAN: { bg: 'rgba(255, 126, 95, 0.1)',  color: '#ff7e5f', label: 'Artisan' },
    ADMIN:   { bg: 'rgba(220, 38, 38, 0.1)',   color: '#dc2626', label: 'Admin' },
  };
  return styles[role] ?? styles.CLIENT;
};

const getStatusBadgeStyle = (status) => {
  const styles = {
    ACTIF:    { bg: 'rgba(34, 197, 94, 0.1)',   color: '#22c55e', label: 'Actif' },
    SUSPENDU: { bg: 'rgba(239, 68, 68, 0.1)',   color: '#ef4444', label: 'Suspendu' },
    INACTIF:  { bg: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af', label: 'Inactif' },
  };
  return styles[status] ?? styles.ACTIF;
};

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString('fr-FR') : '-';

export default function UserTable({
  users = [],
  onUserClick,
  onActionClick,
  showActions = true
}) {
  return (
    <div className="overflow-hidden shadow-md rounded-xl"
      style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
              {['UTILISATEUR', 'RÔLE', 'STATUT', 'CONTACT', 'INSCRIPTION'].map((h) => (
                <th key={h} className="px-6 py-4 text-xs font-semibold text-left" style={{ color: '#6c757d' }}>{h}</th>
              ))}
              {showActions && (
                <th className="px-6 py-4 text-xs font-semibold text-right" style={{ color: '#6c757d' }}>ACTIONS</th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={showActions ? 6 : 5} className="px-6 py-12 text-center">
                  <p className="text-sm" style={{ color: '#6c757d' }}>Aucun utilisateur trouvé</p>
                </td>
              </tr>
            ) : (
              users.map((user) => {
                // Le back peut renvoyer "statut" ou "status"
                const statut = user.statut ?? user.status ?? 'ACTIF';
                const roleStyle = getRoleBadgeStyle(user.role);
                const statusStyle = getStatusBadgeStyle(statut);

                return (
                  <tr key={user.id}
                    className="transition-colors cursor-pointer hover:bg-gray-50"
                    style={{ borderBottom: '1px solid #e9ecef' }}
                    onClick={() => onUserClick?.(user)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-semibold text-white rounded-full"
                          style={{ background: 'linear-gradient(135deg, #4a6fa5, #3a5784)' }}>
                          {getInitials(user.prenom, user.nom)}
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: '#2b2d42' }}>
                            {user.prenom} {user.nom}
                          </p>
                          <p className="text-xs" style={{ color: '#6c757d' }}>ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                        style={{ backgroundColor: roleStyle.bg, color: roleStyle.color }}>
                        {roleStyle.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                        {statusStyle.label}
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
                        {formatDate(user.created_at)}
                      </span>
                    </td>
                    {showActions && (
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={(e) => { e.stopPropagation(); onActionClick?.(user); }}
                          className="p-2 transition-colors rounded-lg hover:bg-gray-100">
                          <MoreVertical className="w-5 h-5" style={{ color: '#6c757d' }} />
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}