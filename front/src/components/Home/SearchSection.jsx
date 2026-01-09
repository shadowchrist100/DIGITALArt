import { useState } from 'react';
import Input from '../Common/Input';
import Button from '../Common/Button';

export default function SearchSection() {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    console.log('Recherche:', { service, location });
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Trouvez votre artisan en quelques clics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Quel service recherchez-vous ?"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-orange-500 focus:outline-none text-lg"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Votre ville ou code postal"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-orange-500 focus:outline-none text-lg"
              />
            </div>
            <Button onClick={handleSearch} className="w-full py-4 text-lg">
              Rechercher
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
