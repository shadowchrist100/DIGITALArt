// Validation d'email
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, error: 'L\'email est requis' };
  }
  
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return { isValid: false, error: 'Email invalide' };
  }
  
  return { isValid: true, error: null };
};

// Validation de mot de passe
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: 'Le mot de passe est requis' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins 8 caractères' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins une majuscule' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins une minuscule' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Le mot de passe doit contenir au moins un chiffre' };
  }
  
  return { isValid: true, error: null };
};

// Validation de téléphone (format Bénin)
export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: false, error: 'Le numéro de téléphone est requis' };
  }
  
  const cleanPhone = phone.replace(/\s/g, '');
  const regex = /^(\+229)?[0-9]{8}$/;
  
  if (!regex.test(cleanPhone)) {
    return { isValid: false, error: 'Numéro de téléphone invalide (format: +229 XX XX XX XX)' };
  }
  
  return { isValid: true, error: null };
};

// Validation de nom
export const validateName = (name, fieldName = 'nom') => {
  if (!name || !name.trim()) {
    return { isValid: false, error: `Le ${fieldName} est requis` };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: `Le ${fieldName} doit contenir au moins 2 caractères` };
  }
  
  if (name.length > 100) {
    return { isValid: false, error: `Le ${fieldName} ne peut pas dépasser 100 caractères` };
  }
  
  return { isValid: true, error: null };
};

// Validation de texte (description, commentaire, etc.)
export const validateText = (text, minLength = 10, maxLength = 1000) => {
  if (!text || !text.trim()) {
    return { isValid: false, error: 'Ce champ est requis' };
  }
  
  if (text.trim().length < minLength) {
    return { isValid: false, error: `Le texte doit contenir au moins ${minLength} caractères` };
  }
  
  if (text.length > maxLength) {
    return { isValid: false, error: `Le texte ne peut pas dépasser ${maxLength} caractères` };
  }
  
  return { isValid: true, error: null };
};

// Validation de motif (pour sanction, refus, etc.)
export const validateMotif = (motif) => {
  return validateText(motif, 10, 500);
};

// Validation d'URL
export const validateURL = (url) => {
  if (!url) {
    return { isValid: false, error: 'L\'URL est requise' };
  }
  
  try {
    new URL(url);
    return { isValid: true, error: null };
  } catch {
    return { isValid: false, error: 'URL invalide' };
  }
};

// Validation de prix
export const validatePrice = (price) => {
  if (price === null || price === undefined || price === '') {
    return { isValid: false, error: 'Le prix est requis' };
  }
  
  const numPrice = Number(price);
  
  if (isNaN(numPrice)) {
    return { isValid: false, error: 'Le prix doit être un nombre' };
  }
  
  if (numPrice < 0) {
    return { isValid: false, error: 'Le prix ne peut pas être négatif' };
  }
  
  if (numPrice > 10000000) {
    return { isValid: false, error: 'Le prix ne peut pas dépasser 10,000,000 FCFA' };
  }
  
  return { isValid: true, error: null };
};

// Validation de date
export const validateDate = (date, allowPast = false) => {
  if (!date) {
    return { isValid: false, error: 'La date est requise' };
  }
  
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (isNaN(selectedDate.getTime())) {
    return { isValid: false, error: 'Date invalide' };
  }
  
  if (!allowPast && selectedDate < today) {
    return { isValid: false, error: 'La date ne peut pas être dans le passé' };
  }
  
  return { isValid: true, error: null };
};

// Validation de fichier image
export const validateImage = (file, maxSize = 5 * 1024 * 1024) => { // 5MB par défaut
  if (!file) {
    return { isValid: false, error: 'Aucun fichier sélectionné' };
  }
  
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Format d\'image non supporté (JPG, PNG, WEBP uniquement)' };
  }
  
  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return { isValid: false, error: `L'image ne doit pas dépasser ${maxSizeMB}MB` };
  }
  
  return { isValid: true, error: null };
};

// Validation de formulaire complet
export const validateForm = (fields) => {
  const errors = {};
  let isValid = true;
  
  Object.entries(fields).forEach(([key, value]) => {
    const { validator, required } = value;
    
    if (required && (!value.value || value.value === '')) {
      errors[key] = 'Ce champ est requis';
      isValid = false;
    } else if (validator && value.value) {
      const result = validator(value.value);
      if (!result.isValid) {
        errors[key] = result.error;
        isValid = false;
      }
    }
  });
  
  return { isValid, errors };
};

export default {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  validateText,
  validateMotif,
  validateURL,
  validatePrice,
  validateDate,
  validateImage,
  validateForm,
};