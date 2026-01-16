import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Save, Camera, CheckCircle } from 'lucide-react';
import Card from '../../components/Common/Card';
import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';

export default function EditProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    phone: '+229 97 12 34 56',
    address: '123 Rue de la République',
    city: 'Cotonou',
    country: 'Bénin',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
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
    }
    
    if (!formData.city) {
      newErrors.city = 'Ville requise';
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
      // TODO: Appel API Laravel
      setTimeout(() => {
        console.log('Update profile:', formData);
        setLoading(false);
        setSuccess(true);
        
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      }, 1500);
      
    } catch (error) {
      setLoading(false);
      setErrors({ submit: 'Erreur lors de la mise à jour' });
      console.error('Update profile error:', error);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-24 pb-20" style={{ backgroundColor: 'var(--light)' }}>
        <Card className="w-full max-w-md p-12 text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
            <CheckCircle className="w-12 h-12" style={{ color: '#22c55e' }} />
          </div>
          <h2 className="mb-4 text-3xl font-black" style={{ color: 'var(--dark)' }}>
            Profil mis à jour !
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
            Vos informations ont été enregistrées avec succès
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: 'var(--light)' }}>
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        
        {/* Header */}
        <button
          onClick={() => navigate('/profile')}
          className="inline-flex items-center gap-2 mb-6 text-sm font-bold transition-all"
          style={{ color: 'var(--primary)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au profil
        </button>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold rounded-full" style={{ backgroundColor: 'rgba(74, 111, 165, 0.1)', color: 'var(--primary)' }}>
            <User className="w-4 h-4" />
            Édition profil
          </div>
          
          <h1 className="mb-4 text-4xl font-black md:text-5xl" style={{ color: 'var(--dark)' }}>
            Modifier mon
            <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(90deg, var(--primary), var(--primary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {' '}profil
            </span>
          </h1>
          <p className="text-lg" style={{ color: 'var(--dark)', opacity: 0.7 }}>
            Mettez à jour vos informations personnelles
          </p>
        </div>

        <Card className="p-8">
          {errors.submit && (
            <div className="p-4 mb-6 rounded-xl" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444' }}>
              <p className="text-sm font-semibold" style={{ color: '#ef4444' }}>{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Photo de profil */}
            <div>
              <label className="block mb-4 text-sm font-bold" style={{ color: 'var(--dark)' }}>
                Photo de profil
              </label>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 overflow-hidden rounded-full" style={{ backgroundColor: 'var(--gray)' }}>
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar" className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-3xl font-black text-white" style={{ backgroundColor: 'var(--primary)' }}>
                      {formData.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <label htmlFor="avatar">
                    <Button type="button" variant="outline" className="!px-4 !py-2 !text-sm cursor-pointer" onClick={() => document.getElementById('avatar').click()}>
                      <Camera className="w-4 h-4" />
                      Changer la photo
                    </Button>
                  </label>
                  <p className="mt-2 text-xs" style={{ color: 'var(--dark)', opacity: 0.6 }}>
                    JPG, PNG ou GIF (max 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="pt-6 border-t" style={{ borderColor: 'var(--gray-dark)' }}>
              <h3 className="mb-6 text-xl font-bold" style={{ color: 'var(--dark)' }}>
                Informations personnelles
              </h3>
              
              <div className="space-y-4">
                <Input
                  label="Nom complet *"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  icon={User}
                  placeholder="Jean Dupont"
                  error={errors.name}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="Email *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={Mail}
                    placeholder="exemple@email.com"
                    error={errors.email}
                  />
                  
                  <Input
                    label="Téléphone *"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    icon={Phone}
                    placeholder="+229 XX XX XX XX"
                    error={errors.phone}
                  />
                </div>
              </div>
            </div>

            {/* Localisation */}
            <div className="pt-6 border-t" style={{ borderColor: 'var(--gray-dark)' }}>
              <h3 className="mb-6 text-xl font-bold" style={{ color: 'var(--dark)' }}>
                Localisation
              </h3>
              
              <div className="space-y-4">
                <Input
                  label="Adresse"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  icon={MapPin}
                  placeholder="123 Rue de la République"
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="Ville *"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    icon={MapPin}
                    placeholder="Cotonou"
                    error={errors.city}
                  />
                  
                  <Input
                    label="Pays"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    icon={MapPin}
                    placeholder="Bénin"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="pt-6 border-t" style={{ borderColor: 'var(--gray-dark)' }}>
              <label className="block mb-2 text-sm font-bold" style={{ color: 'var(--dark)' }}>
                Bio (optionnel)
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Parlez-nous un peu de vous..."
                rows={4}
                className="w-full px-4 py-3 transition-all border-2 resize-none rounded-xl"
                style={{
                  backgroundColor: 'var(--gray)',
                  borderColor: 'var(--gray-dark)',
                  color: 'var(--dark)'
                }}
              ></textarea>
            </div>

            {/* Boutons */}
            <div className="flex gap-4 pt-6 border-t" style={{ borderColor: 'var(--gray-dark)' }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/profile')}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Enregistrement...
                  </div>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Enregistrer les modifications
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}