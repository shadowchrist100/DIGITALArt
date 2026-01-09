import { useState } from 'react';
import Input from '../Common/Input';
import Button from '../Common/Button';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: 'CLIENT'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Register:', formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-4">
        <Input
          placeholder="Prénom"
          value={formData.prenom}
          onChange={(e) => handleChange('prenom', e.target.value)}
        />
        <Input
          placeholder="Nom"
          value={formData.nom}
          onChange={(e) => handleChange('nom', e.target.value)}
        />
      </div>

      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        icon={<span>📧</span>}
      />

      <Input
        type="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={(e) => handleChange('password', e.target.value)}
        icon={<span>🔒</span>}
      />

      <div className="space-y-2">
        <label className="block text-gray-700 font-semibold">Je suis :</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="CLIENT"
              checked={formData.role === 'CLIENT'}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-4 h-4"
            />
            <span>Client</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="ARTISAN"
              checked={formData.role === 'ARTISAN'}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-4 h-4"
            />
            <span>Artisan</span>
          </label>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Créer mon compte
      </Button>
    </form>
  );
}
