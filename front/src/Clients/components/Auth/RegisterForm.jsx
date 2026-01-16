import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import Input from '../Common/Input';
import Button from '../Common/Button';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'client', // 'client' ou 'artisan'
    acceptTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Nom requis (min 2 caractères)';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Téléphone requis';
    } else if (!/^\+?[\d\s-]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Minimum 8 caractères';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      // TODO: Remplacer par appel API Laravel
      // const response = await fetch('http://localhost:8000/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      setTimeout(() => {
        console.log('Inscription:', formData);
        setLoading(false);
        navigate('/login');
      }, 1500);
      
    } catch (error) {
      setLoading(false);
      setErrors({ submit: 'Erreur d\'inscription' });
      console.error('Register error:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="p-8 bg-white shadow-2xl rounded-2xl" style={{ border: '1px solid var(--gray-dark)' }}>
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-black" style={{ color: 'var(--dark)' }}>
            Inscription
          </h2>
          <p className="text-sm" style={{ color: 'var(--dark)', opacity: 0.6 }}>
            Créez votre compte ArtisanConnect
          </p>
        </div>

        {errors.submit && (
          <div className="p-4 mb-6 rounded-xl" style={{ backgroundColor: 'rgba(255, 126, 95, 0.1)', borderLeft: '4px solid var(--accent)' }}>
            <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{errors.submit}</p>
          </div>
        )}

        {/* Type d'utilisateur */}
        <div className="grid grid-cols-2 gap-3 p-1 mb-6 rounded-xl" style={{ backgroundColor: 'var(--gray)' }}>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, userType: 'client' }))}
            className="px-4 py-3 text-sm font-bold transition-all rounded-lg"
            style={{
              backgroundColor: formData.userType === 'client' ? 'white' : 'transparent',
              color: formData.userType === 'client' ? 'var(--primary)' : 'var(--dark)',
              boxShadow: formData.userType === 'client' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Client
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, userType: 'artisan' }))}
            className="px-4 py-3 text-sm font-bold transition-all rounded-lg"
            style={{
              backgroundColor: formData.userType === 'artisan' ? 'white' : 'transparent',
              color: formData.userType === 'artisan' ? 'var(--accent)' : 'var(--dark)',
              boxShadow: formData.userType === 'artisan' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Artisan
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nom complet"
            name="name"
            value={formData.name}
            onChange={handleChange}
            icon={User}
            placeholder="Jean Dupont"
            error={errors.name}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            placeholder="exemple@email.com"
            error={errors.email}
          />

          <Input
            label="Téléphone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            icon={Phone}
            placeholder="+229 XX XX XX XX"
            error={errors.phone}
          />

          <div>
            <label className="block mb-2 text-sm font-bold" style={{ color: 'var(--dark)' }}>
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute -translate-y-1/2 left-4 top-1/2" style={{ color: 'var(--primary-light)' }}>
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full h-12 px-4 pl-12 pr-12 transition-all border-2 rounded-xl focus:outline-none"
                style={{
                  backgroundColor: errors.password ? 'rgba(255, 126, 95, 0.05)' : 'var(--gray)',
                  borderColor: errors.password ? 'var(--accent)' : 'var(--gray-dark)',
                  color: 'var(--dark)',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute -translate-y-1/2 right-4 top-1/2"
                style={{ color: 'var(--primary-light)' }}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm font-semibold" style={{ color: 'var(--accent)' }}>{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-bold" style={{ color: 'var(--dark)' }}>
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <div className="absolute -translate-y-1/2 left-4 top-1/2" style={{ color: 'var(--primary-light)' }}>
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full h-12 px-4 pl-12 pr-12 transition-all border-2 rounded-xl focus:outline-none"
                style={{
                  backgroundColor: errors.confirmPassword ? 'rgba(255, 126, 95, 0.05)' : 'var(--gray)',
                  borderColor: errors.confirmPassword ? 'var(--accent)' : 'var(--gray-dark)',
                  color: 'var(--dark)',
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute -translate-y-1/2 right-4 top-1/2"
                style={{ color: 'var(--primary-light)' }}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm font-semibold" style={{ color: 'var(--accent)' }}>{errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="w-4 h-4 mt-1 rounded cursor-pointer"
                style={{ accentColor: 'var(--primary)' }}
              />
              <span className="text-sm" style={{ color: 'var(--dark)' }}>
                J'accepte les{' '}
                <Link to="/terms" className="font-bold" style={{ color: 'var(--primary)' }}>
                  conditions d'utilisation
                </Link>
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="mt-2 text-sm font-semibold" style={{ color: 'var(--accent)' }}>{errors.acceptTerms}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                Inscription...
              </div>
            ) : 'Créer mon compte'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
            Déjà un compte ?{' '}
            <Link to="/login" className="font-bold" style={{ color: 'var(--primary)' }}>
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}