// Formater une date
export const formatDate = (date, options = {}) => {
  if (!date) return '-';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  
  return new Date(date).toLocaleDateString('fr-FR', defaultOptions);
};

// Formater une date et heure
export const formatDateTime = (date) => {
  if (!date) return '-';
  
  return new Date(date).toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Formater un nombre
export const formatNumber = (number) => {
  if (number === null || number === undefined) return '0';
  return number.toLocaleString('fr-FR');
};

// Formater un prix
export const formatPrice = (price) => {
  if (price === null || price === undefined) return '-';
  return `${price.toLocaleString('fr-FR')} FCFA`;
};

// Calculer le temps écoulé depuis une date
export const getTimeAgo = (date) => {
  if (!date) return '-';
  
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'À l\'instant';
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  
  return formatDate(date);
};

// Tronquer un texte
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Obtenir les initiales d'un nom
export const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return '??';
  const first = firstName ? firstName[0].toUpperCase() : '';
  const last = lastName ? lastName[0].toUpperCase() : '';
  return first + last;
};

// Générer une couleur aléatoire pour un avatar
export const getAvatarColor = (name) => {
  const colors = [
    '#4a6fa5',
    '#ff7e5f',
    '#22c55e',
    '#f59e0b',
    '#8b5cf6',
    '#ec4899',
    '#06b6d4',
    '#f43f5e',
  ];
  
  if (!name) return colors[0];
  
  const hash = name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};

// Valider un email
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Valider un numéro de téléphone (format Bénin)
export const isValidPhone = (phone) => {
  const regex = /^(\+229)?[0-9]{8}$/;
  return regex.test(phone.replace(/\s/g, ''));
};

// Copier du texte dans le presse-papier
export const copyToClipboard = (text) => {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback pour les navigateurs plus anciens
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return Promise.resolve();
  }
};

// Télécharger un fichier
export const downloadFile = (data, filename, mimeType = 'text/plain') => {
  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Obtenir le statut badge style
export const getStatusBadgeStyle = (status) => {
  const styles = {
    ACTIF: { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', label: 'Actif' },
    INACTIF: { bg: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af', label: 'Inactif' },
    SUSPENDU: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', label: 'Suspendu' },
    EN_ATTENTE: { bg: 'rgba(251, 146, 60, 0.1)', color: '#fb923c', label: 'En attente' },
    ACCEPTE: { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', label: 'Accepté' },
    REFUSE: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', label: 'Refusé' },
    ANNULE: { bg: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af', label: 'Annulé' },
    TERMINE: { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', label: 'Terminé' },
    EN_COURS: { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', label: 'En cours' },
    VERIFIE: { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', label: 'Vérifié' },
    REJETE: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', label: 'Rejeté' },
  };
  
  return styles[status] || { bg: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af', label: status };
};

// Obtenir le role badge style
export const getRoleBadgeStyle = (role) => {
  const styles = {
    CLIENT: { bg: 'rgba(74, 111, 165, 0.1)', color: '#4a6fa5', label: 'Client' },
    ARTISAN: { bg: 'rgba(255, 126, 95, 0.1)', color: '#ff7e5f', label: 'Artisan' },
    ADMIN: { bg: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', label: 'Admin' },
  };
  
  return styles[role] || styles.CLIENT;
};

// Obtenir le severity badge style
export const getSeverityBadgeStyle = (severity) => {
  const styles = {
    LOW: { bg: 'rgba(250, 204, 21, 0.1)', color: '#facc15', label: 'Faible' },
    MEDIUM: { bg: 'rgba(251, 146, 60, 0.1)', color: '#fb923c', label: 'Moyen' },
    HIGH: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', label: 'Élevé' },
    CRITICAL: { bg: 'rgba(220, 38, 38, 0.1)', color: '#dc2626', label: 'Critique' },
  };
  
  return styles[severity] || styles.MEDIUM;
};

// Debounce function pour les recherches
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default {
  formatDate,
  formatDateTime,
  formatNumber,
  formatPrice,
  getTimeAgo,
  truncateText,
  getInitials,
  getAvatarColor,
  isValidEmail,
  isValidPhone,
  copyToClipboard,
  downloadFile,
  getStatusBadgeStyle,
  getRoleBadgeStyle,
  getSeverityBadgeStyle,
  debounce,
};