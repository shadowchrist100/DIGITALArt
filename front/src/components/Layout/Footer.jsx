export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">ArtisanConnect</h3>
          <p className="text-gray-300">La plateforme qui connecte les artisans aux clients.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Pour les clients</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-accent transition">Trouver un artisan</a></li>
            <li><a href="#" className="hover:text-accent transition">Comment ça marche</a></li>
            <li><a href="#" className="hover:text-accent transition">Nos garanties</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Pour les artisans</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-accent transition">Devenir artisan</a></li>
            <li><a href="#" className="hover:text-accent transition">Tarifs</a></li>
            <li><a href="#" className="hover:text-accent transition">Support</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-300">
            <li>Email: contact@artisanconnect.bj</li>
            <li>Tél: +229 XX XX XX XX</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        <p>&copy; 2026 ArtisanConnect. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
