import { useState } from 'react';
import Input from '../Common/Input';
import Button from '../Common/Button';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<span>📧</span>}
      />
      <Input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<span>🔒</span>}
      />
      <Button type="submit" className="w-full">
        Se connecter
      </Button>
      <div className="text-center">
        <a href="#" className="text-primary hover:underline">
          Mot de passe oublié ?
        </a>
      </div>
    </form>
  );
}
