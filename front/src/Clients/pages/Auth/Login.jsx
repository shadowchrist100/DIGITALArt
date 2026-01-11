import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="w-full max-w-sm mx-auto">
        
        <div className="mb-3 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full" style={{ 
            backgroundColor: 'rgba(74, 111, 165, 0.1)', 
            color: '#4a6fa5',
            border: '1px solid rgba(74, 111, 165, 0.2)'
          }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#ff7e5f' }}></span>
            Plateforme N°1 des artisans
          </span>
        </div>

        <div className="mb-4 text-center">
          <h1 className="mb-1 text-xl font-bold" style={{ color: '#2b2d42' }}>
            Bon retour
          </h1>
          <p className="text-sm" style={{ color: '#2b2d42', opacity: 0.7 }}>
            Connectez-vous à votre compte
          </p>
        </div>

        <div className="p-5 shadow-lg rounded-xl" style={{ 
          border: '1px solid #e9ecef',
          backgroundColor: 'white'
        }}>
          <form onSubmit={handleSubmit}>
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
                  placeholder="exemple@email.com"
                  className="w-full py-3 pr-4 text-sm transition-all border rounded-lg outline-none pl-11 focus:ring-2"
                  style={{ 
                    borderColor: '#e9ecef',
                    backgroundColor: '#f8f9fa',
                    color: '#2b2d42'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4a6fa5'}
                  onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  required
                />
              </div>
            </div>

            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium" style={{ color: '#2b2d42' }}>
                  Mot de passe
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm font-medium transition-all hover:underline"
                  style={{ color: '#4a6fa5' }}
                >
                  Mot de passe oublié ?
                </Link>
              </div>
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute transition-all -translate-y-1/2 right-3 top-1/2 hover:opacity-70"
                  style={{ color: '#6b8cba' }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 text-sm font-semibold text-white rounded-lg transition-all hover:shadow-lg hover:scale-[1.02]"
              style={{ 
                background: 'linear-gradient(135deg, #4a6fa5, #3a5784)'
              }}
            >
              Se connecter
            </button>
          </form>

          <div className="pt-4 mt-4 text-center border-t" style={{ borderColor: '#e9ecef' }}>
            <p className="text-sm" style={{ color: '#2b2d42', opacity: 0.7 }}>
              Pas encore de compte ?{" "}
              <Link 
                to="/register" 
                className="font-semibold transition-all hover:underline"
                style={{ color: '#ff7e5f' }}
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs text-center" style={{ color: '#2b2d42', opacity: 0.5 }}>
          En vous connectant, vous acceptez nos conditions d'utilisation
        </p>
      </div>
    </div>
  );
};

export default Login;