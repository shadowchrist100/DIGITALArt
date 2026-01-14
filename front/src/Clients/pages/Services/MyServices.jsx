import { useState, useEffect } from 'react';
import { Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/Common/Card';
import Button from '../../components/Common/Button';

export default function MyServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setTimeout(() => {
        setServices(mockServices);
        setLoading(false);
      }, 800);
    };
    fetchServices();
  }, [filterStatus]);

  const getStatusBadge = (status) => {
    const styles = {
      EN_ATTENTE: { bg: 'rgba(251, 146, 60, 0.1)', color: '#fb923c', icon: Clock, label: 'En attente' },
      ACCEPTE: { bg: 'rgba(74, 111, 165, 0.1)', color: 'var(--primary)', icon: CheckCircle, label: 'Accepté' },
      REFUSE: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', icon: XCircle, label: 'Refusé' },
      TERMINE: { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', icon: CheckCircle, label: 'Terminé' },
      ANNULE: { bg: 'rgba(107, 114, 128, 0.1)', color: '#6b7280', icon: XCircle, label: 'Annulé' }
    };

    const style = styles[status] || styles.EN_ATTENTE;
    const Icon = style.icon;

    return (
      <div className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full" style={{ backgroundColor: style.bg, color: style.color }}>
        <Icon className="w-3 h-3" />
        {style.label}
      </div>
    );
  };

  const filteredServices = filterStatus === 'all' ? services : services.filter(s => s.status === filterStatus);

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: 'var(--light)' }}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold rounded-full" style={{ backgroundColor: 'rgba(74, 111, 165, 0.1)', color: 'var(--primary)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
            {filteredServices.length} demande{filteredServices.length > 1 ? 's' : ''}
          </div>

          <h1 className="mb-4 text-4xl font-black md:text-5xl" style={{ color: 'var(--dark)' }}>
            Mes demandes
            <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(90deg, var(--primary), var(--primary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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

        <Card className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            <span className="font-bold" style={{ color: 'var(--dark)' }}>Filtrer par statut</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'Tous', count: services.length },
              { value: 'EN_ATTENTE', label: 'En attente', count: services.filter(s => s.status === 'EN_ATTENTE').length },
              { value: 'ACCEPTE', label: 'Acceptés', count: services.filter(s => s.status === 'ACCEPTE').length },
              { value: 'TERMINE', label: 'Terminés', count: services.filter(s => s.status === 'TERMINE').length }
            ].map(filter => (
              <button
                key={filter.value}
                onClick={() => setFilterStatus(filter.value)}
                className="px-4 py-2 text-sm font-bold transition-all rounded-lg"
                style={{
                  backgroundColor: filterStatus === filter.value ? 'var(--primary)' : 'white',
                  color: filterStatus === filter.value ? 'white' : 'var(--dark)',
                  border: `2px solid ${filterStatus === filter.value ? 'var(--primary)' : 'var(--gray-dark)'}`
                }}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 rounded-full border-t-transparent animate-spin" style={{ borderColor: 'var(--primary)' }} />
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="space-y-4">
            {filteredServices.map(service => (
              <Card key={service.id} hover className="p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex-shrink-0 w-full h-32 overflow-hidden md:w-32 rounded-xl" style={{ backgroundColor: 'var(--gray)' }}>
                    <img src={service.artisan.image} alt={service.artisan.name} className="object-cover w-full h-full" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="mb-1 text-xl font-bold" style={{ color: 'var(--dark)' }}>{service.title}</h3>
                        <p className="mb-2 text-sm font-semibold" style={{ color: 'var(--accent)' }}>{service.artisan.name} - {service.artisan.specialty}</p>
                        <p className="mb-2 text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>{service.description}</p>
                      </div>
                      {getStatusBadge(service.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-4">
                      <div>
                        <div className="mb-1 text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>Date demande</div>
                        <div className="text-sm font-bold" style={{ color: 'var(--dark)' }}>{service.createdAt}</div>
                      </div>
                      <div>
                        <div className="mb-1 text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>Budget estimé</div>
                        <div className="text-sm font-bold" style={{ color: 'var(--accent)' }}>{service.budget} FCFA</div>
                      </div>
                      <div>
                        <div className="mb-1 text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>Urgence</div>
                        <div className="text-sm font-bold" style={{ color: service.urgent ? '#ef4444' : 'var(--dark)' }}>{service.urgent ? 'Urgent' : 'Normal'}</div>
                      </div>
                      <div>
                        <div className="mb-1 text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>Référence</div>
                        <div className="text-sm font-bold" style={{ color: 'var(--dark)' }}>#{service.id}</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link to={`/service/${service.id}`}>
                        <Button variant="outline" className="!px-4 !py-2 !text-sm"><Eye className="w-4 h-4" />Détails</Button>
                      </Link>

                      {service.status === 'TERMINE' && !service.reviewed && (
                        <Link to={`/reviews/write/${service.artisan.id}`}>
                          <Button variant="secondary" className="!px-4 !py-2 !text-sm">Laisser un avis</Button>
                        </Link>
                      )}

                      {service.status === 'EN_ATTENTE' && (
                        <Button variant="outline" className="!px-4 !py-2 !text-sm text-red-500">Annuler</Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-20 text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full" style={{ backgroundColor: 'rgba(255, 126, 95, 0.1)' }}>
              <AlertCircle className="w-10 h-10" style={{ color: 'var(--accent)' }} />
            </div>
            <h3 className="mb-3 text-2xl font-bold" style={{ color: 'var(--dark)' }}>Aucune demande</h3>
            <p className="mb-6 text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>Vous n'avez pas encore de demande de service</p>
            <Link to="/services/request"><Button>Faire une demande</Button></Link>
          </Card>
        )}
      </div>
    </div>
  );
}

const mockServices = [
  {
    id: 1001,
    title: "Réparation fuite d'eau",
    description: "Fuite au niveau du lavabo de la cuisine, intervention urgente souhaitée",
    artisan: { name: "Jean Kouassi", specialty: "Plomberie", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=200" },
    status: "ACCEPTE",
    budget: "25000",
    urgent: true,
    createdAt: "14 Jan 2026",
    reviewed: false
  },
  {
    id: 1002,
    title: "Installation électrique",
    description: "Installation de prises électriques dans 3 chambres",
    artisan: { name: "Marie Dossou", specialty: "Électricité", image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=200" },
    status: "TERMINE",
    budget: "45000",
    urgent: false,
    createdAt: "10 Jan 2026",
    reviewed: false
  },
  {
    id: 1003,
    title: "Rénovation salon",
    description: "Peinture complète du salon avec préparation des murs",
    artisan: { name: "Thomas Ahoyo", specialty: "Peinture", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" },
    status: "EN_ATTENTE",
    budget: "120000",
    urgent: false,
    createdAt: "13 Jan 2026",
    reviewed: false
  }
];
