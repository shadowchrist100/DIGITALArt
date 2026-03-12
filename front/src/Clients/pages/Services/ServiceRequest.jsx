import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, DollarSign, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../../components/Common/Card';
import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';
import { useAuth } from '../../components/Auth/AuthContext';

const CATEGORIES = [
  'Plomberie', 'Électricité', 'Menuiserie', 'Peinture',
  'Maçonnerie', 'Couture', 'Coiffure', 'Mécanique', 'Autre',
];

export default function ServiceRequest() {
  const { artisanId } = useParams();
  const navigate = useNavigate();
  const { accesToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors]   = useState({});

  const [formData, setFormData] = useState({
    artisan_id:      artisanId || '',
    title:           '',
    description:     '',
    category:        '',
    address:         '',
    city:            '',
    preferred_date:  '',
    budget:          '',
    urgent:          false,
    phone:           '',
    additional_notes: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!formData.title || formData.title.trim().length < 5)
      e.title = 'Titre requis (min 5 caractères)';
    if (!formData.description || formData.description.trim().length < 20)
      e.description = 'Description requise (min 20 caractères)';
    if (!formData.category)  e.category = 'Catégorie requise';
    if (!formData.address)   e.address  = 'Adresse requise';
    if (!formData.city)      e.city     = 'Ville requise';
    if (!formData.phone)     e.phone    = 'Téléphone requis';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${accesToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          artisan_id: formData.artisan_id || undefined,
          budget:     formData.budget     || undefined,
          preferred_date: formData.preferred_date || undefined,
          additional_notes: formData.additional_notes || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const mapped = {};
          Object.keys(data.errors).forEach(k => { mapped[k] = data.errors[k][0]; });
          setErrors(mapped);
        } else {
          setErrors({ submit: data.message ?? 'Une erreur est survenue' });
        }
        return;
      }

      setSuccess(true);
      setTimeout(() => navigate('/my-services'), 2000);

    } catch {
      setErrors({ submit: 'Impossible de contacter le serveur. Vérifiez votre connexion.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-24 pb-20"
        style={{ backgroundColor: 'var(--light)' }}>
        <Card className="w-full max-w-md p-12 text-center">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full"
            style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
            <CheckCircle className="w-12 h-12" style={{ color: '#22c55e' }} />
          </div>
          <h2 className="mb-4 text-3xl font-black" style={{ color: 'var(--dark)' }}>Demande envoyée !</h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
            Votre demande a été transmise avec succès. L'artisan vous contactera bientôt.
          </p>
          <Button onClick={() => navigate('/my-services')} className="w-full">
            Voir mes demandes
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: 'var(--light)' }}>
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">

        <button onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 text-sm font-bold transition-all"
          style={{ color: 'var(--primary)' }}>
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold rounded-full"
            style={{ backgroundColor: 'rgba(255, 126, 95, 0.1)', color: 'var(--accent)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }} />
            Nouvelle demande
          </div>
          <h1 className="mb-4 text-4xl font-black md:text-5xl" style={{ color: 'var(--dark)' }}>
            Demande de
            <span className="text-transparent bg-clip-text"
              style={{ background: 'linear-gradient(90deg, var(--accent), #ff6b4a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {' '}service
            </span>
          </h1>
          <p className="text-lg" style={{ color: 'var(--dark)', opacity: 0.7 }}>
            Décrivez votre besoin et recevez des propositions
          </p>
        </div>

        <Card className="p-8">
          {errors.submit && (
            <div className="p-4 mb-6 rounded-xl"
              style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444' }}>
              <p className="text-sm font-semibold" style={{ color: '#ef4444' }}>{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Titre de la demande *" name="title" value={formData.title}
              onChange={handleChange} icon={FileText} placeholder="Ex: Réparation fuite d'eau"
              error={errors.title} />

            {/* Catégorie */}
            <div>
              <label className="block mb-2 text-sm font-bold" style={{ color: 'var(--dark)' }}>
                Catégorie *
              </label>
              <select name="category" value={formData.category} onChange={handleChange}
                className="w-full h-12 px-4 transition-all border-2 rounded-xl"
                style={{
                  backgroundColor: errors.category ? 'rgba(239, 68, 68, 0.05)' : 'var(--gray)',
                  borderColor: errors.category ? '#ef4444' : 'var(--gray-dark)',
                  color: 'var(--dark)',
                }}>
                <option value="">Choisir une catégorie</option>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              {errors.category && (
                <p className="mt-2 text-sm font-semibold" style={{ color: '#ef4444' }}>{errors.category}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 text-sm font-bold" style={{ color: 'var(--dark)' }}>
                Description détaillée *
              </label>
              <textarea name="description" value={formData.description} onChange={handleChange}
                placeholder="Décrivez précisément votre besoin..." rows={5}
                className="w-full px-4 py-3 transition-all border-2 resize-none rounded-xl"
                style={{
                  backgroundColor: errors.description ? 'rgba(239, 68, 68, 0.05)' : 'var(--gray)',
                  borderColor: errors.description ? '#ef4444' : 'var(--gray-dark)',
                  color: 'var(--dark)',
                }} />
              {errors.description && (
                <p className="mt-2 text-sm font-semibold" style={{ color: '#ef4444' }}>{errors.description}</p>
              )}
            </div>

            {/* Localisation */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input label="Adresse *" name="address" value={formData.address}
                onChange={handleChange} icon={MapPin} placeholder="Rue, quartier..."
                error={errors.address} />
              <Input label="Ville *" name="city" value={formData.city}
                onChange={handleChange} icon={MapPin} placeholder="Ex: Cotonou"
                error={errors.city} />
            </div>

            {/* Date et Budget */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-bold" style={{ color: 'var(--dark)' }}>
                  Date souhaitée
                </label>
                <div className="relative">
                  <Calendar className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2"
                    style={{ color: 'var(--primary-light)' }} />
                  <input type="date" name="preferred_date" value={formData.preferred_date}
                    onChange={handleChange}
                    className="w-full h-12 px-4 pl-12 transition-all border-2 rounded-xl"
                    style={{ backgroundColor: 'var(--gray)', borderColor: 'var(--gray-dark)', color: 'var(--dark)' }} />
                </div>
              </div>
              <Input label="Budget estimé (FCFA)" name="budget" type="number"
                value={formData.budget} onChange={handleChange} icon={DollarSign}
                placeholder="Ex: 50000" />
            </div>

            <Input label="Téléphone de contact *" name="phone" type="tel"
              value={formData.phone} onChange={handleChange}
              placeholder="+229 XX XX XX XX" error={errors.phone} />

            {/* Notes */}
            <div>
              <label className="block mb-2 text-sm font-bold" style={{ color: 'var(--dark)' }}>
                Notes additionnelles
              </label>
              <textarea name="additional_notes" value={formData.additional_notes}
                onChange={handleChange} placeholder="Informations complémentaires..." rows={3}
                className="w-full px-4 py-3 transition-all border-2 resize-none rounded-xl"
                style={{ backgroundColor: 'var(--gray)', borderColor: 'var(--gray-dark)', color: 'var(--dark)' }} />
            </div>

            {/* Urgence */}
            <div className="p-4 rounded-xl"
              style={{ backgroundColor: formData.urgent ? 'rgba(239, 68, 68, 0.1)' : 'var(--gray)' }}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="urgent" checked={formData.urgent}
                  onChange={handleChange} className="w-5 h-5 mt-0.5 rounded cursor-pointer"
                  style={{ accentColor: '#ef4444' }} />
                <div>
                  <div className="flex items-center gap-2 mb-1 font-bold"
                    style={{ color: formData.urgent ? '#ef4444' : 'var(--dark)' }}>
                    <AlertCircle className="w-5 h-5" /> Demande urgente
                  </div>
                  <p className="text-xs" style={{ color: 'var(--dark)', opacity: 0.7 }}>
                    Cochez cette case si vous avez besoin d'une intervention rapide
                  </p>
                </div>
              </label>
            </div>

            <div className="flex gap-4 pt-6 border-t" style={{ borderColor: 'var(--gray-dark)' }}>
              <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
                Annuler
              </Button>
              <Button type="submit" variant="primary" disabled={loading} className="flex-1">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
                    Envoi...
                  </div>
                ) : 'Envoyer la demande'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}