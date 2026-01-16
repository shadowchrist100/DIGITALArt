import { useState, useEffect } from 'react';
import { Star, Eye, Trash2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../../components/Common/Card';
import Button from '../../components/Common/Button';

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      // TODO: Appel API Laravel
      setTimeout(() => {
        setReviews(mockReviews);
        setLoading(false);
      }, 800);
    };

    fetchReviews();
  }, []);

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) return;
    
    // TODO: Appel API
    console.log('Delete review:', reviewId);
    setReviews(reviews.filter(r => r.id !== reviewId));
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: 'var(--light)' }}>
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold rounded-full" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24' }}>
            <Star className="w-4 h-4" />
            {reviews.length} avis laissé{reviews.length > 1 ? 's' : ''}
          </div>
          
          <h1 className="mb-4 text-4xl font-black md:text-5xl" style={{ color: 'var(--dark)' }}>
            Mes
            <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {' '}avis
            </span>
          </h1>
          <p className="text-lg" style={{ color: 'var(--dark)', opacity: 0.7 }}>
            Retrouvez tous les avis que vous avez laissés
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 rounded-full border-t-transparent animate-spin" style={{ borderColor: 'var(--primary)' }}></div>
          </div>
        ) : reviews.length > 0 ? (
          <>
            {/* Statistiques */}
            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
              <Card className="p-6 text-center">
                <div className="mb-2 text-4xl font-black" style={{ color: '#fbbf24' }}>
                  {reviews.length}
                </div>
                <div className="text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                  Avis publiés
                </div>
              </Card>

              <Card className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                  <div className="text-4xl font-black" style={{ color: '#fbbf24' }}>
                    {averageRating}
                  </div>
                </div>
                <div className="text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                  Note moyenne donnée
                </div>
              </Card>

              <Card className="p-6 text-center">
                <div className="mb-2 text-4xl font-black" style={{ color: 'var(--primary)' }}>
                  {reviews.filter(r => r.rating >= 4).length}
                </div>
                <div className="text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                  Notes 4+ étoiles
                </div>
              </Card>
            </div>

            {/* Liste des avis */}
            <div className="space-y-4">
              {reviews.map(review => (
                <Card key={review.id} className="p-6">
                  <div className="flex flex-col gap-6 md:flex-row">
                    {/* Image artisan */}
                    <div className="flex-shrink-0 w-full h-24 overflow-hidden md:w-24 rounded-xl" style={{ backgroundColor: 'var(--gray)' }}>
                      <img src={review.artisan.image} alt={review.artisan.name} className="object-cover w-full h-full" />
                    </div>

                    {/* Contenu */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="mb-1 text-lg font-bold" style={{ color: 'var(--dark)' }}>
                            {review.artisan.name}
                          </h3>
                          <p className="mb-2 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                            {review.artisan.specialty}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--dark)', opacity: 0.8 }}>
                        {review.comment}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-xs" style={{ color: 'var(--dark)', opacity: 0.5 }}>
                          Publié le {review.date}
                        </div>
                        
                        <div className="flex gap-2">
                          <Link to={`/artisan/${review.artisan.id}`}>
                            <Button variant="outline" className="!px-3 !py-2 !text-xs">
                              <Eye className="w-3 h-3" />
                              Voir profil
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            className="!px-3 !py-2 !text-xs text-red-500"
                            onClick={() => handleDeleteReview(review.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <Card className="py-20 text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}>
              <AlertCircle className="w-10 h-10" style={{ color: '#fbbf24' }} />
            </div>
            <h3 className="mb-3 text-2xl font-bold" style={{ color: 'var(--dark)' }}>
              Aucun avis
            </h3>
            <p className="mb-6 text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
              Vous n'avez pas encore laissé d'avis
            </p>
            <Link to="/my-services">
              <Button>Voir mes services terminés</Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}

// Mock data
const mockReviews = [
  {
    id: 3001,
    artisan: {
      id: 1,
      name: 'Jean Kouassi',
      specialty: 'Plomberie',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=200'
    },
    rating: 5,
    comment: 'Excellent travail ! Jean a réparé ma fuite d\'eau rapidement et proprement. Très professionnel et ponctuel. Je recommande vivement ses services.',
    date: '10 Jan 2026'
  },
  {
    id: 3002,
    artisan: {
      id: 2,
      name: 'Marie Dossou',
      specialty: 'Électricité',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=200'
    },
    rating: 4,
    comment: 'Très bon travail d\'installation électrique. Marie est compétente et à l\'écoute. Juste un petit retard sur le planning mais le résultat final est satisfaisant.',
    date: '05 Jan 2026'
  },
  {
    id: 3003,
    artisan: {
      id: 5,
      name: 'Thomas Ahoyo',
      specialty: 'Peinture',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200'
    },
    rating: 5,
    comment: 'Peinture impeccable ! Thomas est un vrai professionnel. Travail soigné, propre et dans les délais. Mes murs n\'ont jamais été aussi beaux.',
    date: '28 Déc 2025'
  }
];