import { Link } from 'react-router-dom';
import { Hammer } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-6 text-white" style={{ backgroundColor: 'var(--dark)' }}>
      <div className="grid max-w-5xl grid-cols-1 gap-6 px-4 mx-auto md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-2 group">
            <div className="relative">
              <div className="absolute inset-0 transition-opacity rounded-full blur-lg opacity-20 group-hover:opacity-30" style={{ background: '#ff7e5f' }}></div>
              <div className="relative flex items-center justify-center w-8 h-8 transition-transform duration-300 shadow-md rounded-xl group-hover:scale-110" style={{ background: 'linear-gradient(135deg, #ff7e5f, #ff6b4a)' }}>
                <Hammer className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-lg font-bold" style={{ color: '#ff7e5f' }}>DigitalArt</h3>
          </Link>
          <p className="mt-2 text-xs" style={{ color: 'var(--gray)', opacity: 0.8 }}>
            La plateforme qui connecte les artisans aux clients.
          </p>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold" style={{ color: '#ff7e5f' }}>Pour les clients</h4>
          <ul className="space-y-1 text-xs" style={{ color: 'var(--gray)' }}>
            <li>
              <a href="#" className="hover:transition-colors" style={{ color: 'var(--gray)' }} onMouseEnter={(e) => e.target.style.color = '#ff7e5f'} onMouseLeave={(e) => e.target.style.color = 'var(--gray)'}>
                Trouver un artisan
              </a>
            </li>
            <li>
              <a href="#" className="hover:transition-colors" style={{ color: 'var(--gray)' }} onMouseEnter={(e) => e.target.style.color = '#ff7e5f'} onMouseLeave={(e) => e.target.style.color = 'var(--gray)'}>
                Comment ça marche
              </a>
            </li>
            <li>
              <a href="#" className="hover:transition-colors" style={{ color: 'var(--gray)' }} onMouseEnter={(e) => e.target.style.color = '#ff7e5f'} onMouseLeave={(e) => e.target.style.color = 'var(--gray)'}>
                Nos garanties
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold" style={{ color: '#ff7e5f' }}>Pour les artisans</h4>
          <ul className="space-y-1 text-xs" style={{ color: 'var(--gray)' }}>
            <li>
              <a href="#" className="hover:transition-colors" style={{ color: 'var(--gray)' }} onMouseEnter={(e) => e.target.style.color = '#ff7e5f'} onMouseLeave={(e) => e.target.style.color = 'var(--gray)'}>
                Devenir artisan
              </a>
            </li>
            <li>
              <a href="#" className="hover:transition-colors" style={{ color: 'var(--gray)' }} onMouseEnter={(e) => e.target.style.color = '#ff7e5f'} onMouseLeave={(e) => e.target.style.color = 'var(--gray)'}>
                Tarifs
              </a>
            </li>
            <li>
              <a href="#" className="hover:transition-colors" style={{ color: 'var(--gray)' }} onMouseEnter={(e) => e.target.style.color = '#ff7e5f'} onMouseLeave={(e) => e.target.style.color = 'var(--gray)'}>
                Support
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold" style={{ color: '#ff7e5f' }}>Contact</h4>
          <ul className="space-y-1 text-xs" style={{ color: 'var(--gray)' }}>
            <li>Email: contact@digitalart.bj</li>
            <li>Tél: +229 XX XX XX XX</li>
          </ul>
          <div className="flex gap-2 mt-3">
            <a href="#" className="p-1.5 transition-all rounded-md hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#ff7e5f'} onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="p-1.5 transition-all rounded-md hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#ff7e5f'} onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="p-1.5 transition-all rounded-md hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#ff7e5f'} onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="pt-3 mt-4 text-xs text-center border-t" style={{ borderColor: 'var(--gray-dark)', color: 'var(--gray)', opacity: 0.7 }}>
        <p>&copy; 2026 DigitalArt. Tous droits réservés.</p>
      </div>
    </footer>
  );
}