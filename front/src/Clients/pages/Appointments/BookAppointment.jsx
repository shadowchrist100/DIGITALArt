import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, User, Phone, Mail, FileText, CheckCircle } from 'lucide-react';
import Card from '../../components/Common/Card';
import Button from '../../components/Common/Button';
import Input from '../../components/Common/Input';

export default function BookAppointment() {
  const { artisanId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    artisanId: artisanId || '',
    date: '',
    time: '',
    duration: '1',
    service: '',
    address: '',
    city: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  // Mock artisan data (TODO: fetch from API)
  const artisan = {
    name: 'Jean Kouassi',
    specialty: 'Plomberie',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=200',
    availableSlots: [
      '08:00', '09:00', '10:00', '11:00', 
      '14:00', '15:00', '16:00', '17:00'
    ]
  };

  const durations = [
    { value: '0.5', label: '30 minutes' },
    { value: '1', label: '1 heure' },
    { value: '1.5', label: '1h30' },
    { value: '2', label: '2 heures' },
    { value: '3', label: '3 heures' },
    { value: '4', label: '4+ heures' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.date) newErrors.date = 'Date requise';
    if (!formData.time) newErrors.time = 'Heure requise';
    if (!formData.service) newErrors.service = 'Service requis';
    if (!formData.address) newErrors.address = 'Adresse requise';
    if (!formData.city) newErrors.city = 'Ville requise';
    if (!formData.name) newErrors.name = 'Nom requis';
    if (!formData.phone) newErrors.phone = 'Téléphone requis';
    if (!formData.email) newErrors.email = 'Email requis';
    
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
        console.log('Rendez-vous:', formData);
        setLoading(false);
        setSuccess(true);
        
        setTimeout(() => {
          navigate('/my-appointments');
        }, 2000);
      }, 1500);
      
    } catch (error) {
      setLoading(false);
      setErrors({ submit: 'Erreur lors de la réservation' });
      console.error('Booking error:', error);
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
            Rendez-vous demandé !
          </h2>
          <p className="mb-6 text-sm" style={{ color: 'var(--dark)', opacity: 0.7 }}>
            Votre demande de rendez-vous a été envoyée. L'artisan confirmera dans les plus brefs délais.
          </p>
          <Button onClick={() => navigate('/my-appointments')} className="w-full">
            Voir mes rendez-vous
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: 'var(--light)' }}>
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
        
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 text-sm font-bold transition-all"
          style={{ color: 'var(--primary)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold rounded-full" style={{ backgroundColor: 'rgba(74, 111, 165, 0.1)', color: 'var(--primary)' }}>
            <Calendar className="w-4 h-4" />
            Nouveau rendez-vous
          </div>
          
          <h1 className="mb-4 text-4xl font-black md:text-5xl" style={{ color: 'var(--dark)' }}>
            Prendre un
            <span className="text-transparent bg-clip-text" style={{ background: 'linear-gradient(90deg, var(--primary), var(--primary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {' '}rendez-vous
            </span>
          </h1>
          <p className="text-lg" style={{ color: 'var(--dark)', opacity: 0.7 }}>
            Réservez votre créneau avec {artisan.name}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              {errors.submit && (
                <div className="p-4 mb-6 rounded-xl" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444' }}>
                  <p className="text-sm font-semibold" style={{ color: '#ef4444' }}>{errors.submit}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date et Heure */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-bold" style={{ color: 'var(--dark)' }}>
                      Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2" style={{ color: 'var(--primary-light)' }} />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full h-12 px-4 pl-12 transition-all border-2 rounded-xl"
                        style={{
                          backgroundColor: errors.date ? 'rgba(239, 68, 68, 0.05)' : 'var(--gray)',
                          borderColor: errors.date ? '#ef4444' : 'var(--gray-dark)',
                          color: 'var(--dark)'
                        }}
                      />
                    </div>
                    {errors.date && (
                      <p className="mt-2 text-sm font-semibold" style={{ color: '#ef4444' }}>{errors.date}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-bold" style={{ color: 'var(--dark)' }}>
                      Heure *
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full h-12 px-4 transition-all border-2 rounded-xl"
                      style={{
                        backgroundColor: errors.time ? 'rgba(239, 68, 68, 0.05)' : 'var(--gray)',
                        borderColor: errors.time ? '#ef4444' : 'var(--gray-dark)',
                        color: 'var(--dark)'
                      }}
                    >
                      <option value="">Choisir un créneau</option>
                      {artisan.availableSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="mt-2 text-sm font-semibold" style={{ color: '#ef4444' }}>{errors.time}</p>
                    )}
                  </div>
                </div>

                {/* Durée estimée */}
                <div>
                  <label className="block mb-2 text-sm font-bold" style={{ color: 'var(--dark)' }}>
                    Durée estimée
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full h-12 px-4 transition-all border-2 rounded-xl"
                    style={{
                      backgroundColor: 'var(--gray)',
                      borderColor: 'var(--gray-dark)',
                      color: 'var(--dark)'
                    }}
                  >
                    {durations.map(d => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>

                {/* Service */}
                <Input
                  label="Type de service *"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  icon={FileText}
                  placeholder="Ex: Réparation fuite d'eau"
                  error={errors.service}
                />

                {/* Localisation */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Input
                    label="Adresse *"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    icon={MapPin}
                    placeholder="Rue, quartier..."
                    error={errors.address}
                  />
                  
                  <Input
                    label="Ville *"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    icon={MapPin}
                    placeholder="Ex: Cotonou"
                    error={errors.city}
                  />
                </div>

                {/* Vos informations */}
                <div className="pt-6 border-t" style={{ borderColor: 'var(--gray-dark)' }}>
                  <h3 className="mb-4 text-xl font-bold" style={{ color: 'var(--dark)' }}>
                    Vos informations
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
                        label="Téléphone *"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        icon={Phone}
                        placeholder="+229 XX XX XX XX"
                        error={errors.phone}
                      />
                      
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
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block mb-2 text-sm font-bold" style={{ color: 'var(--dark)' }}>
                    Notes additionnelles
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Informations complémentaires..."
                    rows={3}
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
                    onClick={() => navigate(-1)}
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
                        Envoi...
                      </div>
                    ) : 'Confirmer le rendez-vous'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Card artisan */}
            <Card className="sticky p-6 top-24">
              <h3 className="mb-4 text-lg font-bold" style={{ color: 'var(--dark)' }}>
                Artisan sélectionné
              </h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 overflow-hidden rounded-xl" style={{ backgroundColor: 'var(--gray)' }}>
                  <img src={artisan.image} alt={artisan.name} className="object-cover w-full h-full" />
                </div>
                <div>
                  <div className="mb-1 font-bold" style={{ color: 'var(--dark)' }}>
                    {artisan.name}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--accent)' }}>
                    {artisan.specialty}
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3 rounded-xl" style={{ backgroundColor: 'var(--gray)' }}>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  <span style={{ color: 'var(--dark)' }}>
                    Réponse sous 24h
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4" style={{ color: '#22c55e' }} />
                  <span style={{ color: 'var(--dark)' }}>
                    Professionnel vérifié
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  <span style={{ color: 'var(--dark)' }}>
                    Annulation gratuite
                  </span>
                </div>
              </div>

              <div className="p-4 mt-6 text-xs rounded-xl" style={{ backgroundColor: 'rgba(251, 146, 60, 0.1)', color: '#fb923c' }}>
                Votre demande sera envoyée à l'artisan pour confirmation. Vous recevrez une notification de sa réponse.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}