import { Link } from 'react-router-dom';
import LoginForm from '../../components/Auth/LoginForm';
import Card from '../../components/Common/Card';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary mb-2">Connexion</h1>
          <p className="text-gray-600">Accédez à votre compte ArtisanConnect</p>
        </div>

        <Card>
          <LoginForm />
          <div className="mt-6 text-center text-gray-600">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              S'inscrire
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
