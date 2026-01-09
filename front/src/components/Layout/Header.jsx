import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Search, Hammer, LogIn, UserPlus } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', to: '/' },
    { name: 'Trouver un artisan', to: '/trouver' },
    { name: 'Mes demandes', to: '/demandes' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Hammer className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gray-900">
                ArtisanConnect
              </span>
              <span className="text-xs text-gray-600 font-semibold -mt-0.5">
                L'expertise à votre service
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 ml-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full h-11 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login">
              <button className="px-5 py-2.5 bg-white text-gray-700 hover:text-blue-600 hover:bg-gray-50 border border-gray-200 rounded-xl transition-all font-semibold flex items-center gap-2">
                <LogIn className="w-4 h-4" />
              </button>
            </Link>
            <Link to="/register">
              <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full h-11 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-semibold rounded-xl transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
              <Link to="/login">
                <button className="w-full px-4 py-3 bg-white text-gray-700 hover:bg-gray-50 font-semibold rounded-xl transition-all border border-gray-200 flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/register">
                <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}