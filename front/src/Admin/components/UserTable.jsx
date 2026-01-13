import { MoreVertical, Mail, Phone } from 'lucide-react';
import { getInitials, getRoleBadgeStyle, getStatusBadgeStyle, formatDate } from '../utils/helpers';

export default function UserTable({ 
  users = [], 
  onUserClick, 
  onActionClick,
  showActions = true 
}) {
  return (
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
              {showActions && (
                <th className="px-6 py-4 text-xs font-semibold text-right" style={{ color: '#6c757d' }}>
                  ACTIONS
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td 
                  colSpan={showActions ? 6 : 5} 
                  className="px-6 py-12 text-center"
                >
                  <p className="text-sm" style={{ color: '#6c757d' }}>
                    Aucun utilisateur trouvé
                  </p>
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const roleStyle = getRoleBadgeStyle(user.role);
                const statusStyle = getStatusBadgeStyle(user.status);

                return (
                  <tr 
                    key={user.id}
                    className="transition-colors cursor-pointer hover:bg-gray-50"
                    style={{ borderBottom: '1px solid #e9ecef' }}
                    onClick={() => onUserClick && onUserClick(user)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-semibold text-white rounded-full"
                          style={{ background: 'linear-gradient(135deg, #4a6fa5, #3a5784)' }}
                        >
                          {getInitials(user.prenom, user.nom)}
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
                        style={{ 
                          backgroundColor: roleStyle.bg,
                          color: roleStyle.color
                        }}
                      >
                        {roleStyle.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                        style={{ 
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color
                        }}
                      >
                        {statusStyle.label}
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
                        {formatDate(user.created_at)}
                      </span>
                    </td>
                    {showActions && (
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onActionClick && onActionClick(user);
                          }}
                          className="p-2 transition-colors rounded-lg hover:bg-gray-100"
                        >
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