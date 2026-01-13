import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(email, password);
      
      // Vérifier que c'est bien un admin
      if (response.user.role !== 'ADMIN') {
        setError('Accès réservé aux administrateurs uniquement');
        setLoading(false);
        return;
      }

      // Rediriger vers le dashboard admin
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Email ou mot de passe incorrect');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="w-full max-w-sm mx-auto">
        
        {/* Badge */}
        <div className="mb-3 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full" style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <Shield className="w-4 h-4" />
            Espace Administrateur
          </span>
        </div>

        {/* Titre */}
        <div className="mb-4 text-center">
          <h1 className="mb-1 text-xl font-bold" style={{ color: '#2b2d42' }}>
            Administration
          </h1>
          <p className="text-sm" style={{ color: '#2b2d42', opacity: 0.7 }}>
            Connectez-vous au panel admin
          </p>
        </div>

        {/* Formulaire */}
        <div className="p-5 shadow-lg rounded-xl" style={{ 
          border: '1px solid #e9ecef',
          backgroundColor: 'white'
        }}>
          {/* Message d'erreur */}
          {error && (
            <div 
              className="p-3 mb-4 text-sm rounded-lg"
              style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444'
              }}
            >
              <p className="font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium" style={{ color: '#2b2d42' }}>
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2" style={{ color: '#ff7e5f' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@exemple.com"
                  className="w-full py-3 pr-4 text-sm transition-all border rounded-lg outline-none pl-11 focus:ring-2"
                  style={{ 
                    borderColor: '#e9ecef',
                    backgroundColor: '#f8f9fa',
                    color: '#2b2d42'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4a6fa5'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium" style={{ color: '#2b2d42' }}>
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2" style={{ color: '#ff7e5f' }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full py-3 pr-12 text-sm transition-all border rounded-lg outline-none pl-11 focus:ring-2"
                  style={{ 
                    borderColor: '#e9ecef',
                    backgroundColor: '#f8f9fa',
                    color: '#2b2d42'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4a6fa5'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute transition-all -translate-y-1/2 right-3 top-1/2 hover:opacity-70"
                  style={{ color: '#6b8cba' }}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Bouton de connexion */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 text-sm font-semibold text-white rounded-lg transition-all hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                background: 'linear-gradient(135deg, #4a6fa5, #3a5784)'
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  Connexion...
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          {/* Avertissement - Remplace la section "Pas encore de compte" */}
          <div className="pt-4 mt-4 text-center border-t" style={{ borderColor: '#e9ecef' }}>
            <p className="text-sm" style={{ color: '#2b2d42', opacity: 0.7 }}>
              Accès réservé aux administrateurs.{" "}
              <Link 
                to="/login" 
                className="font-semibold transition-all hover:underline"
                style={{ color: '#ff7e5f' }}
              >
              Retour à l'Espace Client
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-4 text-xs text-center" style={{ color: '#2b2d42', opacity: 0.5 }}>
          En vous connectant, vous acceptez nos conditions d'utilisation
        </p>
      </div>
    </div>
  );
}