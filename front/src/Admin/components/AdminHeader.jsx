import { Search, Settings, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AdminHeader() {
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4"
      style={{ backgroundColor: 'white', borderBottom: '1px solid #e9ecef' }}>

      {/* Barre de recherche */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2" style={{ color: '#6c757d' }} />
          <input type="text" placeholder="Rechercher..."
            className="w-full py-2 pl-10 pr-4 text-sm transition-all border rounded-lg outline-none focus:ring-2"
            style={{ borderColor: '#e9ecef', backgroundColor: '#f8f9fa', color: '#2b2d42' }}
            onFocus={(e) => e.target.style.borderColor = '#4a6fa5'}
            onBlur={(e) => e.target.style.borderColor = '#e9ecef'} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-6">

        {/* Profil */}
        <div className="relative">
          <button onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 p-2 transition-all rounded-lg hover:bg-gray-100">
            <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-white rounded-full"
              style={{ background: 'linear-gradient(135deg, #4a6fa5, #3a5784)' }}>
              {user ? `${user.prenom?.[0] ?? ''}${user.nom?.[0] ?? ''}` : 'AD'}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold" style={{ color: '#2b2d42' }}>
                {user ? `${user.prenom} ${user.nom}` : 'Admin'}
              </p>
              <p className="text-xs" style={{ color: '#6c757d' }}>Administrateur</p>
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 w-56 mt-2 overflow-hidden rounded-lg shadow-lg"
              style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
              <div className="px-4 py-3 border-b" style={{ borderColor: '#e9ecef' }}>
                <p className="text-sm font-semibold" style={{ color: '#2b2d42' }}>
                  {user ? `${user.prenom} ${user.nom}` : 'Admin'}
                </p>
                <p className="text-xs" style={{ color: '#6c757d' }}>
                  {user?.email ?? 'admin@artisanconnect.com'}
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
                <button onClick={logout}
                  className="flex items-center w-full gap-3 px-4 py-2 text-sm text-left transition-colors hover:bg-red-50">
                  <LogOut className="w-4 h-4" style={{ color: '#ef4444' }} />
                  <span style={{ color: '#ef4444' }}>Déconnexion</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}