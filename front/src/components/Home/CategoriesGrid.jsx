export default function CategoriesGrid() {
  const categories = [
    { name: 'Plomberie', color: 'from-blue-500 to-blue-600' },
    { name: 'Électricité', color: 'from-yellow-500 to-yellow-600' },
    { name: 'Menuiserie', color: 'from-orange-500 to-orange-600' },
    { name: 'Peinture', color: 'from-pink-500 to-pink-600' },
    { name: 'Maçonnerie', color: 'from-red-500 to-red-600' },
    { name: 'Couture', color: 'from-purple-500 to-purple-600' },
    { name: 'Coiffure', color: 'from-green-500 to-green-600' },
    { name: 'Mécanique', color: 'from-gray-500 to-gray-600' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-gray-900">
            Explorez nos catégories
          </h2>
          <p className="text-xl text-gray-600">
            Tous les métiers de l'artisanat à votre service
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-gray-100 hover:border-orange-500"
            >
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-10 h-10 bg-white/30 rounded-full"></div>
              </div>
              <h3 className="text-lg font-bold text-center text-gray-800 group-hover:text-orange-500 transition-colors">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
