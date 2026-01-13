import axios from 'axios';

// Configuration de l'URL de base de l'API
// // eslint-disable-next-line no-undef
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Créer une instance Axios
const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 secondes
});

// Intercepteur pour ajouter le token JWT à chaque requête
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si le token est expiré (401), déconnecter l'utilisateur
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/login';
    }

    // Si erreur 403, accès refusé
    if (error.response && error.response.status === 403) {
      console.error('Accès refusé');
    }

    // Si erreur 500, problème serveur
    if (error.response && error.response.status === 500) {
      console.error('Erreur serveur');
    }

    return Promise.reject(error);
  }
);

export default API;