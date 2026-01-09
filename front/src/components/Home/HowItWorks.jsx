export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Recherchez',
      description: 'Trouvez l\'artisan qui correspond à vos besoins',
      color: 'bg-primary'
    },
    {
      number: '2',
      title: 'Réservez',
      description: 'Prenez rendez-vous en quelques clics',
      color: 'bg-accent'
    },
    {
      number: '3',
      title: 'Évaluez',
      description: 'Partagez votre expérience et notez le service',
      color: 'bg-success'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-secondary">
          Comment ça marche ?
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Trois étapes simples pour trouver votre artisan
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className={`w-20 h-20 ${step.color} text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg`}>
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-1 bg-gradient-to-r from-primary to-accent transform translate-x-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
