import { Link } from 'react-router-dom';
import RegisterForm from '../../components/Auth/RegisterForm';
import Card from '../../components/Common/Card';

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 to-success/10 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary mb-2">Inscription</h1>
          <p className="text-gray-600">Créez votre compte gratuitement</p>
        </div>

        <Card>
          <RegisterForm />
          <div className="mt-6 text-center text-gray-600">
            Déjà inscrit ?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Se connecter
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
