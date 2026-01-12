import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Check } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="w-full max-w-sm mx-auto">
        
        <div className="mb-3 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full" style={{ 
            backgroundColor: 'rgba(74, 111, 165, 0.1)', 
            color: '#4a6fa5',
            border: '1px solid rgba(74, 111, 165, 0.2)'
          }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#ff7e5f' }}></span>
            Rejoignez notre communauté
          </span>
        </div>

        <div className="mb-4 text-center">
          <h1 className="mb-1 text-xl font-bold" style={{ color: '#2b2d42' }}>
            Créer un compte
          </h1>
          <p className="text-xs" style={{ color: '#2b2d42', opacity: 0.7 }}>
            Commencez avec DigitalArt
          </p>
        </div>

        <div className="p-5 rounded-lg shadow-md" style={{ 
          border: '1px solid #e9ecef',
          backgroundColor: 'white'
        }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block mb-1.5 text-xs font-medium" style={{ color: '#2b2d42' }}>
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute w-4 h-4 -translate-y-1/2 left-2.5 top-1/2" style={{ color: '#ff7e5f' }} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nom et prénoms"
                  className="w-full py-2 pr-3 text-xs transition-all border rounded-md outline-none pl-9 focus:ring-2"
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

            <div className="mb-3">
              <label className="block mb-1.5 text-xs font-medium" style={{ color: '#2b2d42' }}>
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute w-4 h-4 -translate-y-1/2 left-2.5 top-1/2" style={{ color: '#ff7e5f' }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="exemple@email.com"
                  className="w-full py-2 pr-3 text-xs transition-all border rounded-md outline-none pl-9 focus:ring-2"
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

            <div className="mb-3">
              <label className="block mb-1.5 text-xs font-medium" style={{ color: '#2b2d42' }}>
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute w-4 h-4 -translate-y-1/2 left-2.5 top-1/2" style={{ color: '#ff7e5f' }} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full py-2 text-xs transition-all border rounded-md outline-none pl-9 pr-9 focus:ring-2"
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
                  className="absolute -translate-y-1/2 right-2.5 top-1/2 hover:opacity-70 transition-all"
                  style={{ color: '#6b8cba' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 mb-4 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="sr-only"
                  required
                />
                <div className="flex items-center justify-center w-4 h-4 transition-all border-2 rounded group-hover:border-opacity-80"
                  style={{ 
                    borderColor: formData.acceptTerms ? '#4a6fa5' : '#e9ecef',
                    backgroundColor: formData.acceptTerms ? '#4a6fa5' : 'white'
                  }}
                >
                  {formData.acceptTerms && <Check className="w-3 h-3" style={{ color: 'white' }} />}
                </div>
              </div>
              <span className="text-xs leading-relaxed" style={{ color: '#2b2d42', opacity: 0.7 }}>
                J'accepte les conditions d'utilisation
              </span>
            </label>

            <button 
              type="submit" 
              className="w-full py-2 text-xs font-semibold text-white rounded-md transition-all hover:shadow-lg hover:scale-[1.02]"
              style={{ 
                background: 'linear-gradient(135deg, #4a6fa5, #3a5784)'
              }}
            >
              Créer mon compte
            </button>
          </form>

          <div className="pt-3 mt-4 text-center border-t" style={{ borderColor: '#e9ecef' }}>
            <p className="text-xs" style={{ color: '#2b2d42', opacity: 0.7 }}>
              Déjà un compte ?{" "}
              <Link 
                to="/login" 
                className="font-semibold transition-all hover:underline"
                style={{ color: '#ff7e5f' }}
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;