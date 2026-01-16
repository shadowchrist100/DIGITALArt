import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/Common/Card';
import Button from '../../components/Common/Button';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      // TODO: Appel API Laravel
      setTimeout(() => {
        setAppointments(mockAppointments);
        setLoading(false);
      }, 800);
    };

    fetchAppointments();
  }, [filterStatus]);

  const getStatusBadge = (status) => {
    const styles = {
      EN_ATTENTE: { bg: 'rgba(251, 146, 60, 0.1)', color: '#fb923c', icon: Clock, label: 'En attente' },
      ACCEPTE: { bg: 'rgba(74, 111, 165, 0.1)', color: 'var(--primary)', icon: CheckCircle, label: 'Confirmé' },
      REFUSE: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', icon: XCircle, label: 'Refusé' },
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

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) return;
    
    // TODO: Appel API
    console.log('Annuler RDV:', appointmentId);
    
    // Refetch appointments after cancellation
    setLoading(true);
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 800);
  };

  const filteredAppointments = filterStatus === 'all' 
    ? appointments 
    : appointments.filter(a => a.status === filterStatus);

  // Séparer les RDV à venir et passés
  const upcomingAppointments = filteredAppointments.filter(a => new Date(a.dateTime) >= new Date());
  const pastAppointments = filteredAppointments.filter(a => new Date(a.dateTime) < new Date());

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: 'var(--light)' }}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold rounded-full" style={{ backgroundColor: 'rgba(74, 111, 165, 0.1)', color: 'var(--primary)' }}>
            <Calendar className="w-4 h-4" />
            {filteredAppointments.length} rendez-vous
          </div>
          
          <h1 className="mb-4 text-4xl font-black md:text-5xl" style={{ color: 'var(--dark)' }}>
            Mes
            <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(90deg, var(--primary), var(--primary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {' '}rendez-vous
            </span>
          </h1>
          <p className="mb-6 text-lg" style={{ color: 'var(--dark)', opacity: 0.7 }}>
            Gérez vos rendez-vous avec les artisans
          </p>

          <Link to="/appointments/book">
            <Button variant="primary">
              <Calendar className="w-5 h-5" />
              Prendre un rendez-vous
            </Button>
          </Link>
        </div>

        {/* Filtres */}
        <Card className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'Tous', count: appointments.length },
              { value: 'EN_ATTENTE', label: 'En attente', count: appointments.filter(a => a.status === 'EN_ATTENTE').length },
              { value: 'ACCEPTE', label: 'Confirmés', count: appointments.filter(a => a.status === 'ACCEPTE').length }
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
            <div className="w-12 h-12 border-4 rounded-full border-t-transparent animate-spin" style={{ borderColor: 'var(--primary)' }}></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Rendez-vous à venir */}
            {upcomingAppointments.length > 0 && (
              <div>
                <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold" style={{ color: 'var(--dark)' }}>
                  <Calendar className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                  À venir ({upcomingAppointments.length})
                </h2>
                <div className="space-y-4">
                  {upcomingAppointments.map(appointment => (
                    <Card key={appointment.id} hover className="p-6">
                      <div className="flex flex-col gap-6 md:flex-row">
                        {/* Image artisan */}
                        <div className="flex-shrink-0 w-full h-32 overflow-hidden md:w-32 rounded-xl" style={{ backgroundColor: 'var(--gray)' }}>
                          <img src={appointment.artisan.image} alt={appointment.artisan.name} className="object-cover w-full h-full" />
                        </div>

                        {/* Infos */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="mb-1 text-xl font-bold" style={{ color: 'var(--dark)' }}>
                                {appointment.artisan.name}
                              </h3>
                              <p className="mb-2 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                                {appointment.artisan.specialty}
                              </p>
                              <p className="text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                                {appointment.service}
                              </p>
                            </div>
                            {getStatusBadge(appointment.status)}
                          </div>

                          <div className="grid grid-cols-1 gap-4 p-4 mb-4 rounded-lg md:grid-cols-3" style={{ backgroundColor: 'var(--gray)' }}>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                              <div>
                                <div className="text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>
                                  Date
                                </div>
                                <div className="text-sm font-bold" style={{ color: 'var(--dark)' }}>
                                  {appointment.date}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                              <div>
                                <div className="text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>
                                  Heure
                                </div>
                                <div className="text-sm font-bold" style={{ color: 'var(--dark)' }}>
                                  {appointment.time}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                              <div>
                                <div className="text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>
                                  Lieu
                                </div>
                                <div className="text-sm font-bold" style={{ color: 'var(--dark)' }}>
                                  {appointment.location}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Link to={`/appointment/${appointment.id}`}>
                              <Button variant="outline" className="!px-4 !py-2 !text-sm">
                                <Eye className="w-4 h-4" />
                                Détails
                              </Button>
                            </Link>
                            
                            {appointment.status === 'ACCEPTE' && (
                              <Button variant="primary" className="!px-4 !py-2 !text-sm">
                                <Phone className="w-4 h-4" />
                                Contacter
                              </Button>
                            )}
                            
                            {['EN_ATTENTE', 'ACCEPTE'].includes(appointment.status) && (
                              <Button 
                                variant="outline" 
                                className="!px-4 !py-2 !text-sm text-red-500"
                                onClick={() => handleCancelAppointment(appointment.id)}
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
              </div>
            )}

            {/* Rendez-vous passés */}
            {pastAppointments.length > 0 && (
              <div>
                <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                  <Clock className="w-6 h-6" />
                  Passés ({pastAppointments.length})
                </h2>
                <div className="space-y-4 opacity-75">
                  {pastAppointments.map(appointment => (
                    <Card key={appointment.id} className="p-6">
                      <div className="flex items-center gap-6">
                        <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-xl" style={{ backgroundColor: 'var(--gray)' }}>
                          <img src={appointment.artisan.image} alt={appointment.artisan.name} className="object-cover w-full h-full" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="mb-1 text-lg font-bold" style={{ color: 'var(--dark)' }}>
                            {appointment.artisan.name}
                          </h4>
                          <p className="mb-2 text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                            {appointment.date} à {appointment.time}
                          </p>
                        </div>

                        <Link to={`/reviews/write/${appointment.artisan.id}`}>
                          <Button variant="secondary" className="!px-4 !py-2 !text-sm">
                            Laisser un avis
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Aucun rendez-vous */}
            {filteredAppointments.length === 0 && (
              <Card className="py-20 text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full" style={{ backgroundColor: 'rgba(74, 111, 165, 0.1)' }}>
                  <Calendar className="w-10 h-10" style={{ color: 'var(--primary)' }} />
                </div>
                <h3 className="mb-3 text-2xl font-bold" style={{ color: 'var(--dark)' }}>
                  Aucun rendez-vous
                </h3>
                <p className="mb-6 text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                  Vous n'avez pas encore de rendez-vous prévu
                </p>
                <Link to="/appointments/book">
                  <Button>Prendre un rendez-vous</Button>
                </Link>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Mock data
const mockAppointments = [
  {
    id: 2001,
    artisan: {
      name: 'Jean Kouassi',
      specialty: 'Plomberie',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=200'
    },
    service: 'Réparation fuite d\'eau',
    date: '18 Jan 2026',
    time: '10:00',
    dateTime: '2026-01-18T10:00:00',
    location: 'Cotonou',
    status: 'ACCEPTE'
  },
  {
    id: 2002,
    artisan: {
      name: 'Marie Dossou',
      specialty: 'Électricité',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=200'
    },
    service: 'Installation prises',
    date: '22 Jan 2026',
    time: '14:30',
    dateTime: '2026-01-22T14:30:00',
    location: 'Porto-Novo',
    status: 'EN_ATTENTE'
  },
  {
    id: 2003,
    artisan: {
      name: 'Pierre Agbodji',
      specialty: 'Menuiserie',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
    },
    service: 'Fabrication meuble',
    date: '10 Jan 2026',
    time: '09:00',
    dateTime: '2026-01-10T09:00:00',
    location: 'Parakou',
    status: 'ACCEPTE'
  }
];