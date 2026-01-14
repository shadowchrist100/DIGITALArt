import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Search, Hammer, LogIn, UserPlus } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', to: '/' },
    { name: 'Trouver un artisan', to: '/artisans' },
    { name: 'Mes demandes', to: '/my-services' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b shadow-sm bg-white/95 backdrop-blur-xl" style={{ borderColor: 'var(--gray-dark)' }}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 transition-opacity rounded-2xl blur-lg opacity-30 group-hover:opacity-50" style={{ background: 'var(--primary)' }}></div>
              <div className="relative flex items-center justify-center transition-transform duration-300 shadow-xl w-11 h-11 rounded-2xl group-hover:scale-110" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}>
                <Hammer className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black" style={{ color: 'var(--dark)' }}>
                DigitalArt
              </span>
              <span className="text-xs font-semibold -mt-0.5" style={{ color: 'var(--primary)' }}>
                L'expertise à votre service
              </span>
            </div>
          </Link>

          <nav className="items-center hidden gap-6 ml-12 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="px-4 py-2 font-semibold transition-colors rounded-lg hover:bg-gray-50"
                style={{ color: 'var(--dark)' }}
                onMouseEnter={(e) => e.target.style.color = '#ff7e5f'}
                onMouseLeave={(e) => e.target.style.color = 'var(--dark)'}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex-1 hidden max-w-md mx-8 md:flex">
            <div className="relative w-full">
              <Search className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2" style={{ color: 'var(--primary-light)' }} />
              <input
                type="text"
                placeholder="Plombier, électricien, menuisier..."
                className="w-full pr-4 text-sm placeholder-gray-400 transition border h-11 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                style={{ 
                  backgroundColor: 'var(--gray)', 
                  borderColor: 'var(--gray-dark)',
                  color: 'var(--dark)'
                }}
              />
            </div>
          </div>

          <div className="items-center hidden gap-3 lg:flex">
            <Link to="/login">
              <button className="px-5 py-2.5 border rounded-xl transition-all font-semibold flex items-center gap-2 hover:shadow-md" style={{ backgroundColor: 'var(--light)', color: '#ff7e5f', borderColor: '#ff7e5f' }}>
                <LogIn className="w-4 h-4" />
              </button>
            </Link>
            <Link to="/register">
              <button className="px-5 py-2.5 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2" style={{ backgroundColor: '#ff7e5f' }}>
                <UserPlus className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl border transition-colors"
            style={{ backgroundColor: 'var(--gray)', borderColor: 'var(--gray-dark)' }}
          >
            {isOpen ? <X className="w-6 h-6" style={{ color: 'var(--dark)' }} /> : <Menu className="w-6 h-6" style={{ color: 'var(--dark)' }} />}
          </button>
        </div>

        <div className="pb-4 md:hidden">
          <div className="relative">
            <Search className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2" style={{ color: 'var(--primary-light)' }} />
            <input
              type="text"
              placeholder="Rechercher un artisan..."
              className="w-full pr-4 text-sm placeholder-gray-400 transition border h-11 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
              style={{ 
                backgroundColor: 'var(--gray)', 
                borderColor: 'var(--gray-dark)',
                color: 'var(--dark)'
              }}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="bg-white border-b lg:hidden" style={{ borderColor: 'var(--gray-dark)' }}>
          <nav className="flex flex-col gap-2 px-4 py-4 mx-auto max-w-7xl sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="px-4 py-3 font-semibold transition-colors rounded-xl hover:bg-gray-50"
                style={{ color: 'var(--dark)' }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t" style={{ borderColor: 'var(--gray-dark)' }}>
              <Link to="/login">
                <button className="flex items-center justify-center w-full gap-2 px-4 py-3 font-semibold transition-all border rounded-xl hover:shadow-md" style={{ backgroundColor: 'var(--light)', color: '#ff7e5f', borderColor: '#ff7e5f' }}>
                  <LogIn className="w-4 h-4" />
                  <span>Connexion</span>
                </button>
              </Link>
              <Link to="/register">
                <button className="flex items-center justify-center w-full gap-2 px-4 py-3 font-semibold text-white transition-all shadow-md rounded-xl hover:shadow-lg" style={{ backgroundColor: '#ff7e5f' }}>
                  <UserPlus className="w-4 h-4" />
                  <span>S'inscrire</span>
                </button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}