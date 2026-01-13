import { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Eye, Edit, Trash2, MapPin, Star } from 'lucide-react';

export default function AdminAteliers() {
  const [ateliers, setAteliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showActions, setShowActions] = useState(null);

  const fetchAteliers = async () => {
    // TODO: Appeler l'API
    // Données mockées
    setAteliers([
      {
        id: 1,
        nom: 'Atelier Kouassi Bois',
        artisan_nom: 'Jean Kouassi',
        domaine: 'Menuiserie',
        ville: 'Cotonou',
        note_moyenne: 4.5,
        nombre_avis: 25,
        status: 'ACTIF',
        image_principale: null,
      },
      {
        id: 2,
        nom: 'Électro Dossou',
        artisan_nom: 'Marie Dossou',
        domaine: 'Électricité',
        ville: 'Porto-Novo',
        note_moyenne: 4.8,
        nombre_avis: 42,
        status: 'ACTIF',
        image_principale: null,
      },
    ]);
  };

  useEffect(() => {
    fetchAteliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  const handleDelete = async (atelierId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet atelier ?')) {
      // TODO: Appeler l'API
      console.log('Suppression atelier:', atelierId);
    }
  };

  const filteredAteliers = ateliers.filter(atelier => {
    const matchSearch = 
      atelier.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atelier.artisan_nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atelier.ville.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = filterStatus === 'ALL' || atelier.status === filterStatus;
    
    return matchSearch && matchStatus;
  });

  const getStatusBadgeStyle = (status) => {
    const styles = {
      ACTIF: { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' },
      INACTIF: { bg: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af' },
      EN_VERIFICATION: { bg: 'rgba(251, 146, 60, 0.1)', color: '#fb923c' },
    };
    return styles[status] || styles.ACTIF;
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="mx-auto max-w-7xl">
        {/* En-tête */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold" style={{ color: '#2b2d42' }}>
            Gestion des ateliers
          </h1>
          <p className="text-sm" style={{ color: '#6c757d' }}>
            Liste et gestion de tous les ateliers de la plateforme
          </p>
        </div>

        {/* Filtres */}
        <div 
          className="p-6 mb-6 shadow-md rounded-xl"
          style={{ 
            backgroundColor: 'white',
            border: '1px solid #e9ecef'
          }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="relative">
              <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2" style={{ color: '#6c757d' }} />
              <input
                type="text"
                placeholder="Rechercher un atelier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg outline-none"
                style={{ 
                  borderColor: '#e9ecef',
                  backgroundColor: '#f8f9fa'
                }}
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 text-sm border rounded-lg outline-none"
              style={{ 
                borderColor: '#e9ecef',
                backgroundColor: '#f8f9fa'
              }}
            >
              <option value="ALL">Tous les statuts</option>
              <option value="ACTIF">Actifs</option>
              <option value="INACTIF">Inactifs</option>
              <option value="EN_VERIFICATION">En vérification</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>Total ateliers</p>
            <p className="text-2xl font-bold" style={{ color: '#2b2d42' }}>{ateliers.length}</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>Actifs</p>
            <p className="text-2xl font-bold" style={{ color: '#22c55e' }}>
              {ateliers.filter(a => a.status === 'ACTIF').length}
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>Note moyenne</p>
            <p className="text-2xl font-bold" style={{ color: '#f59e0b' }}>
              {(ateliers.reduce((acc, a) => acc + a.note_moyenne, 0) / ateliers.length || 0).toFixed(1)}
            </p>
          </div>
        </div>

        {/* Liste des ateliers */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAteliers.map((atelier) => {
            const statusStyle = getStatusBadgeStyle(atelier.status);
            
            return (
              <div 
                key={atelier.id}
                className="p-6 transition-all shadow-md rounded-xl hover:shadow-lg"
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e9ecef'
                }}
              >
                {/* En-tête */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-bold" style={{ color: '#2b2d42' }}>
                      {atelier.nom}
                    </h3>
                    <p className="mb-2 text-sm" style={{ color: '#6c757d' }}>
                      Par {atelier.artisan_nom}
                    </p>
                    <span 
                      className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                      style={statusStyle}
                    >
                      {atelier.status}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowActions(showActions === atelier.id ? null : atelier.id)}
                    className="p-2 transition-colors rounded-lg hover:bg-gray-100"
                  >
                    <MoreVertical className="w-5 h-5" style={{ color: '#6c757d' }} />
                  </button>
                </div>

                {/* Info */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: '#6c757d' }} />
                    <span className="text-sm" style={{ color: '#2b2d42' }}>
                      {atelier.ville} • {atelier.domaine}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" style={{ color: '#f59e0b' }} />
                    <span className="text-sm font-medium" style={{ color: '#2b2d42' }}>
                      {atelier.note_moyenne} ({atelier.nombre_avis} avis)
                    </span>
                  </div>
                </div>

                {/* Actions dropdown */}
                {showActions === atelier.id && (
                  <div 
                    className="mb-4 overflow-hidden rounded-lg"
                    style={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e9ecef'
                    }}
                  >
                    <button
                      className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4" style={{ color: '#4a6fa5' }} />
                      <span style={{ color: '#2b2d42' }}>Voir détails</span>
                    </button>
                    <button
                      className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <Edit className="w-4 h-4" style={{ color: '#4a6fa5' }} />
                      <span style={{ color: '#2b2d42' }}>Modifier</span>
                    </button>
                    <button
                      onClick={() => handleDelete(atelier.id)}
                      className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                      <span style={{ color: '#ef4444' }}>Supprimer</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredAteliers.length === 0 && (
          <div 
            className="p-12 text-center shadow-md rounded-xl"
            style={{ 
              backgroundColor: 'white',
              border: '1px solid #e9ecef'
            }}
          >
            <p className="text-sm" style={{ color: '#6c757d' }}>
              Aucun atelier trouvé
            </p>
          </div>
        )}
      </div>
    </div>
  );
}