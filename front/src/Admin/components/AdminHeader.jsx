import { Bell, Search, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AdminHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useAuth();

  const notifications = [
    { id: 1, type: 'info', message: 'Nouvel artisan en attente de vérification', time: '5 min' },
    { id: 2, type: 'warning', message: '3 nouveaux signalements', time: '15 min' },
    { id: 3, type: 'success', message: 'Mise à jour système effectuée', time: '1h' },
  ];

  return (
    <header 
      className="sticky top-0 z-40 flex items-center justify-between px-6 py-4"
      style={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid #e9ecef'
      }}
    >
      {/* Barre de recherche */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search 
            className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2" 
            style={{ color: '#6c757d' }} 
          />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full py-2 pl-10 pr-4 text-sm transition-all border rounded-lg outline-none focus:ring-2"
            style={{ 
              borderColor: '#e9ecef',
              backgroundColor: '#f8f9fa',
              color: '#2b2d42'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4a6fa5'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-6">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 transition-all rounded-lg hover:bg-gray-100"
          >
            <Bell className="w-5 h-5" style={{ color: '#6c757d' }} />
            <span 
              className="absolute w-2 h-2 rounded-full top-1 right-1"
              style={{ backgroundColor: '#ff7e5f' }}
            ></span>
          </button>

          {/* Dropdown Notifications */}
          {showNotifications && (
            <div 
              className="absolute right-0 mt-2 overflow-hidden rounded-lg shadow-lg w-80"
              style={{ 
                backgroundColor: 'white',
                border: '1px solid #e9ecef'
              }}
            >
              <div 
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: '#e9ecef' }}
              >
                <h3 className="text-sm font-semibold" style={{ color: '#2b2d42' }}>
                  Notifications
                </h3>
                <span 
                  className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{ 
                    backgroundColor: '#ff7e5f',
                    color: 'white'
                  }}
                >
                  {notifications.length}
                </span>
              </div>
              <div className="overflow-y-auto max-h-96">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id}
                    className="px-4 py-3 transition-colors border-b cursor-pointer hover:bg-gray-50"
                    style={{ borderColor: '#e9ecef' }}
                  >
                    <p className="mb-1 text-sm" style={{ color: '#2b2d42' }}>
                      {notif.message}
                    </p>
                    <p className="text-xs" style={{ color: '#6c757d' }}>
                      Il y a {notif.time}
                    </p>
                  </div>
                ))}
              </div>
              <div 
                className="px-4 py-3 text-center"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <button 
                  className="text-sm font-medium"
                  style={{ color: '#4a6fa5' }}
                >
                  Voir tout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Paramètres */}
        <button className="p-2 transition-all rounded-lg hover:bg-gray-100">
          <Settings className="w-5 h-5" style={{ color: '#6c757d' }} />
        </button>

        {/* Profil */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 p-2 transition-all rounded-lg hover:bg-gray-100"
          >
            <div 
              className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-white rounded-full"
              style={{ background: 'linear-gradient(135deg, #4a6fa5, #3a5784)' }}
            >
              {user ? user.prenom[0] + user.nom[0] : 'AD'}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold" style={{ color: '#2b2d42' }}>
                {user ? `${user.prenom} ${user.nom}` : 'Admin'}
              </p>
              <p className="text-xs" style={{ color: '#6c757d' }}>
                Administrateur
              </p>
            </div>
          </button>

          {/* Dropdown Profil */}
          {showProfile && (
            <div 
              className="absolute right-0 w-56 mt-2 overflow-hidden rounded-lg shadow-lg"
              style={{ 
                backgroundColor: 'white',
                border: '1px solid #e9ecef'
              }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: '#e9ecef' }}>
                <p className="text-sm font-semibold" style={{ color: '#2b2d42' }}>
                  {user ? `${user.prenom} ${user.nom}` : 'Admin'}
                </p>
                <p className="text-xs" style={{ color: '#6c757d' }}>
                  {user?.email || 'admin@digitalart.com'}
                </p>
              </div>
              <div className="py-2">
                <button className="flex items-center w-full gap-3 px-4 py-2 text-sm text-left transition-colors hover:bg-gray-50">
                  <User className="w-4 h-4" style={{ color: '#6c757d' }} />
                  <span style={{ color: '#2b2d42' }}>Mon profil</span>
                </button>
                <button className="flex items-center w-full gap-3 px-4 py-2 text-sm text-left transition-colors hover:bg-gray-50">
                  <Settings className="w-4 h-4" style={{ color: '#6c757d' }} />
                  <span style={{ color: '#2b2d42' }}>Paramètres</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}