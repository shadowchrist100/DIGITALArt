import { useState, useEffect } from 'react';
import { 
  Check, 
  X, 
  Eye, 
  Phone, 
  Mail, 
  Briefcase, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function AdminArtisanVerification() {
  const [artisansEnAttente, setArtisansEnAttente] = useState([]);
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [motifRefus, setMotifRefus] = useState('');

  const fetchArtisansEnAttente = async () => {
    // TODO: Appeler l'API
    // Données mockées
    setArtisansEnAttente([
      {
        id: 1,
        artisan_id: 1,
        nom: 'Kouassi',
        prenom: 'Jean',
        email: 'jean.kouassi@example.com',
        telephone: '+229 97 00 00 01',
        specialite: 'Menuiserie',
        experience_annees: 5,
        date_inscription: '2025-01-10',
        nom_atelier: 'Atelier Kouassi Bois',
        description_atelier: 'Spécialisé dans la menuiserie sur mesure',
        ville: 'Cotonou',
        status_verification: 'EN_ATTENTE'
      },
      {
        id: 2,
        artisan_id: 2,
        nom: 'Dossou',
        prenom: 'Marie',
        email: 'marie.dossou@example.com',
        telephone: '+229 97 00 00 02',
        specialite: 'Électricité',
        experience_annees: 8,
        date_inscription: '2025-01-11',
        nom_atelier: 'Électro Dossou',
        description_atelier: 'Installation et réparation électrique',
        ville: 'Porto-Novo',
        status_verification: 'EN_ATTENTE'
      }
    ]);
  };

  useEffect(() => {
    fetchArtisansEnAttente();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = async (artisanId) => {
    if (window.confirm('Êtes-vous sûr de vouloir vérifier cet artisan ?')) {
      // TODO: Appeler l'API pour approuver
      console.log('Approbation:', artisanId);
      fetchArtisansEnAttente();
    }
  };

  const handleReject = async (artisanId) => {
    if (!motifRefus.trim()) {
      alert('Veuillez entrer un motif de refus');
      return;
    }
    
    // TODO: Appeler l'API pour refuser
    console.log('Refus:', artisanId, motifRefus);
    setShowModal(false);
    setMotifRefus('');
    fetchArtisansEnAttente();
  };

  const openRejectModal = (artisan) => {
    setSelectedArtisan(artisan);
    setShowModal(true);
  };

  const ArtisanCard = ({ artisan }) => (
    <div 
      className="p-6 transition-all shadow-md rounded-xl hover:shadow-lg"
      style={{ 
        backgroundColor: 'white',
        border: '1px solid #e9ecef'
      }}
    >
      {/* En-tête */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div 
            className="flex items-center justify-center w-16 h-16 text-xl font-bold text-white rounded-full"
            style={{ background: 'linear-gradient(135deg, #4a6fa5, #3a5784)' }}
          >
            {artisan.prenom[0]}{artisan.nom[0]}
          </div>
          <div>
            <h3 className="mb-1 text-lg font-bold" style={{ color: '#2b2d42' }}>
              {artisan.prenom} {artisan.nom}
            </h3>
            <div 
              className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full"
              style={{ 
                backgroundColor: 'rgba(255, 126, 95, 0.1)',
                color: '#ff7e5f'
              }}
            >
              {artisan.specialite}
            </div>
            <p className="flex items-center gap-2 text-xs" style={{ color: '#6c757d' }}>
              <Clock className="w-3 h-3" />
              Inscrit le {new Date(artisan.date_inscription).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
        <div 
          className="px-3 py-1 text-xs font-semibold rounded-full"
          style={{ 
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            color: '#ffc107'
          }}
        >
          EN ATTENTE
        </div>
      </div>

      {/* Informations */}
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4" style={{ color: '#6c757d' }} />
            <span className="text-sm" style={{ color: '#2b2d42' }}>
              {artisan.email}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4" style={{ color: '#6c757d' }} />
            <span className="text-sm" style={{ color: '#2b2d42' }}>
              {artisan.telephone}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" style={{ color: '#6c757d' }} />
            <span className="text-sm" style={{ color: '#2b2d42' }}>
              {artisan.experience_annees} ans d'expérience
            </span>
          </div>
        </div>
        
        <div>
          <h4 className="mb-2 text-sm font-semibold" style={{ color: '#2b2d42' }}>
            Atelier
          </h4>
          <p className="mb-1 text-sm font-medium" style={{ color: '#4a6fa5' }}>
            {artisan.nom_atelier}
          </p>
          <p className="mb-1 text-xs" style={{ color: '#6c757d' }}>
            {artisan.description_atelier}
          </p>
          <p className="text-xs" style={{ color: '#6c757d' }}>
            📍 {artisan.ville}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t" style={{ borderColor: '#e9ecef' }}>
        <button
          onClick={() => handleApprove(artisan.artisan_id)}
          className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-semibold transition-all rounded-lg hover:shadow-md"
          style={{ 
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            color: '#22c55e'
          }}
        >
          <CheckCircle className="w-4 h-4" />
          Approuver
        </button>
        <button
          onClick={() => openRejectModal(artisan)}
          className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-sm font-semibold transition-all rounded-lg hover:shadow-md"
          style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444'
          }}
        >
          <XCircle className="w-4 h-4" />
          Refuser
        </button>
        <button
          className="px-4 py-2 text-sm font-semibold transition-all rounded-lg hover:shadow-md"
          style={{ 
            backgroundColor: 'rgba(74, 111, 165, 0.1)',
            color: '#4a6fa5'
          }}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="mx-auto max-w-7xl">
        {/* En-tête */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold" style={{ color: '#2b2d42' }}>
            Vérification des artisans
          </h1>
          <p className="text-sm" style={{ color: '#6c757d' }}>
            Valider ou refuser les demandes d'inscription des artisans
          </p>
        </div>

        {/* Alertes */}
        {artisansEnAttente.length > 0 && (
          <div 
            className="flex items-center gap-3 p-4 mb-6 rounded-lg"
            style={{ 
              backgroundColor: 'rgba(255, 193, 7, 0.1)',
              border: '1px solid rgba(255, 193, 7, 0.3)'
            }}
          >
            <AlertCircle className="w-5 h-5" style={{ color: '#ffc107' }} />
            <p className="text-sm font-medium" style={{ color: '#2b2d42' }}>
              {artisansEnAttente.length} artisan{artisansEnAttente.length > 1 ? 's' : ''} en attente de vérification
            </p>
          </div>
        )}

        {/* Liste des artisans */}
        {artisansEnAttente.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {artisansEnAttente.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        ) : (
          <div 
            className="p-12 text-center shadow-md rounded-xl"
            style={{ 
              backgroundColor: 'white',
              border: '1px solid #e9ecef'
            }}
          >
            <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: '#22c55e' }} />
            <h3 className="mb-2 text-lg font-bold" style={{ color: '#2b2d42' }}>
              Aucune demande en attente
            </h3>
            <p className="text-sm" style={{ color: '#6c757d' }}>
              Toutes les demandes ont été traitées
            </p>
          </div>
        )}

        {/* Modal de refus */}
        {showModal && selectedArtisan && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setShowModal(false)}
          >
            <div 
              className="w-full max-w-md p-6 shadow-xl rounded-xl"
              style={{ backgroundColor: 'white' }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="mb-4 text-xl font-bold" style={{ color: '#2b2d42' }}>
                Refuser l'artisan
              </h3>
              <p className="mb-4 text-sm" style={{ color: '#6c757d' }}>
                Vous êtes sur le point de refuser <strong>{selectedArtisan.prenom} {selectedArtisan.nom}</strong>. 
                Veuillez indiquer le motif du refus.
              </p>
              
              <textarea
                value={motifRefus}
                onChange={(e) => setMotifRefus(e.target.value)}
                placeholder="Motif du refus..."
                rows={4}
                className="w-full p-3 mb-4 text-sm border rounded-lg outline-none"
                style={{ 
                  borderColor: '#e9ecef',
                  backgroundColor: '#f8f9fa'
                }}
              />

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setMotifRefus('');
                  }}
                  className="flex-1 px-4 py-2 text-sm font-semibold transition-all rounded-lg"
                  style={{ 
                    backgroundColor: '#f8f9fa',
                    color: '#6c757d'
                  }}
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleReject(selectedArtisan.artisan_id)}
                  className="flex-1 px-4 py-2 text-sm font-semibold text-white transition-all rounded-lg hover:shadow-md"
                  style={{ 
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)'
                  }}
                >
                  Confirmer le refus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}