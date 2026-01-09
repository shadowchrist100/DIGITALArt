import Button from '../Common/Button';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-secondary to-primary">
      <div className="max-w-4xl mx-auto px-4 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Vous êtes artisan ?
        </h2>
        <p className="text-xl mb-8 text-gray-100">
          Rejoignez notre plateforme et développez votre activité. Inscription gratuite.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="bg-white text-primary hover:bg-gray-100">
            En savoir plus
          </Button>
          <Button className="bg-accent hover:bg-yellow-500 text-white">
            Créer mon atelier
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-16">
          <div>
            <div className="text-4xl font-bold mb-2">0€</div>
            <div className="text-gray-200">Inscription gratuite</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-gray-200">Support disponible</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">+30%</div>
            <div className="text-gray-200">De clients en plus</div>
          </div>
        </div>
      </div>
    </section>
  );
}
