import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function SearchSection() {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    console.log('Recherche:', { service, location });
  };

  return (
    <section className="relative py-16">
      <div className="w-full max-w-5xl px-4 mx-auto">
        <div className="p-8 shadow-2xl bg-gradient-to-br from-white to-gray-50 rounded-2xl md:p-12" style={{ border: '1px solid var(--gray-dark)' }}>
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <h2 className="mb-6 text-3xl font-black md:text-4xl" style={{ color: 'var(--dark)' }}>
              Trouvez votre artisan
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {' '}en quelques clics
              </span>
            </h2>
            <p className="text-lg" style={{ color: 'var(--dark)', opacity: 0.7 }}>
              Recherchez parmi des milliers de professionnels qualifiés
            </p>
          </div>
          
          <div className="flex flex-col items-center max-w-4xl gap-4 p-2 mx-auto bg-white shadow-lg sm:flex-row rounded-2xl" style={{ border: '1px solid var(--gray-dark)' }}>
            <div className="flex items-center flex-1 w-full gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: 'var(--gray)' }}>
              <Search className="w-5 h-5" style={{ color: 'var(--primary-light)' }} />
              <input
                type="text"
                placeholder="Ex: Rénovation cuisine, Plombier, Électricien..."
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="flex-1 text-sm bg-transparent outline-none"
                style={{ color: 'var(--dark)' }}
              />
            </div>
            <div className="flex items-center flex-1 w-full gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: 'var(--gray)' }}>
              <MapPin className="w-5 h-5" style={{ color: 'var(--primary-light)' }} />
              <input
                type="text"
                placeholder="Ville ou Code Postal"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 text-sm bg-transparent outline-none"
                style={{ color: 'var(--dark)' }}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="flex items-center justify-center w-full gap-2 px-6 py-3 text-sm font-bold text-white transition-all shadow-md sm:w-auto rounded-xl whitespace-nowrap hover:shadow-lg group"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' }}
            >
              <Search className="w-4 h-4" />
              Rechercher
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
            <span className="px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255, 126, 95, 0.1)', color: '#ff7e5f' }}>
              Plombiers
            </span>
            <span className="px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
              Électriciens
            </span>
            <span className="px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'green' }}>
              Menuisiers
            </span>
            <span className="px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', color: 'purple' }}>
              Peintres
            </span>
            <span className="px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'orange' }}>
              Carreleurs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}