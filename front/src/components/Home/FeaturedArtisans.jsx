import Card from '../Common/Card';

export default function FeaturedArtisans() {
  const artisans = [
    {
      name: 'Jean Kouadio',
      profession: 'Plombier',
      rating: 4.9,
      reviews: 127,
      location: 'Cotonou',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'
    },
    {
      name: 'Marie Togbé',
      profession: 'Électricienne',
      rating: 4.8,
      reviews: 89,
      location: 'Porto-Novo',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'
    },
    {
      name: 'Paul Gbaguidi',
      profession: 'Menuisier',
      rating: 5.0,
      reviews: 156,
      location: 'Parakou',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-secondary">
          Artisans en vedette
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Découvrez nos meilleurs professionnels
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artisans.map((artisan, index) => (
            <Card key={index}>
              <img 
                src={artisan.image} 
                alt={artisan.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{artisan.name}</h3>
              <p className="text-primary font-semibold mb-2">{artisan.profession}</p>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  ⭐ {artisan.rating} ({artisan.reviews} avis)
                </span>
                <span>📍 {artisan.location}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
