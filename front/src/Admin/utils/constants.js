// Rôles utilisateurs
export const USER_ROLES = {
  CLIENT: 'CLIENT',
  ARTISAN: 'ARTISAN',
  ADMIN: 'ADMIN',
};

// Statuts utilisateurs
export const USER_STATUS = {
  ACTIF: 'ACTIF',
  INACTIF: 'INACTIF',
  SUSPENDU: 'SUSPENDU',
};

// Statuts de vérification artisan
export const VERIFICATION_STATUS = {
  EN_ATTENTE: 'EN_ATTENTE',
  VERIFIE: 'VERIFIE',
  REJETE: 'REJETE',
};

// Types de signalements
export const SIGNALEMENT_TYPES = {
  IMAGE_INAPPROPRIEE: 'IMAGE_INAPPROPRIEE',
  COMMENTAIRE_INAPPROPRIE: 'COMMENTAIRE_INAPPROPRIE',
  OFFRE_ILLEGALE: 'OFFRE_ILLEGALE',
  HARCELEMENT: 'HARCELEMENT',
  SPAM: 'SPAM',
  FAUX_PROFIL: 'FAUX_PROFIL',
  AUTRE: 'AUTRE',
};

// Niveaux de gravité
export const SEVERITY_LEVELS = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
};

// Statuts de signalements
export const SIGNALEMENT_STATUS = {
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
};

// Types de sanctions
export const SANCTION_TYPES = {
  AVERTISSEMENT: 'AVERTISSEMENT',
  SUSPENSION_TEMPORAIRE: 'SUSPENSION_TEMPORAIRE',
  SUSPENSION_PERMANENTE: 'SUSPENSION_PERMANENTE',
  SUPPRESSION_CONTENU: 'SUPPRESSION_CONTENU',
};

// Types de contenu
export const CONTENT_TYPES = {
  GALERIE_IMAGE: 'GALERIE_IMAGE',
  AVIS: 'AVIS',
  OFFRE: 'OFFRE',
  MESSAGES: 'MESSAGES',
  PROFIL: 'PROFIL',
  ATELIER: 'ATELIER',
};

// Statuts de service
export const SERVICE_STATUS = {
  EN_ATTENTE: 'EN_ATTENTE',
  ACCEPTE: 'ACCEPTE',
  REFUSE: 'REFUSE',
  EN_COURS: 'EN_COURS',
  TERMINE: 'TERMINE',
  ANNULE: 'ANNULE',
};

// Statuts de rendez-vous
export const RDV_STATUS = {
  EN_ATTENTE: 'EN_ATTENTE',
  ACCEPTE: 'ACCEPTE',
  REFUSE: 'REFUSE',
  ANNULE: 'ANNULE',
  TERMINE: 'TERMINE',
};

// Statuts d'atelier
export const ATELIER_STATUS = {
  ACTIF: 'ACTIF',
  INACTIF: 'INACTIF',
  EN_VERIFICATION: 'EN_VERIFICATION',
};

// Durées de suspension standard (en jours)
export const SUSPENSION_DURATIONS = {
  COURT: 7,
  MOYEN: 14,
  LONG: 30,
};

// Limites de pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

// Messages d'erreur
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion au serveur',
  UNAUTHORIZED: 'Accès non autorisé',
  FORBIDDEN: 'Vous n\'avez pas les permissions nécessaires',
  NOT_FOUND: 'Ressource non trouvée',
  SERVER_ERROR: 'Erreur serveur, veuillez réessayer plus tard',
};

// Messages de succès
export const SUCCESS_MESSAGES = {
  USER_UPDATED: 'Utilisateur mis à jour avec succès',
  USER_DELETED: 'Utilisateur supprimé avec succès',
  ARTISAN_APPROVED: 'Artisan approuvé avec succès',
  ARTISAN_REJECTED: 'Artisan rejeté avec succès',
  SANCTION_APPLIED: 'Sanction appliquée avec succès',
  CONTENT_DELETED: 'Contenu supprimé avec succès',
};

export default {
  USER_ROLES,
  USER_STATUS,
  VERIFICATION_STATUS,
  SIGNALEMENT_TYPES,
  SEVERITY_LEVELS,
  SIGNALEMENT_STATUS,
  SANCTION_TYPES,
  CONTENT_TYPES,
  SERVICE_STATUS,
  RDV_STATUS,
  ATELIER_STATUS,
  SUSPENSION_DURATIONS,
  PAGINATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};