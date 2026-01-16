import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Edit, Star, FileText, Clock, Award } from 'lucide-react';
import Card from '../../components/Common/Card';
import Button from '../../components/Common/Button';

export default function ClientProfile() {
  // TODO: Fetch user data from API
  const [user] = useState(mockUser);

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: 'var(--light)' }}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold rounded-full" style={{ backgroundColor: 'rgba(74, 111, 165, 0.1)', color: 'var(--primary)' }}>
            <User className="w-4 h-4" />
            Mon profil
          </div>
          
          <h1 className="mb-4 text-4xl font-black md:text-5xl" style={{ color: 'var(--dark)' }}>
            Profil
            <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(90deg, var(--primary), var(--primary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {' '}client
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Colonne principale */}
          <div className="space-y-6 lg:col-span-2">
            
            {/* Card informations personnelles */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--dark)' }}>
                  Informations personnelles
                </h2>
                <Link to="/profile/edit">
                  <Button variant="outline" className="!px-4 !py-2 !text-sm">
                    <Edit className="w-4 h-4" />
                    Modifier
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--gray)' }}>
                  <User className="w-5 h-5 mt-0.5" style={{ color: 'var(--primary)' }} />
                  <div className="flex-1">
                    <div className="mb-1 text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>
                      Nom complet
                    </div>
                    <div className="font-bold" style={{ color: 'var(--dark)' }}>
                      {user.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--gray)' }}>
                  <Mail className="w-5 h-5 mt-0.5" style={{ color: 'var(--primary)' }} />
                  <div className="flex-1">
                    <div className="mb-1 text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>
                      Email
                    </div>
                    <div className="font-bold" style={{ color: 'var(--dark)' }}>
                      {user.email}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {user.emailVerified ? (
                        <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#22c55e' }}>
                          ✓ Vérifié
                        </span>
                      ) : (
                        <span className="text-xs font-semibold" style={{ color: '#fb923c' }}>
                          Non vérifié
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--gray)' }}>
                  <Phone className="w-5 h-5 mt-0.5" style={{ color: 'var(--primary)' }} />
                  <div className="flex-1">
                    <div className="mb-1 text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>
                      Téléphone
                    </div>
                    <div className="font-bold" style={{ color: 'var(--dark)' }}>
                      {user.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--gray)' }}>
                  <MapPin className="w-5 h-5 mt-0.5" style={{ color: 'var(--primary)' }} />
                  <div className="flex-1">
                    <div className="mb-1 text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>
                      Localisation
                    </div>
                    <div className="font-bold" style={{ color: 'var(--dark)' }}>
                      {user.city}, {user.country}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--gray)' }}>
                  <Calendar className="w-5 h-5 mt-0.5" style={{ color: 'var(--primary)' }} />
                  <div className="flex-1">
                    <div className="mb-1 text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>
                      Membre depuis
                    </div>
                    <div className="font-bold" style={{ color: 'var(--dark)' }}>
                      {user.memberSince}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Card activité récente */}
            <Card>
              <h2 className="mb-6 text-2xl font-bold" style={{ color: 'var(--dark)' }}>
                Activité récente
              </h2>

              <div className="space-y-4">
                {user.recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 border rounded-xl" style={{ borderColor: 'var(--gray-dark)' }}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: activity.iconBg }}>
                      {activity.icon === 'service' && <FileText className="w-5 h-5" style={{ color: activity.iconColor }} />}
                      {activity.icon === 'appointment' && <Calendar className="w-5 h-5" style={{ color: activity.iconColor }} />}
                      {activity.icon === 'review' && <Star className="w-5 h-5" style={{ color: activity.iconColor }} />}
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 font-bold" style={{ color: 'var(--dark)' }}>
                        {activity.title}
                      </div>
                      <div className="mb-2 text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                        {activity.description}
                      </div>
                      <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--dark)', opacity: 0.5 }}>
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            
            {/* Photo de profil */}
            <Card className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full" style={{ backgroundColor: 'var(--gray)' }}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="object-cover w-full h-full" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-4xl font-black text-white" style={{ backgroundColor: 'var(--primary)' }}>
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
              <h3 className="mb-2 text-xl font-bold" style={{ color: 'var(--dark)' }}>
                {user.name}
              </h3>
              <p className="mb-4 text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                Membre DigitalArt
              </p>
              <Link to="/profile/edit">
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4" />
                  Modifier la photo
                </Button>
              </Link>
            </Card>

            {/* Statistiques */}
            <Card>
              <h3 className="mb-4 text-lg font-bold" style={{ color: 'var(--dark)' }}>
                Mes statistiques
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--gray)' }}>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--dark)' }}>
                      Services
                    </span>
                  </div>
                  <span className="text-xl font-black" style={{ color: 'var(--accent)' }}>
                    {user.stats.services}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--gray)' }}>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--dark)' }}>
                      Rendez-vous
                    </span>
                  </div>
                  <span className="text-xl font-black" style={{ color: 'var(--primary)' }}>
                    {user.stats.appointments}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--gray)' }}>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5" style={{ color: '#fbbf24' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--dark)' }}>
                      Avis laissés
                    </span>
                  </div>
                  <span className="text-xl font-black" style={{ color: '#fbbf24' }}>
                    {user.stats.reviews}
                  </span>
                </div>
              </div>
            </Card>

            {/* Badge membre */}
            <Card className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full" style={{ backgroundColor: 'rgba(255, 126, 95, 0.1)' }}>
                <Award className="w-8 h-8" style={{ color: 'var(--accent)' }} />
              </div>
              <h3 className="mb-2 text-lg font-bold" style={{ color: 'var(--dark)' }}>
                Membre Actif
              </h3>
              <p className="text-xs" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                Vous êtes un membre actif de la communauté DigitalArt
              </p>
            </Card>

            {/* Actions rapides */}
            <Card>
              <h3 className="mb-4 text-lg font-bold" style={{ color: 'var(--dark)' }}>
                Actions rapides
              </h3>
              <div className="space-y-2">
                <Link to="/my-services">
                  <button className="w-full p-3 text-sm font-bold text-left transition-all rounded-lg hover:shadow-md" style={{ backgroundColor: 'var(--gray)', color: 'var(--dark)' }}>
                    Mes demandes de services
                  </button>
                </Link>
                <Link to="/my-appointments">
                  <button className="w-full p-3 text-sm font-bold text-left transition-all rounded-lg hover:shadow-md" style={{ backgroundColor: 'var(--gray)', color: 'var(--dark)' }}>
                    Mes rendez-vous
                  </button>
                </Link>
                <Link to="/my-reviews">
                  <button className="w-full p-3 text-sm font-bold text-left transition-all rounded-lg hover:shadow-md" style={{ backgroundColor: 'var(--gray)', color: 'var(--dark)' }}>
                    Mes avis
                  </button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock data
const mockUser = {
  name: 'Sophie Martin',
  email: 'sophie.martin@example.com',
  phone: '+229 97 12 34 56',
  city: 'Cotonou',
  country: 'Bénin',
  memberSince: 'Janvier 2025',
  emailVerified: true,
  avatar: null,
  stats: {
    services: 12,
    appointments: 8,
    reviews: 6
  },
  recentActivity: [
    {
      icon: 'review',
      iconBg: 'rgba(251, 191, 36, 0.1)',
      iconColor: '#fbbf24',
      title: 'Avis laissé',
      description: 'Vous avez évalué Jean Kouassi - Plomberie',
      time: 'Il y a 2 jours'
    },
    {
      icon: 'appointment',
      iconBg: 'rgba(74, 111, 165, 0.1)',
      iconColor: 'var(--primary)',
      title: 'Rendez-vous confirmé',
      description: 'RDV avec Marie Dossou le 22 Jan',
      time: 'Il y a 3 jours'
    },
    {
      icon: 'service',
      iconBg: 'rgba(255, 126, 95, 0.1)',
      iconColor: 'var(--accent)',
      title: 'Demande acceptée',
      description: 'Service d\'installation électrique',
      time: 'Il y a 5 jours'
    }
  ]
};