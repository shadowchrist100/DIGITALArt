import { Info } from 'lucide-react';

export default function AdminSettings() {
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold" style={{ color: '#2b2d42' }}>Paramètres système</h1>
          <p className="text-sm" style={{ color: '#6c757d' }}>Configuration de la plateforme</p>
        </div>

        <div className="p-6 shadow-md rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-5 h-5" style={{ color: '#4a6fa5' }} />
            <h2 className="text-lg font-semibold" style={{ color: '#2b2d42' }}>Informations</h2>
          </div>
          <p className="text-sm" style={{ color: '#6c757d' }}>
            Aucune route de paramètres n'est disponible dans l'API actuelle. Cette section sera implémentée lors d'une prochaine version du back-end.
          </p>
        </div>
      </div>
    </div>
  );
}