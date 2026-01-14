import { useState, useEffect } from 'react';
import { Bell, CheckCircle, X, Calendar, FileText, Star, AlertCircle, Clock, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/Common/Card';
import Button from '../../components/Common/Button';

export default function NotificationsList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, read

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      // TODO: Appel API Laravel
      setTimeout(() => {
        setNotifications(mockNotifications);
        setLoading(false);
      }, 800);
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    // TODO: Appel API
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = async () => {
    // TODO: Appel API
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDelete = async (notificationId) => {
    // TODO: Appel API
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const getNotificationIcon = (type) => {
    const icons = {
      service_accepted: { Icon: CheckCircle, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
      service_refused: { Icon: X, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
      appointment_confirmed: { Icon: Calendar, color: 'var(--primary)', bg: 'rgba(74, 111, 165, 0.1)' },
      appointment_cancelled: { Icon: X, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
      new_message: { Icon: FileText, color: 'var(--accent)', bg: 'rgba(255, 126, 95, 0.1)' },
      review_request: { Icon: Star, color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)' },
      service_completed: { Icon: CheckCircle, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
      reminder: { Icon: Clock, color: '#fb923c', bg: 'rgba(251, 146, 60, 0.1)' }
    };
    return icons[type] || icons.new_message;
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: 'var(--light)' }}>
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold rounded-full" style={{ backgroundColor: 'rgba(74, 111, 165, 0.1)', color: 'var(--primary)' }}>
            <Bell className="w-4 h-4" />
            {unreadCount > 0 ? `${unreadCount} non lu${unreadCount > 1 ? 's' : ''}` : 'Toutes lues'}
          </div>
          
          <h1 className="mb-4 text-4xl font-black md:text-5xl" style={{ color: 'var(--dark)' }}>
            Mes
            <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(90deg, var(--primary), var(--primary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {' '}notifications
            </span>
          </h1>
          <p className="text-lg" style={{ color: 'var(--dark)', opacity: 0.7 }}>
            Restez informé de toutes vos activités
          </p>
        </div>

        {/* Filtres et actions */}
        <Card className="mb-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'Toutes', count: notifications.length },
                { value: 'unread', label: 'Non lues', count: unreadCount },
                { value: 'read', label: 'Lues', count: notifications.length - unreadCount }
              ].map(f => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className="px-4 py-2 text-sm font-bold transition-all rounded-lg"
                  style={{
                    backgroundColor: filter === f.value ? 'var(--primary)' : 'white',
                    color: filter === f.value ? 'white' : 'var(--dark)',
                    border: `2px solid ${filter === f.value ? 'var(--primary)' : 'var(--gray-dark)'}`
                  }}
                >
                  {f.label} ({f.count})
                </button>
              ))}
            </div>
            
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                className="!px-4 !py-2 !text-sm"
                onClick={handleMarkAllAsRead}
              >
                <CheckCircle className="w-4 h-4" />
                Tout marquer comme lu
              </Button>
            )}
          </div>
        </Card>

        {/* Liste des notifications */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 rounded-full border-t-transparent animate-spin" style={{ borderColor: 'var(--primary)' }}></div>
          </div>
        ) : filteredNotifications.length > 0 ? (
          <div className="space-y-3">
            {filteredNotifications.map(notification => {
              const { Icon, color, bg } = getNotificationIcon(notification.type);
              
              return (
                <Card 
                  key={notification.id} 
                  className={`p-5 transition-all ${!notification.read ? 'border-l-4' : ''}`}
                  style={{ 
                    borderLeftColor: !notification.read ? color : 'transparent',
                    backgroundColor: !notification.read ? 'rgba(74, 111, 165, 0.02)' : 'white'
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icône */}
                    <div 
                      className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full"
                      style={{ backgroundColor: bg }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className="mb-1 font-bold" style={{ color: 'var(--dark)' }}>
                            {notification.title}
                          </h3>
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--dark)', opacity: 0.8 }}>
                            {notification.message}
                          </p>
                        </div>
                        
                        {!notification.read && (
                          <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full" style={{ backgroundColor: color }}></span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--dark)', opacity: 0.5 }}>
                          <Clock className="w-3 h-3" />
                          {notification.time}
                        </div>

                        <div className="flex gap-2">
                          {notification.link && (
                            <Link to={notification.link}>
                              <Button variant="outline" className="!px-3 !py-1 !text-xs">
                                Voir
                              </Button>
                            </Link>
                          )}
                          
                          {!notification.read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="px-3 py-1 text-xs font-bold transition-all rounded-lg"
                              style={{ 
                                backgroundColor: 'var(--gray)',
                                color: 'var(--dark)'
                              }}
                            >
                              Marquer lu
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="px-3 py-1 text-xs font-bold text-red-500 transition-all rounded-lg"
                            style={{ backgroundColor: 'var(--gray)' }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="py-20 text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full" style={{ backgroundColor: 'rgba(74, 111, 165, 0.1)' }}>
              <Bell className="w-10 h-10" style={{ color: 'var(--primary)' }} />
            </div>
            <h3 className="mb-3 text-2xl font-bold" style={{ color: 'var(--dark)' }}>
              {filter === 'unread' ? 'Aucune notification non lue' : 'Aucune notification'}
            </h3>
            <p className="text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
              {filter === 'unread' 
                ? 'Toutes vos notifications ont été lues' 
                : 'Vous n\'avez pas encore de notifications'}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

// Mock data
const mockNotifications = [
  {
    id: 4001,
    type: 'service_accepted',
    title: 'Demande acceptée',
    message: 'Jean Kouassi a accepté votre demande de service pour la réparation de fuite d\'eau.',
    time: 'Il y a 2 heures',
    read: false,
    link: '/my-services'
  },
  {
    id: 4002,
    type: 'appointment_confirmed',
    title: 'Rendez-vous confirmé',
    message: 'Votre rendez-vous avec Marie Dossou est confirmé pour le 22 Jan à 14h30.',
    time: 'Il y a 5 heures',
    read: false,
    link: '/my-appointments'
  },
  {
    id: 4003,
    type: 'review_request',
    title: 'Laissez un avis',
    message: 'Votre service avec Pierre Agbodji est terminé. Partagez votre expérience !',
    time: 'Il y a 1 jour',
    read: false,
    link: '/reviews/write/3'
  },
  {
    id: 4004,
    type: 'service_completed',
    title: 'Service terminé',
    message: 'Thomas Ahoyo a marqué votre service de peinture comme terminé.',
    time: 'Il y a 2 jours',
    read: true,
    link: '/my-services'
  },
  {
    id: 4005,
    type: 'reminder',
    title: 'Rappel de rendez-vous',
    message: 'N\'oubliez pas votre rendez-vous demain à 10h00 avec Jean Kouassi.',
    time: 'Il y a 3 jours',
    read: true,
    link: '/my-appointments'
  },
  {
    id: 4006,
    type: 'new_message',
    title: 'Nouveau message',
    message: 'Sophie Hounnou vous a envoyé un message concernant votre demande.',
    time: 'Il y a 4 jours',
    read: true,
    link: '/messages'
  }
];