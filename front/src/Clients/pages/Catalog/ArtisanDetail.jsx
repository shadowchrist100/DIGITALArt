import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Award,
  Shield,
  MessageCircle,
  ChevronLeft,
  Heart,
  Share2,
  CheckCircle
} from 'lucide-react';
import Button from '../../components/Common/Button';
import Card from '../../components/Common/Card';

export default function ArtisanDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  const [selectedImage, setSelectedImage] = useState(0);

  // TODO: Fetch artisan data from API
  const artisan = mockArtisan;

  const tabs = [
    { id: 'about', label: 'À propos' },
    { id: 'gallery', label: 'Galerie' },
    { id: 'offers', label: 'Offres' },
    { id: 'reviews', label: 'Avis' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: 'var(--light)' }}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/artisans" className="inline-flex items-center gap-2 text-sm font-bold transition-all" style={{ color: 'var(--primary)' }}>
            <ChevronLeft className="w-4 h-4" />
            Retour aux artisans
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Colonne principale */}
          <div className="space-y-8 lg:col-span-2">
            
            {/* Hero Card */}
            <Card className="!p-0 overflow-hidden">
              {/* Image principale */}
              <div className="relative h-80" style={{ backgroundColor: 'var(--gray)' }}>
                <img
                  src={artisan.gallery[selectedImage]}
                  alt={artisan.name}
                  className="object-cover w-full h-full"
                />
                
                {/* Badges */}
                <div className="absolute flex gap-2 top-4 left-4">
                  {artisan.verified && (
                    <div className="flex items-center gap-1 px-3 py-1 text-sm font-bold bg-white rounded-full shadow-lg" style={{ color: 'var(--primary)' }}>
                      <Shield className="w-4 h-4" />
                      Vérifié
                    </div>
                  )}
                  {artisan.available && (
                    <div className="px-3 py-1 text-sm font-bold text-white rounded-full shadow-lg" style={{ backgroundColor: '#22c55e' }}>
                      Disponible
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute flex gap-2 top-4 right-4">
                  <button className="flex items-center justify-center w-10 h-10 transition-all bg-white rounded-full shadow-lg hover:scale-110">
                    <Heart className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  </button>
                  <button className="flex items-center justify-center w-10 h-10 transition-all bg-white rounded-full shadow-lg hover:scale-110">
                    <Share2 className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                  </button>
                </div>

                {/* Miniatures */}
                <div className="absolute flex gap-2 overflow-x-auto bottom-4 left-4 right-4">
                  {artisan.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${selectedImage === idx ? 'ring-4' : 'opacity-60 hover:opacity-100'}`}
                      style={{ ringColor: 'var(--primary)' }}
                    >
                      <img src={img} alt={`Vue ${idx + 1}`} className="object-cover w-full h-full" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Info principale */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="mb-2 text-3xl font-black" style={{ color: 'var(--dark)' }}>
                      {artisan.name}
                    </h1>
                    <p className="mb-2 text-lg font-bold" style={{ color: 'var(--accent)' }}>
                      {artisan.specialty}
                    </p>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                      <MapPin className="w-4 h-4" />
                      <span>{artisan.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 text-3xl font-black" style={{ color: 'var(--primary)' }}>
                      {artisan.rating}
                    </div>
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(artisan.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>
                      {artisan.reviews} avis
                    </div>
                  </div>
                </div>

                {/* Stats rapides */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 text-center rounded-xl" style={{ backgroundColor: 'rgba(74, 111, 165, 0.1)' }}>
                    <div className="mb-1 text-2xl font-black" style={{ color: 'var(--primary)' }}>
                      {artisan.experience}+
                    </div>
                    <div className="text-xs" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                      ans d'expérience
                    </div>
                  </div>
                  <div className="p-4 text-center rounded-xl" style={{ backgroundColor: 'rgba(255, 126, 95, 0.1)' }}>
                    <div className="mb-1 text-2xl font-black" style={{ color: 'var(--accent)' }}>
                      {artisan.completedProjects}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                      projets réalisés
                    </div>
                  </div>
                  <div className="p-4 text-center rounded-xl" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
                    <div className="mb-1 text-2xl font-black" style={{ color: '#22c55e' }}>
                      98%
                    </div>
                    <div className="text-xs" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                      satisfaction client
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                {artisan.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {artisan.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full" style={{ backgroundColor: 'rgba(74, 111, 165, 0.1)', color: 'var(--primary)' }}>
                        <Award className="w-3 h-3" />
                        {cert}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Onglets */}
            <Card className="!p-0">
              {/* Tabs header */}
              <div className="flex overflow-x-auto border-b" style={{ borderColor: 'var(--gray-dark)' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="px-6 py-4 text-sm font-bold transition-all whitespace-nowrap"
                    style={{
                      color: activeTab === tab.id ? 'var(--primary)' : 'var(--dark)',
                      borderBottom: activeTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tabs content */}
              <div className="p-8">
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-3 text-xl font-bold" style={{ color: 'var(--dark)' }}>
                        À propos de {artisan.name}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--dark)', opacity: 0.8 }}>
                        {artisan.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-3 text-xl font-bold" style={{ color: 'var(--dark)' }}>
                        Spécialités
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {artisan.skills.map((skill, idx) => (
                          <div key={idx} className="px-4 py-2 text-sm font-bold rounded-lg" style={{ backgroundColor: 'var(--gray)', color: 'var(--dark)' }}>
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 text-xl font-bold" style={{ color: 'var(--dark)' }}>
                        Horaires de travail
                      </h3>
                      <div className="space-y-2">
                        {artisan.workingHours.map((day, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="font-bold" style={{ color: 'var(--dark)' }}>{day.day}</span>
                            <span style={{ color: 'var(--dark)', opacity: 0.7 }}>{day.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {artisan.portfolio.map((img, idx) => (
                      <div key={idx} className="overflow-hidden transition-transform cursor-pointer aspect-square rounded-xl hover:scale-105">
                        <img src={img} alt={`Projet ${idx + 1}`} className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'offers' && (
                  <div className="space-y-4">
                    {artisan.offers.map((offer) => (
                      <Card key={offer.id} hover className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="mb-2 text-lg font-bold" style={{ color: 'var(--dark)' }}>
                              {offer.title}
                            </h4>
                            <p className="mb-3 text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                              {offer.description}
                            </p>
                            <div className="text-2xl font-black" style={{ color: 'var(--accent)' }}>
                              {offer.price} FCFA
                            </div>
                          </div>
                          <Button variant="secondary" className="whitespace-nowrap">
                            Commander
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {/* Statistiques avis */}
                    <div className="grid grid-cols-2 gap-6 p-6 rounded-xl" style={{ backgroundColor: 'var(--gray)' }}>
                      <div>
                        <div className="mb-2 text-5xl font-black" style={{ color: 'var(--primary)' }}>
                          {artisan.rating}
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < Math.floor(artisan.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                          Basé sur {artisan.reviews} avis
                        </div>
                      </div>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map(star => (
                          <div key={star} className="flex items-center gap-2">
                            <span className="w-3 text-sm font-bold">{star}</span>
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <div className="flex-1 h-2 overflow-hidden rounded-full" style={{ backgroundColor: 'white' }}>
                              <div
                                className="h-full rounded-full"
                                style={{
                                  backgroundColor: 'var(--primary)',
                                  width: `${star === 5 ? 80 : star === 4 ? 15 : 3}%`
                                }}
                              ></div>
                            </div>
                            <span className="text-xs" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                              ({star === 5 ? 102 : star === 4 ? 19 : 3})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Liste avis */}
                    <div className="space-y-4">
                      {artisan.customerReviews.map((review) => (
                        <Card key={review.id} className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-12 h-12 font-bold text-white rounded-full" style={{ backgroundColor: 'var(--primary)' }}>
                              {review.author[0]}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <div className="font-bold" style={{ color: 'var(--dark)' }}>
                                    {review.author}
                                  </div>
                                  <div className="text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>
                                    {review.date}
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm leading-relaxed" style={{ color: 'var(--dark)', opacity: 0.8 }}>
                                {review.comment}
                              </p>
                              {review.verified && (
                                <div className="flex items-center gap-1 mt-2 text-xs font-bold" style={{ color: '#22c55e' }}>
                                  <CheckCircle className="w-4 h-4" />
                                  Avis vérifié
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            {/* Card contact */}
            <Card>
              <h3 className="mb-4 text-xl font-bold" style={{ color: 'var(--dark)' }}>
                Réserver maintenant
              </h3>
              
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--gray)' }}>
                  <Phone className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>
                      Téléphone
                    </div>
                    <div className="text-sm font-bold" style={{ color: 'var(--dark)' }}>
                      {artisan.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--gray)' }}>
                  <Mail className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                  <div>
                    <div className="text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>
                      Email
                    </div>
                    <div className="text-sm font-bold" style={{ color: 'var(--dark)' }}>
                      {artisan.email}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link to={`/appointments/book/${id}`}>
                  <Button variant="primary" className="w-full">
                    <Calendar className="w-5 h-5" />
                    Prendre rendez-vous
                  </Button>
                </Link>
                
                <Link to={`/services/request/${id}`}>
                  <Button variant="secondary" className="w-full">
                    <Clock className="w-5 h-5" />
                    Demande de service
                  </Button>
                </Link>

                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-5 h-5" />
                  Envoyer un message
                </Button>
              </div>
            </Card>

            {/* Card tarifs */}
            <Card>
              <h3 className="mb-4 text-xl font-bold" style={{ color: 'var(--dark)' }}>
                Tarifs
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                    À partir de
                  </span>
                  <span className="text-2xl font-black" style={{ color: 'var(--accent)' }}>
                    {artisan.priceRange.min} FCFA
                  </span>
                </div>
                <div className="pt-3 border-t" style={{ borderColor: 'var(--gray-dark)' }}>
                  <div className="text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>
                    💡 Les tarifs peuvent varier selon la complexité du projet
                  </div>
                </div>
              </div>
            </Card>

            {/* Card garanties */}
            <Card>
              <h3 className="mb-4 text-xl font-bold" style={{ color: 'var(--dark)' }}>
                Garanties
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="flex-shrink-0 w-5 h-5" style={{ color: '#22c55e' }} />
                  <div>
                    <div className="mb-1 text-sm font-bold" style={{ color: 'var(--dark)' }}>
                      Travail garanti
                    </div>
                    <div className="text-xs" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                      Garantie satisfaction 30 jours
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="flex-shrink-0 w-5 h-5" style={{ color: 'var(--primary)' }} />
                  <div>
                    <div className="mb-1 text-sm font-bold" style={{ color: 'var(--dark)' }}>
                      Professionnel vérifié
                    </div>
                    <div className="text-xs" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                      Identité et qualifications vérifiées
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="flex-shrink-0 w-5 h-5" style={{ color: '#fbbf24' }} />
                  <div>
                    <div className="mb-1 text-sm font-bold" style={{ color: 'var(--dark)' }}>
                      Service de qualité
                    </div>
                    <div className="text-xs" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                      Note moyenne de {artisan.rating}/5
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock data
const mockArtisan = {
  id: 1,
  name: 'Jean Kouassi',
  specialty: 'Plomberie & Installation sanitaire',
  location: 'Cotonou, Bénin',
  rating: 4.9,
  reviews: 127,
  experience: 8,
  completedProjects: 340,
  verified: true,
  available: true,
  phone: '+229 97 00 00 01',
  email: 'jean.kouassi@example.com',
  description: 'Expert en plomberie avec plus de 8 ans d\'expérience. Spécialisé dans l\'installation et la réparation de systèmes sanitaires résidentiels et commerciaux. Interventions rapides et travail soigné garanti.',
  gallery: [
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800',
    'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800',
    'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800'
  ],
  portfolio: [
    'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=400',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
    'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400',
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400',
    'https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?w=400',
    'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400'
  ],
  skills: [
    'Installation sanitaire',
    'Réparation fuites',
    'Débouchage',
    'Installation chauffe-eau',
    'Rénovation salle de bain',
    'Dépannage urgence'
  ],
  certifications: [
    'Certifié Professionnel',
    'Formation Sécurité',
    'Installateur Agréé'
  ],
  workingHours: [
    { day: 'Lundi - Vendredi', hours: '8h00 - 18h00' },
    { day: 'Samedi', hours: '9h00 - 14h00' },
    { day: 'Dimanche', hours: 'Sur rendez-vous' }
  ],
  priceRange: {
    min: 15000,
    max: 150000
  },
  offers: [
    {
      id: 1,
      title: 'Dépannage plomberie',
      description: 'Intervention rapide pour fuites, débouchage, petites réparations',
      price: '15000'
    },
    {
      id: 2,
      title: 'Installation sanitaire complète',
      description: 'Installation lavabo, WC, douche avec garantie 2 ans',
      price: '85000'
    },
    {
      id: 3,
      title: 'Rénovation salle de bain',
      description: 'Rénovation complète avec matériaux fournis',
      price: '350000'
    }
  ],
  customerReviews: [
    {
      id: 1,
      author: 'Marie Dossou',
      rating: 5,
      date: 'Il y a 2 semaines',
      comment: 'Excellent travail ! Jean a réparé ma fuite d\'eau en moins d\'une heure. Très professionnel et ponctuel. Je recommande vivement.',
      verified: true
    },
    {
      id: 2,
      author: 'Pierre Agbodji',
      rating: 5,
      date: 'Il y a 1 mois',
      comment: 'Installation complète de ma salle de bain. Travail impeccable, respect des délais et prix honnête. Très satisfait du résultat.',
      verified: true
    },
    {
      id: 3,
      author: 'Sophie Hounnou',
      rating: 4,
      date: 'Il y a 2 mois',
      comment: 'Bon travail dans l\'ensemble. Un petit retard sur le planning mais le résultat final est satisfaisant.',
      verified: false
    }
  ]
};