import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, FileText, CheckCircle, Loader } from 'lucide-react';
import { useAuth } from '../../components/Auth/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export default function BookAppointment() {
  const { artisanId } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [loading,      setLoading]      = useState(false);
  const [success,      setSuccess]      = useState(false);
  const [errors,       setErrors]       = useState({});
  const [apiError,     setApiError]     = useState('');
  const [artisan,      setArtisan]      = useState(null);
  const [disponibilite,setDisponibilite]= useState([]);
  const [atelierInfo,  setAtelierInfo]  = useState(null);

  const [formData, setFormData] = useState({
    date_heure: '',
    description: '',
    adresse: '',
  });

  // GET /ateliers/{id} + GET /ateliers/{id}/disponibilite
  useEffect(() => {
    if (!artisanId) return;
    const fetch_info = async () => {
      try {
        const [resAtelier, resDisponibilite] = await Promise.all([
          fetch(`${API_URL}/ateliers/${artisanId}`, {
            headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/ateliers/${artisanId}/disponibilite`, {
            headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
          }),
        ]);
        if (resAtelier.ok) {
          const data = await resAtelier.json();
          setAtelierInfo(data.atelier ?? data);
          setArtisan(data.atelier?.user ?? data.artisan ?? null);
        }
        if (resDisponibilite.ok) {
          const data = await resDisponibilite.json();
          setDisponibilite(data.disponibilites ?? data.slots ?? []);
        }
      } catch { /* ignore */ }
    };
    fetch_info();
  }, [artisanId, token]);

  const validate = () => {
    const e = {};
    if (!formData.date_heure)  e.date_heure  = 'Date et heure requises';
    if (!formData.description) e.description = 'Description requise';
    if (!formData.adresse)     e.adresse     = 'Adresse requise';
    return e;
  };

  // POST /rendez-vous
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setLoading(true);
    setApiError('');

    try {
      const payload = {
        atelier_id:  artisanId,
        date_heure:  formData.date_heure,
        description: formData.description,
        adresse:     formData.adresse,
      };

      const res = await fetch(`${API_URL}/rendez-vous`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept:          'application/json',
          Authorization:   `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          const mapped = {};
          Object.entries(data.errors).forEach(([k, v]) => { mapped[k] = Array.isArray(v) ? v[0] : v; });
          setErrors(mapped);
          return;
        }
        throw new Error(data.message || `Erreur ${res.status}`);
      }

      setSuccess(true);
      setTimeout(() => navigate('/my-appointments'), 2000);

    } catch (err) {
      setApiError(err.message || 'Erreur lors de la réservation');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Pré-remplir l'adresse avec celle de l'utilisateur connecté
  useEffect(() => {
    if (user?.adresse && !formData.adresse) {
      setFormData(prev => ({ ...prev, adresse: user.adresse }));
    }
  }, [user]);

  if (success) return (
    <div className="flex items-center justify-center min-h-screen pt-24 pb-20" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="w-full max-w-md p-12 text-center bg-white shadow-xl rounded-2xl">
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full"
          style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
          <CheckCircle className="w-12 h-12" style={{ color: '#22c55e' }} />
        </div>
        <h2 className="mb-4 text-3xl font-black" style={{ color: '#2b2d42' }}>Rendez-vous demandé !</h2>
        <p className="mb-6 text-sm" style={{ color: '#6c757d' }}>
          Votre demande a été envoyée. L'artisan confirmera dans les plus brefs délais.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm" style={{ color: '#4a6fa5' }}>
          <Loader className="w-4 h-4 animate-spin" /> Redirection...
        </div>
      </div>
    </div>
  );

  const artisanName = artisan
    ? `${artisan.prenom ?? ''} ${artisan.nom ?? ''}`.trim()
    : atelierInfo?.nom ?? 'Artisan';

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">

        {/* Header */}
        <button onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 text-sm font-bold"
          style={{ color: '#4a6fa5' }}>
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold rounded-full"
            style={{ backgroundColor: 'rgba(74,111,165,0.1)', color: '#4a6fa5' }}>
            <Calendar className="w-4 h-4" /> Nouveau rendez-vous
          </div>
          <h1 className="mb-2 text-4xl font-black md:text-5xl" style={{ color: '#2b2d42' }}>
            Prendre un <span className="text-transparent bg-clip-text"
              style={{ background: 'linear-gradient(90deg, #4a6fa5, #6b8fc7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              rendez-vous
            </span>
          </h1>
          <p className="text-lg" style={{ color: '#6c757d' }}>Réservez votre créneau avec {artisanName}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="p-8 bg-white shadow-lg rounded-2xl">

              {apiError && (
                <div className="p-4 mb-6 text-sm font-semibold text-red-700 border-2 border-red-200 bg-red-50 rounded-xl">
                  ⚠️ {apiError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Date et heure */}
                <div>
                  <label className="block mb-2 text-sm font-bold" style={{ color: '#2b2d42' }}>
                    Date et heure <span style={{ color: '#ff7e5f' }}>*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2" style={{ color: '#4a6fa5', opacity: 0.5 }} />
                    <input type="datetime-local" name="date_heure" value={formData.date_heure} onChange={handleChange}
                      min={new Date().toISOString().slice(0, 16)}
                      className={`w-full h-12 pl-12 pr-4 border-2 rounded-xl outline-none transition-all ${errors.date_heure ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'}`}
                      style={{ color: '#2b2d42' }} />
                  </div>
                  {errors.date_heure && <p className="mt-1 text-xs text-red-500">{errors.date_heure}</p>}

                  {/* Créneaux disponibles */}
                  {disponibilite.length > 0 && (
                    <div className="mt-3">
                      <p className="mb-2 text-xs font-semibold" style={{ color: '#6c757d' }}>Créneaux disponibles :</p>
                      <div className="flex flex-wrap gap-2">
                        {disponibilite.map((slot, i) => (
                          <button key={i} type="button"
                            onClick={() => setFormData(prev => ({ ...prev, date_heure: slot }))}
                            className="px-3 py-1 text-xs font-bold transition-all border-2 rounded-lg"
                            style={{
                              borderColor: formData.date_heure === slot ? '#4a6fa5' : '#e9ecef',
                              backgroundColor: formData.date_heure === slot ? 'rgba(74,111,165,0.1)' : 'white',
                              color: '#2b2d42'
                            }}>
                            {new Date(slot).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Description du service */}
                <div>
                  <label className="block mb-2 text-sm font-bold" style={{ color: '#2b2d42' }}>
                    Description du service <span style={{ color: '#ff7e5f' }}>*</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute w-5 h-5 pointer-events-none left-4 top-4" style={{ color: '#4a6fa5', opacity: 0.5 }} />
                    <textarea name="description" value={formData.description} onChange={handleChange}
                      placeholder="Décrivez le service dont vous avez besoin..."
                      rows={4}
                      className={`w-full py-3 pl-12 pr-4 border-2 rounded-xl outline-none resize-none transition-all ${errors.description ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'}`}
                      style={{ color: '#2b2d42' }} />
                  </div>
                  {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                </div>

                {/* Adresse */}
                <div>
                  <label className="block mb-2 text-sm font-bold" style={{ color: '#2b2d42' }}>
                    Adresse d'intervention <span style={{ color: '#ff7e5f' }}>*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2" style={{ color: '#4a6fa5', opacity: 0.5 }} />
                    <input type="text" name="adresse" value={formData.adresse} onChange={handleChange}
                      placeholder="Rue, quartier, ville..."
                      className={`w-full h-12 pl-12 pr-4 border-2 rounded-xl outline-none transition-all ${errors.adresse ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'}`}
                      style={{ color: '#2b2d42' }} />
                  </div>
                  {errors.adresse && <p className="mt-1 text-xs text-red-500">{errors.adresse}</p>}
                </div>

                {/* Boutons */}
                <div className="flex gap-4 pt-6 border-t" style={{ borderColor: '#e9ecef' }}>
                  <button type="button" onClick={() => navigate(-1)}
                    className="flex-1 py-3 font-bold border-2 border-gray-200 rounded-xl hover:bg-gray-50"
                    style={{ color: '#2b2d42' }}>
                    Annuler
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-1 py-3 font-bold text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #4a6fa5, #3a5784)' }}>
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                        Envoi...
                      </div>
                    ) : 'Confirmer le rendez-vous'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar artisan */}
          <div className="lg:col-span-1">
            <div className="sticky p-6 bg-white shadow-lg rounded-2xl top-24">
              <h3 className="mb-4 text-lg font-bold" style={{ color: '#2b2d42' }}>Artisan sélectionné</h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-16 h-16 text-2xl font-black text-white rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #4a6fa5, #3a5784)' }}>
                  {artisanName.charAt(0)}
                </div>
                <div>
                  <div className="mb-1 font-bold" style={{ color: '#2b2d42' }}>{artisanName}</div>
                  {atelierInfo?.domaine && (
                    <div className="text-sm" style={{ color: '#ff7e5f' }}>{atelierInfo.domaine}</div>
                  )}
                </div>
              </div>

              {atelierInfo?.description && (
                <p className="mb-4 text-sm" style={{ color: '#6c757d' }}>{atelierInfo.description}</p>
              )}

              <div className="p-4 space-y-3 rounded-xl" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" style={{ color: '#4a6fa5' }} />
                  <span style={{ color: '#2b2d42' }}>Réponse sous 24h</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4" style={{ color: '#22c55e' }} />
                  <span style={{ color: '#2b2d42' }}>Professionnel vérifié</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" style={{ color: '#4a6fa5' }} />
                  <span style={{ color: '#2b2d42' }}>Annulation gratuite</span>
                </div>
              </div>

              <div className="p-4 mt-6 text-xs rounded-xl"
                style={{ backgroundColor: 'rgba(251,146,60,0.1)', color: '#fb923c' }}>
                Votre demande sera envoyée à l'artisan pour confirmation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}