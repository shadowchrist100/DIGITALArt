import { useState, useEffect, useContext } from 'react';
import { Filter, Clock, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/Common/Card';
import Button from '../../components/Common/Button';
import { useAuth } from '../../components/Auth/AuthContext';

export default function MyServices() {
  const { accesToken } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/services', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accesToken}`,
        },
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`Erreur serveur ${res.status}`);
      const data = await res.json();
      setServices(data.services ?? data.data ?? data ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accesToken) fetchServices();
  }, [accesToken]);

  const handleCancel = async (serviceId) => {
    if (!window.confirm('Annuler cette demande ?')) return;
    try {
      const res = await fetch(`/api/services/${serviceId}/annuler`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accesToken}`,
        },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Erreur lors de l\'annulation');
      fetchServices();
    } catch (err) {
      alert(err.message);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      EN_ATTENTE: { bg: 'rgba(251, 146, 60, 0.1)', color: '#fb923c', icon: Clock, label: 'En attente' },
      ACCEPTE:    { bg: 'rgba(74, 111, 165, 0.1)',  color: 'var(--primary)', icon: CheckCircle, label: 'Accepté' },
      REFUSE:     { bg: 'rgba(239, 68, 68, 0.1)',   color: '#ef4444', icon: XCircle, label: 'Refusé' },
      TERMINE:    { bg: 'rgba(34, 197, 94, 0.1)',   color: '#22c55e', icon: CheckCircle, label: 'Terminé' },
      ANNULE:     { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', icon: XCircle, label: 'Annulé' },
    };
    const style = styles[status] || styles.EN_ATTENTE;
    const Icon = style.icon;
    return (
      <div className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full"
        style={{ backgroundColor: style.bg, color: style.color }}>
        <Icon className="w-3 h-3" />
        {style.label}
      </div>
    );
  };

  const filteredServices = filterStatus === 'all'
    ? services
    : services.filter(s => s.status === filterStatus);

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: 'var(--light)' }}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold rounded-full"
            style={{ backgroundColor: 'rgba(74, 111, 165, 0.1)', color: 'var(--primary)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
            {filteredServices.length} demande{filteredServices.length > 1 ? 's' : ''}
          </div>

          <h1 className="mb-4 text-4xl font-black md:text-5xl" style={{ color: 'var(--dark)' }}>
            Mes demandes
            <span className="text-transparent bg-clip-text"
              style={{ background: 'linear-gradient(90deg, var(--primary), var(--primary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {' '}de services
            </span>
          </h1>

          <p className="mb-6 text-lg" style={{ color: 'var(--dark)', opacity: 0.7 }}>
            Suivez l'état de vos demandes de services
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link to="/services/request" className="flex-1">
              <Button variant="primary" className="w-full">Nouvelle demande de service</Button>
            </Link>
            <Link to="/services/immediate" className="flex-1">
              <Button variant="secondary" className="w-full">Service immédiat</Button>
            </Link>
          </div>
        </div>

        {/* Filtres */}
        <Card className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            <span className="font-bold" style={{ color: 'var(--dark)' }}>Filtrer par statut</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all',       label: 'Tous',       count: services.length },
              { value: 'EN_ATTENTE', label: 'En attente', count: services.filter(s => s.status === 'EN_ATTENTE').length },
              { value: 'ACCEPTE',   label: 'Acceptés',   count: services.filter(s => s.status === 'ACCEPTE').length },
              { value: 'TERMINE',   label: 'Terminés',   count: services.filter(s => s.status === 'TERMINE').length },
            ].map(f => (
              <button key={f.value} onClick={() => setFilterStatus(f.value)}
                className="px-4 py-2 text-sm font-bold transition-all rounded-lg"
                style={{
                  backgroundColor: filterStatus === f.value ? 'var(--primary)' : 'white',
                  color: filterStatus === f.value ? 'white' : 'var(--dark)',
                  border: `2px solid ${filterStatus === f.value ? 'var(--primary)' : 'var(--gray-dark)'}`,
                }}>
                {f.label} ({f.count})
              </button>
            ))}
          </div>
        </Card>

        {/* Erreur */}
        {error && (
          <Card className="py-10 mb-8 text-center">
            <p className="mb-4 font-semibold" style={{ color: '#e74c3c' }}>⚠️ {error}</p>
            <Button onClick={fetchServices}>Réessayer</Button>
          </Card>
        )}

        {/* Contenu */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 rounded-full border-t-transparent animate-spin"
              style={{ borderColor: 'var(--primary)' }} />
          </div>
        ) : !error && filteredServices.length > 0 ? (
          <div className="space-y-4">
            {filteredServices.map(service => (
              <Card key={service.id} hover className="p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  {/* Photo artisan */}
                  <div className="flex-shrink-0 w-full h-32 overflow-hidden md:w-32 rounded-xl"
                    style={{ backgroundColor: 'var(--gray)' }}>
                    {service.artisan?.image || service.artisan?.photo ? (
                      <img
                        src={service.artisan.image ?? service.artisan.photo}
                        alt={service.artisan.name ?? service.artisan.nom}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-3xl font-black text-white"
                        style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-light))' }}>
                        {(service.artisan?.name ?? service.artisan?.prenom ?? '?').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="mb-1 text-xl font-bold" style={{ color: 'var(--dark)' }}>
                          {service.title ?? service.titre}
                        </h3>
                        <p className="mb-2 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                          {service.artisan?.name ?? `${service.artisan?.prenom ?? ''} ${service.artisan?.nom ?? ''}`.trim()}
                          {service.artisan?.specialty || service.artisan?.specialite
                            ? ` - ${service.artisan.specialty ?? service.artisan.specialite}`
                            : ''}
                        </p>
                        <p className="mb-2 text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                          {service.description}
                        </p>
                      </div>
                      {getStatusBadge(service.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-4">
                      <div>
                        <div className="mb-1 text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>Date demande</div>
                        <div className="text-sm font-bold" style={{ color: 'var(--dark)' }}>
                          {service.createdAt ?? service.created_at
                            ? new Date(service.createdAt ?? service.created_at).toLocaleDateString('fr-FR')
                            : '—'}
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>Budget estimé</div>
                        <div className="text-sm font-bold" style={{ color: 'var(--accent)' }}>
                          {service.budget ? `${service.budget} FCFA` : '—'}
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>Urgence</div>
                        <div className="text-sm font-bold"
                          style={{ color: service.urgent ? '#ef4444' : 'var(--dark)' }}>
                          {service.urgent ? 'Urgent' : 'Normal'}
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>Référence</div>
                        <div className="text-sm font-bold" style={{ color: 'var(--dark)' }}>#{service.id}</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link to={`/service/${service.id}`}>
                        <Button variant="outline" className="!px-4 !py-2 !text-sm">
                          <Eye className="w-4 h-4" /> Détails
                        </Button>
                      </Link>

                      {service.status === 'TERMINE' && !service.reviewed && (
                        <Link to={`/reviews/write/${service.artisan?.id}`}>
                          <Button variant="secondary" className="!px-4 !py-2 !text-sm">
                            Laisser un avis
                          </Button>
                        </Link>
                      )}

                      {service.status === 'EN_ATTENTE' && (
                        <Button
                          variant="outline"
                          className="!px-4 !py-2 !text-sm"
                          style={{ color: '#ef4444', borderColor: '#ef4444' }}
                          onClick={() => handleCancel(service.id)}
                        >
                          Annuler
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : !error && (
          <Card className="py-20 text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full"
              style={{ backgroundColor: 'rgba(255, 126, 95, 0.1)' }}>
              <AlertCircle className="w-10 h-10" style={{ color: 'var(--accent)' }} />
            </div>
            <h3 className="mb-3 text-2xl font-bold" style={{ color: 'var(--dark)' }}>Aucune demande</h3>
            <p className="mb-6 text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
              Vous n'avez pas encore de demande de service
            </p>
            <Link to="/services/request"><Button>Faire une demande</Button></Link>
          </Card>
        )}
      </div>
    </div>
  );
}