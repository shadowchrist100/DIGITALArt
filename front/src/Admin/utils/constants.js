// Rôles utilisateurs
export const USER_ROLES = {
  CLIENT:  'CLIENT',
  ARTISAN: 'ARTISAN',
  ADMIN:   'ADMIN',
};

// Statuts utilisateurs
export const USER_STATUS = {
  ACTIF:    'ACTIF',
  INACTIF:  'INACTIF',
  SUSPENDU: 'SUSPENDU',
};

// Statuts de service
export const SERVICE_STATUS = {
  EN_ATTENTE: 'EN_ATTENTE',
  ACCEPTE:    'ACCEPTE',
  REFUSE:     'REFUSE',
  EN_COURS:   'EN_COURS',
  TERMINE:    'TERMINE',
  ANNULE:     'ANNULE',
};

// Statuts de rendez-vous
export const RDV_STATUS = {
  EN_ATTENTE: 'EN_ATTENTE',
  ACCEPTE:    'ACCEPTE',
  REFUSE:     'REFUSE',
  ANNULE:     'ANNULE',
};

// Statuts d'atelier
export const ATELIER_STATUS = {
  ACTIF:          'ACTIF',
  INACTIF:        'INACTIF',
  SUSPENDU:       'SUSPENDU',
};

// Limites de pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

// Messages d'erreur
export const ERROR_MESSAGES = {
  NETWORK_ERROR:  'Erreur de connexion au serveur',
  UNAUTHORIZED:   'Accès non autorisé',
  FORBIDDEN:      "Vous n'avez pas les permissions nécessaires",
  NOT_FOUND:      'Ressource non trouvée',
  SERVER_ERROR:   'Erreur serveur, veuillez réessayer plus tard',
};

// Messages de succès
export const SUCCESS_MESSAGES = {
  USER_UPDATED:    'Utilisateur mis à jour avec succès',
  USER_DELETED:    'Utilisateur supprimé avec succès',
  USER_SUSPENDED:  'Utilisateur suspendu avec succès',
  USER_REACTIVATED:'Utilisateur réactivé avec succès',
  ATELIER_SUSPENDED:  'Atelier suspendu avec succès',
  ATELIER_REACTIVATED:'Atelier réactivé avec succès',
  AVIS_DELETED:    'Avis supprimé avec succès',
  SERVICE_DELETED: 'Service supprimé avec succès',
  RDV_DELETED:     'Rendez-vous supprimé avec succès',
};

export default {
  USER_ROLES,
  USER_STATUS,
  SERVICE_STATUS,
  RDV_STATUS,
  ATELIER_STATUS,
  PAGINATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};