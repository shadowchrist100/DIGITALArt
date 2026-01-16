import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Eye, 
  Ban, 
  Trash2,
  Flag,
  Image as ImageIcon,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

export default function AdminModeration() {
  const [reports, setReports] = useState([]);
  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('PENDING');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(''); // 'suspend' ou 'delete'
  const [motif, setMotif] = useState('');

  const fetchReports = async () => {
    // TODO: Appeler l'API
    // Données mockées avec différents types de signalements
    setReports([
      {
        id: 1,
        type: 'IMAGE_INAPPROPRIEE',
        reported_user_id: 5,
        reported_user_name: 'Jean Kouassi',
        reported_user_role: 'ARTISAN',
        reporter_id: 12,
        reporter_name: 'Marie Dossou',
        content_type: 'GALERIE_IMAGE',
        content_id: 45,
        image_url: 'https://via.placeholder.com/300',
        description: 'Image à caractère sexuel dans la galerie',
        status: 'PENDING',
        created_at: '2025-01-13T10:30:00',
        severity: 'HIGH'
      },
      {
        id: 2,
        type: 'COMMENTAIRE_INAPPROPRIE',
        reported_user_id: 8,
        reported_user_name: 'Pierre Martin',
        reported_user_role: 'CLIENT',
        reporter_id: 15,
        reporter_name: 'Sophie Dubois',
        content_type: 'AVIS',
        content_id: 78,
        comment_text: 'Commentaire à caractère discriminatoire...',
        description: 'Commentaire raciste et insultant',
        status: 'PENDING',
        created_at: '2025-01-13T09:15:00',
        severity: 'HIGH'
      },
      {
        id: 3,
        type: 'OFFRE_ILLEGALE',
        reported_user_id: 10,
        reported_user_name: 'Ahmed Traoré',
        reported_user_role: 'ARTISAN',
        reporter_id: 20,
        reporter_name: 'Fatou Kone',
        content_type: 'OFFRE',
        content_id: 123,
        offre_titre: 'Vente de produits interdits',
        description: 'Vente d\'objets à caractère sexuel',
        status: 'PENDING',
        created_at: '2025-01-13T08:00:00',
        severity: 'CRITICAL'
      },
      {
        id: 4,
        type: 'HARCELEMENT',
        reported_user_id: 15,
        reported_user_name: 'Sébastien Kouadio',
        reported_user_role: 'CLIENT',
        reporter_id: 25,
        reporter_name: 'Aya Bamba',
        content_type: 'MESSAGES',
        description: 'Messages répétés et harcelants',
        status: 'PENDING',
        created_at: '2025-01-12T18:30:00',
        severity: 'MEDIUM'
      }
    ]);
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType, filterStatus]);

  const handleSuspendAccount = async (reportId, userId, permanent = false) => {
    if (!motif.trim()) {
      alert('Veuillez entrer un motif de suspension');
      return;
    }

    // TODO: Appeler l'API
    console.log('Suspension:', {
      reportId,
      userId,
      permanent,
      motif,
      duration: permanent ? null : '30 jours'
    });

    setShowModal(false);
    setMotif('');
    fetchReports();
  };

  const handleDeleteContent = async (reportId, contentType, contentId) => {
    if (!motif.trim()) {
      alert('Veuillez entrer un motif de suppression');
      return;
    }

    // TODO: Appeler l'API
    console.log('Suppression contenu:', {
      reportId,
      contentType,
      contentId,
      motif
    });

    setShowModal(false);
    setMotif('');
    fetchReports();
  };

  const handleRejectReport = async (reportId) => {
    if (window.confirm('Êtes-vous sûr de vouloir rejeter ce signalement ?')) {
      // TODO: Appeler l'API
      console.log('Rejet signalement:', reportId);
      fetchReports();
    }
  };

  const openModal = (report, type) => {
    setSelectedReport(report);
    setActionType(type);
    setShowModal(true);
  };

  const getSeverityStyle = (severity) => {
    const styles = {
      CRITICAL: { bg: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', label: 'CRITIQUE' },
      HIGH: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', label: 'ÉLEVÉ' },
      MEDIUM: { bg: 'rgba(251, 146, 60, 0.1)', color: '#fb923c', label: 'MOYEN' },
      LOW: { bg: 'rgba(250, 204, 21, 0.1)', color: '#facc15', label: 'FAIBLE' }
    };
    return styles[severity] || styles.MEDIUM;
  };

  const getTypeIcon = (type) => {
    const icons = {
      IMAGE_INAPPROPRIEE: ImageIcon,
      COMMENTAIRE_INAPPROPRIE: MessageSquare,
      OFFRE_ILLEGALE: AlertTriangle,
      HARCELEMENT: Flag
    };
    return icons[type] || Flag;
  };

  const getTypeLabel = (type) => {
    const labels = {
      IMAGE_INAPPROPRIEE: 'Image inappropriée',
      COMMENTAIRE_INAPPROPRIE: 'Commentaire inapproprié',
      OFFRE_ILLEGALE: 'Offre illégale',
      HARCELEMENT: 'Harcèlement'
    };
    return labels[type] || type;
  };

  const filteredReports = reports.filter(report => {
    const matchType = filterType === 'ALL' || report.type === filterType;
    const matchStatus = filterStatus === 'ALL' || report.status === filterStatus;
    return matchType && matchStatus;
  });

  const ReportCard = ({ report }) => {
    const TypeIcon = getTypeIcon(report.type);
    const severityStyle = getSeverityStyle(report.severity);

    return (
      <div 
        className="p-6 transition-all shadow-md rounded-xl hover:shadow-lg"
        style={{ 
          backgroundColor: 'white',
          border: '1px solid #e9ecef'
        }}
      >
        {/* En-tête */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div 
              className="flex items-center justify-center w-12 h-12 rounded-lg"
              style={{ backgroundColor: severityStyle.bg }}
            >
              <TypeIcon className="w-6 h-6" style={{ color: severityStyle.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-bold" style={{ color: '#2b2d42' }}>
                  {getTypeLabel(report.type)}
                </h3>
                <span 
                  className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={severityStyle}
                >
                  {severityStyle.label}
                </span>
              </div>
              <p className="flex items-center gap-2 text-xs" style={{ color: '#6c757d' }}>
                <Clock className="w-3 h-3" />
                Signalé le {new Date(report.created_at).toLocaleString('fr-FR')}
              </p>
            </div>
          </div>
          <span 
            className="px-3 py-1 text-xs font-semibold rounded-full"
            style={{ 
              backgroundColor: report.status === 'PENDING' ? 'rgba(251, 146, 60, 0.1)' : 'rgba(34, 197, 94, 0.1)',
              color: report.status === 'PENDING' ? '#fb923c' : '#22c55e'
            }}
          >
            {report.status === 'PENDING' ? 'EN ATTENTE' : 'TRAITÉ'}
          </span>
        </div>

        {/* Détails */}
        <div className="p-4 mb-4 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
          <p className="mb-2 text-sm font-semibold" style={{ color: '#2b2d42' }}>
            Description du signalement :
          </p>
          <p className="mb-3 text-sm" style={{ color: '#6c757d' }}>
            {report.description}
          </p>

          {/* Contenu signalé */}
          {report.image_url && (
            <div className="mt-3">
              <p className="mb-2 text-xs font-semibold" style={{ color: '#6c757d' }}>
                Image signalée :
              </p>
              <img 
                src={report.image_url} 
                alt="Contenu signalé" 
                className="w-full max-w-xs rounded-lg"
                style={{ border: '2px solid #ef4444' }}
              />
            </div>
          )}

          {report.comment_text && (
            <div className="p-3 mt-3 rounded-lg" style={{ 
              backgroundColor: 'white',
              border: '1px solid #e9ecef'
            }}>
              <p className="mb-1 text-xs font-semibold" style={{ color: '#6c757d' }}>
                Commentaire signalé :
              </p>
              <p className="text-sm italic" style={{ color: '#2b2d42' }}>
                "{report.comment_text}"
              </p>
            </div>
          )}

          {report.offre_titre && (
            <div className="mt-3">
              <p className="mb-1 text-xs font-semibold" style={{ color: '#6c757d' }}>
                Offre signalée :
              </p>
              <p className="text-sm font-medium" style={{ color: '#ef4444' }}>
                {report.offre_titre}
              </p>
            </div>
          )}
        </div>

        {/* Utilisateurs impliqués */}
        <div className="grid grid-cols-2 gap-4 pb-4 mb-4 border-b" style={{ borderColor: '#e9ecef' }}>
          <div>
            <p className="mb-2 text-xs font-semibold" style={{ color: '#6c757d' }}>
              Utilisateur signalé :
            </p>
            <p className="text-sm font-medium" style={{ color: '#ef4444' }}>
              {report.reported_user_name}
            </p>
            <p className="text-xs" style={{ color: '#6c757d' }}>
              {report.reported_user_role} - ID: {report.reported_user_id}
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold" style={{ color: '#6c757d' }}>
              Signalé par :
            </p>
            <p className="text-sm font-medium" style={{ color: '#2b2d42' }}>
              {report.reporter_name}
            </p>
            <p className="text-xs" style={{ color: '#6c757d' }}>
              ID: {report.reporter_id}
            </p>
          </div>
        </div>

        {/* Actions */}
        {report.status === 'PENDING' && (
          <div className="flex gap-2">
            <button
              onClick={() => openModal(report, 'suspend')}
              className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-xs font-semibold transition-all rounded-lg hover:shadow-md"
              style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444'
              }}
            >
              <Ban className="w-4 h-4" />
              Suspendre le compte
            </button>
            <button
              onClick={() => openModal(report, 'delete')}
              className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-xs font-semibold transition-all rounded-lg hover:shadow-md"
              style={{ 
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                color: '#dc2626'
              }}
            >
              <Trash2 className="w-4 h-4" />
              Supprimer le contenu
            </button>
            <button
              onClick={() => handleRejectReport(report.id)}
              className="px-4 py-2 text-xs font-semibold transition-all rounded-lg hover:shadow-md"
              style={{ 
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                color: '#22c55e'
              }}
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="mx-auto max-w-7xl">
        {/* En-tête */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold" style={{ color: '#2b2d42' }}>
            Modération de contenu
          </h1>
          <p className="text-sm" style={{ color: '#6c757d' }}>
            Gérer les signalements et contenus inappropriés
          </p>
        </div>

        {/* Alerte */}
        {filteredReports.filter(r => r.status === 'PENDING').length > 0 && (
          <div 
            className="flex items-center gap-3 p-4 mb-6 rounded-lg"
            style={{ 
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}
          >
            <AlertTriangle className="w-5 h-5" style={{ color: '#ef4444' }} />
            <p className="text-sm font-medium" style={{ color: '#2b2d42' }}>
              {filteredReports.filter(r => r.status === 'PENDING').length} signalement
              {filteredReports.filter(r => r.status === 'PENDING').length > 1 ? 's' : ''} en attente de traitement
            </p>
          </div>
        )}

        {/* Filtres */}
        <div 
          className="p-6 mb-6 shadow-md rounded-xl"
          style={{ 
            backgroundColor: 'white',
            border: '1px solid #e9ecef'
          }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 text-sm border rounded-lg outline-none"
              style={{ 
                borderColor: '#e9ecef',
                backgroundColor: '#f8f9fa'
              }}
            >
              <option value="ALL">Tous les types</option>
              <option value="IMAGE_INAPPROPRIEE">Images inappropriées</option>
              <option value="COMMENTAIRE_INAPPROPRIE">Commentaires inappropriés</option>
              <option value="OFFRE_ILLEGALE">Offres illégales</option>
              <option value="HARCELEMENT">Harcèlement</option>
            </select>

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
              <option value="PENDING">En attente</option>
              <option value="RESOLVED">Traités</option>
            </select>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4">
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>Total signalements</p>
            <p className="text-2xl font-bold" style={{ color: '#2b2d42' }}>{reports.length}</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>En attente</p>
            <p className="text-2xl font-bold" style={{ color: '#fb923c' }}>
              {reports.filter(r => r.status === 'PENDING').length}
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>Critiques</p>
            <p className="text-2xl font-bold" style={{ color: '#dc2626' }}>
              {reports.filter(r => r.severity === 'CRITICAL').length}
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e9ecef' }}>
            <p className="mb-1 text-xs font-medium" style={{ color: '#6c757d' }}>Traités</p>
            <p className="text-2xl font-bold" style={{ color: '#22c55e' }}>
              {reports.filter(r => r.status === 'RESOLVED').length}
            </p>
          </div>
        </div>

        {/* Liste des signalements */}
        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredReports.map((report) => (
              <ReportCard key={report.id} report={report} />
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
              Aucun signalement
            </h3>
            <p className="text-sm" style={{ color: '#6c757d' }}>
              Tous les signalements ont été traités
            </p>
          </div>
        )}

        {/* Modal d'action */}
        {showModal && selectedReport && (
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
                {actionType === 'suspend' ? 'Suspendre le compte' : 'Supprimer le contenu'}
              </h3>
              
              <div className="p-4 mb-4 rounded-lg" style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
                <p className="mb-2 text-sm font-medium" style={{ color: '#ef4444' }}>
                  ⚠️ Action importante
                </p>
                <p className="text-xs" style={{ color: '#6c757d' }}>
                  {actionType === 'suspend' 
                    ? `Vous êtes sur le point de suspendre le compte de ${selectedReport.reported_user_name}. L'utilisateur ne pourra plus accéder à la plateforme.`
                    : `Vous êtes sur le point de supprimer définitivement ce contenu.`
                  }
                </p>
              </div>
              
              <textarea
                value={motif}
                onChange={(e) => setMotif(e.target.value)}
                placeholder="Motif de l'action (obligatoire)..."
                rows={4}
                className="w-full p-3 mb-4 text-sm border rounded-lg outline-none"
                style={{ 
                  borderColor: '#e9ecef',
                  backgroundColor: '#f8f9fa'
                }}
              />

              {actionType === 'suspend' && (
                <div className="p-3 mb-4 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                  <p className="mb-2 text-xs font-semibold" style={{ color: '#2b2d42' }}>
                    Type de suspension :
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSuspendAccount(selectedReport.id, selectedReport.reported_user_id, false)}
                      className="flex-1 px-3 py-2 text-xs font-semibold transition-all rounded-lg"
                      style={{ 
                        backgroundColor: 'rgba(251, 146, 60, 0.1)',
                        color: '#fb923c'
                      }}
                    >
                      Temporaire (30j)
                    </button>
                    <button
                      onClick={() => handleSuspendAccount(selectedReport.id, selectedReport.reported_user_id, true)}
                      className="flex-1 px-3 py-2 text-xs font-semibold transition-all rounded-lg"
                      style={{ 
                        backgroundColor: 'rgba(220, 38, 38, 0.1)',
                        color: '#dc2626'
                      }}
                    >
                      Permanente
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setMotif('');
                  }}
                  className="flex-1 px-4 py-2 text-sm font-semibold transition-all rounded-lg"
                  style={{ 
                    backgroundColor: '#f8f9fa',
                    color: '#6c757d'
                  }}
                >
                  Annuler
                </button>
                {actionType === 'delete' && (
                  <button
                    onClick={() => handleDeleteContent(
                      selectedReport.id, 
                      selectedReport.content_type, 
                      selectedReport.content_id
                    )}
                    className="flex-1 px-4 py-2 text-sm font-semibold text-white transition-all rounded-lg hover:shadow-md"
                    style={{ 
                      background: 'linear-gradient(135deg, #dc2626, #991b1b)'
                    }}
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}