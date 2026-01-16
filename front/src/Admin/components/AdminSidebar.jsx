import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Store, 
  Briefcase,
  Star,
  Calendar,
  Settings,
  LogOut,
  Hammer,
  Shield
} from 'lucide-react';

export default function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Tableau de bord',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
    },
    {
      title: 'Utilisateurs',
      icon: Users,
      path: '/admin/users',
    },
    {
      title: 'Vérification artisans',
      icon: UserCheck,
      path: '/admin/verification',
      badge: 5
    },
    {
      title: 'Modération',
      icon: Shield,
      path: '/admin/moderation',
      badge: 4,
      badgeColor: '#ef4444'
    },
    {
      title: 'Ateliers',
      icon: Store,
      path: '/admin/ateliers',
    },
    {
      title: 'Services',
      icon: Briefcase,
      path: '/admin/services',
    },
    {
      title: 'Rendez-vous',
      icon: Calendar,
      path: '/admin/appointments',
    },
    {
      title: 'Avis',
      icon: Star,
      path: '/admin/reviews',
    },
    {
      title: 'Paramètres',
      icon: Settings,
      path: '/admin/settings',
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside 
      className="flex flex-col w-64 min-h-screen p-6"
      style={{ 
        backgroundColor: 'white',
        borderRight: '1px solid #e9ecef'
      }}
    >
      {/* Logo */}
      <Link to="/admin/dashboard" className="flex items-center gap-3 mb-8">
        <div 
          className="flex items-center justify-center w-10 h-10 rounded-lg"
          style={{ background: 'linear-gradient(135deg, #4a6fa5, #3a5784)' }}
        >
          <Hammer className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-lg font-bold" style={{ color: '#2b2d42' }}>
            DigitalArt
          </h1>
          <p className="text-xs" style={{ color: '#6c757d' }}>
            Admin Panel
          </p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center justify-between gap-3 px-4 py-3 transition-all rounded-lg"
                  style={{
                    backgroundColor: active ? 'rgba(74, 111, 165, 0.1)' : 'transparent',
                    color: active ? '#4a6fa5' : '#6c757d'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                    <span className={`text-sm ${active ? 'font-semibold' : 'font-medium'}`}>
                      {item.title}
                    </span>
                  </div>
                  {item.badge && (
                    <span 
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{ 
                        backgroundColor: item.badgeColor || '#ff7e5f',
                        color: 'white'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Profil admin */}
      <div className="pt-6 border-t" style={{ borderColor: '#e9ecef' }}>
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="flex items-center justify-center w-10 h-10 font-semibold text-white rounded-full"
            style={{ background: 'linear-gradient(135deg, #ff7e5f, #ff6b4a)' }}
          >
            AD
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: '#2b2d42' }}>
              Admin
            </p>
            <p className="text-xs" style={{ color: '#6c757d' }}>
              admin@DigitalArt.com
            </p>
          </div>
        </div>
        
        <button
          className="flex items-center w-full gap-3 px-4 py-3 transition-all rounded-lg hover:bg-red-50"
          style={{ color: '#ef4444' }}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}