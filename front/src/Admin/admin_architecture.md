# 🏗️ ARCHITECTURE ADMIN - ARTISANCONNECT

## 📋 Table des matières
1. [Structure Frontend Admin](#structure-frontend-admin)
2. [Routes Admin](#routes-admin)
3. [Composants Admin](#composants-admin)
4. [API Endpoints Backend](#api-endpoints-backend)
5. [Base de données Admin](#base-de-données-admin)
6. [Flux de données Admin](#flux-de-données-admin)
7. [Sécurité Admin](#sécurité-admin)

---

## 🎨 Structure Frontend Admin

### 📁 Arborescence des dossiers

```
front/src/
└── Admin/
    ├── components/
    │   ├── AdminSidebar.jsx          # Navigation latérale
    │   ├── AdminHeader.jsx           # En-tête (à créer)
    │   ├── StatCard.jsx              # Carte de statistiques (à créer)
    │   ├── UserTable.jsx             # Table utilisateurs (à créer)
    │   └── ConfirmModal.jsx          # Modal de confirmation (à créer)
    │
    ├── pages/
    │   ├── AdminDashboard.jsx        # ✅ Créé - Tableau de bord
    │   ├── AdminUsers.jsx            # ✅ Créé - Gestion utilisateurs
    │   ├── AdminArtisanVerification.jsx  # ✅ Créé - Vérification artisans
    │   ├── AdminModeration.jsx       # ✅ Créé - Modération contenu
    │   ├── AdminAteliers.jsx         # ⏳ À créer - Gestion ateliers
    │   ├── AdminServices.jsx         # ⏳ À créer - Gestion services
    │   ├── AdminAppointments.jsx     # ⏳ À créer - Gestion RDV
    │   ├── AdminReviews.jsx          # ⏳ À créer - Modération avis
    │   └── AdminSettings.jsx         # ⏳ À créer - Paramètres
    │
    ├── layouts/
    │   └── AdminLayout.jsx           # ✅ Créé - Layout principal
    │
    ├── hooks/                        # ⏳ À créer
    │   ├── useAuth.js
    │   ├── useStats.js
    │   └── useModeration.js
    │
    ├── services/                     # ⏳ À créer
    │   ├── api.js                    # Configuration Axios
    │   ├── authService.js
    │   ├── userService.js
    │   ├── moderationService.js
    │   └── statsService.js
    │
    └── utils/                        # ⏳ À créer
        ├── constants.js
        ├── helpers.js
        └── validators.js
```

---

## 🛣️ Routes Admin

### Configuration dans App.jsx

```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from './Admin/layouts/AdminLayout';
import AdminDashboard from './Admin/pages/AdminDashboard';
import AdminUsers from './Admin/pages/AdminUsers';
import AdminArtisanVerification from './Admin/pages/AdminArtisanVerification';
import AdminModeration from './Admin/pages/AdminModeration';
import Login from './Clients/pages/Auth/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        
        {/* Routes Admin protégées */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="verification" element={<AdminArtisanVerification />} />
          <Route path="moderation" element={<AdminModeration />} />
          {/* Autres routes à ajouter */}
        </Route>

        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### Table des routes

| Route | Composant | Description | Statut |
|-------|-----------|-------------|--------|
| `/admin/dashboard` | AdminDashboard | Tableau de bord avec statistiques | ✅ |
| `/admin/users` | AdminUsers | Gestion des utilisateurs | ✅ |
| `/admin/verification` | AdminArtisanVerification | Vérification des artisans | ✅ |
| `/admin/moderation` | AdminModeration | Modération de contenu | ✅ |
| `/admin/ateliers` | AdminAteliers | Gestion des ateliers | ⏳ |
| `/admin/services` | AdminServices | Gestion des services | ⏳ |
| `/admin/appointments` | AdminAppointments | Gestion des RDV | ⏳ |
| `/admin/reviews` | AdminReviews | Modération des avis | ⏳ |
| `/admin/settings` | AdminSettings | Paramètres système | ⏳ |

---

## 🧩 Composants Admin

### 1. AdminLayout.jsx ✅
**Rôle:** Layout principal avec sidebar
**Contenu:**
- Sidebar de navigation
- Zone de contenu principale (Outlet)
- Structure responsive

### 2. AdminSidebar.jsx ✅
**Rôle:** Navigation latérale
**Fonctionnalités:**
- Menu de navigation avec icônes
- Badges de notifications
- Profil admin
- Bouton déconnexion

### 3. AdminDashboard.jsx ✅
**Rôle:** Page d'accueil admin
**Affichage:**
- Statistiques globales (cartes)
- Alertes importantes
- Activité récente
- Services populaires

### 4. AdminUsers.jsx ✅
**Rôle:** Gestion des utilisateurs
**Fonctionnalités:**
- Liste paginée des utilisateurs
- Recherche et filtres (rôle, statut)
- Actions: Suspendre, Activer, Supprimer
- Statistiques rapides

### 5. AdminArtisanVerification.jsx ✅
**Rôle:** Vérification des artisans
**Fonctionnalités:**
- Liste des artisans en attente
- Détails du profil artisan
- Actions: Approuver, Refuser (avec motif)
- Notification à l'artisan

### 6. AdminModeration.jsx ✅
**Rôle:** Modération de contenu
**Fonctionnalités:**
- Liste des signalements
- Filtres par type et gravité
- Actions: Suspendre compte, Supprimer contenu
- Historique des sanctions

---

## 🔌 API Endpoints Backend

### Structure Laravel

```
back/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/
│   │   │   │   ├── DashboardController.php
│   │   │   │   ├── UserController.php
│   │   │   │   ├── ArtisanController.php
│   │   │   │   ├── ModerationController.php
│   │   │   │   ├── AtelierController.php
│   │   │   │   ├── ServiceController.php
│   │   │   │   └── SettingsController.php
│   │   │   └── Auth/
│   │   │       └── AdminAuthController.php
│   │   │
│   │   ├── Middleware/
│   │   │   ├── AdminMiddleware.php
│   │   │   └── RoleMiddleware.php
│   │   │
│   │   └── Requests/
│   │       └── Admin/
│   │           ├── UpdateUserRequest.php
│   │           ├── ApproveArtisanRequest.php
│   │           └── ModerationActionRequest.php
│   │
│   ├── Models/
│   │   ├── User.php
│   │   ├── Artisan.php
│   │   ├── Atelier.php
│   │   ├── Service.php
│   │   ├── RendezVous.php
│   │   ├── Avis.php
│   │   ├── Signalement.php
│   │   ├── Sanction.php
│   │   └── Notification.php
│   │
│   └── Services/
│       ├── StatsService.php
│       ├── ModerationService.php
│       └── NotificationService.php
│
└── routes/
    └── api.php
```

### Endpoints API

#### 🔐 Authentication
```
POST   /api/admin/login           # Connexion admin
POST   /api/admin/logout          # Déconnexion
GET    /api/admin/me              # Profil admin actuel
```

#### 📊 Dashboard
```
GET    /api/admin/stats           # Statistiques globales
GET    /api/admin/stats/users     # Stats utilisateurs
GET    /api/admin/stats/services  # Stats services
GET    /api/admin/activity        # Activité récente
```

#### 👥 Utilisateurs
```
GET    /api/admin/users                    # Liste utilisateurs (pagination, filtres)
GET    /api/admin/users/:id                # Détails utilisateur
PUT    /api/admin/users/:id                # Modifier utilisateur
PUT    /api/admin/users/:id/status         # Changer statut (ACTIF/SUSPENDU)
DELETE /api/admin/users/:id                # Supprimer utilisateur
GET    /api/admin/users/:id/history        # Historique utilisateur
```

#### 🔨 Artisans
```
GET    /api/admin/artisans/pending         # Artisans en attente
GET    /api/admin/artisans/:id             # Détails artisan
PUT    /api/admin/artisans/:id/approve     # Approuver artisan
PUT    /api/admin/artisans/:id/reject      # Refuser artisan (avec motif)
```

#### 🛡️ Modération
```
GET    /api/admin/signalements             # Liste signalements
GET    /api/admin/signalements/:id         # Détails signalement
PUT    /api/admin/signalements/:id/resolve # Résoudre signalement
POST   /api/admin/sanctions                # Appliquer sanction
GET    /api/admin/sanctions                # Liste sanctions actives
GET    /api/admin/sanctions/:userId        # Sanctions d'un utilisateur
DELETE /api/admin/content/:type/:id        # Supprimer contenu
```

#### 🏪 Ateliers
```
GET    /api/admin/ateliers                 # Liste ateliers
GET    /api/admin/ateliers/:id             # Détails atelier
PUT    /api/admin/ateliers/:id/status      # Changer statut atelier
DELETE /api/admin/ateliers/:id             # Supprimer atelier
```

#### 💼 Services
```
GET    /api/admin/services                 # Liste services
GET    /api/admin/services/:id             # Détails service
PUT    /api/admin/services/:id/status      # Changer statut service
```

#### 📅 Rendez-vous
```
GET    /api/admin/appointments             # Liste RDV
GET    /api/admin/appointments/:id         # Détails RDV
```

#### ⭐ Avis
```
GET    /api/admin/reviews                  # Liste avis
GET    /api/admin/reviews/:id              # Détails avis
PUT    /api/admin/reviews/:id/visibility   # Masquer/Afficher avis
DELETE /api/admin/reviews/:id              # Supprimer avis
```

#### ⚙️ Paramètres
```
GET    /api/admin/settings                 # Paramètres système
PUT    /api/admin/settings                 # Mettre à jour paramètres
```

---

## 🗄️ Base de données Admin

### Tables principales

#### users
```sql
- id, role, nom, prenom, email, password
- photo_profil, status, created_at, updated_at
- Rôles: CLIENT, ARTISAN, ADMIN
- Status: ACTIF, INACTIF, SUSPENDU
```

#### artisans
```sql
- id, user_id, telephone, specialite
- experience_annees, certification
- status_verification (EN_ATTENTE, VERIFIE, REJETE)
```

#### ateliers
```sql
- id, artisan_id, nom, description
- image_principale, adresse, ville
- domaine, note_moyenne, status
```

#### signalements
```sql
- id, type, reported_user_id, reporter_id
- content_type, content_id, description
- status (PENDING, RESOLVED, REJECTED)
- severity (LOW, MEDIUM, HIGH, CRITICAL)
```

#### sanctions
```sql
- id, user_id, signalement_id
- type, motif, duree_jours
- date_debut, date_fin, is_active
```

### Vues SQL créées

```sql
v_statistiques_globales      # Stats pour dashboard
v_artisans_en_attente        # Artisans à vérifier
v_users_actifs               # Utilisateurs actifs
v_signalements_en_attente    # Signalements non traités
v_sanctions_actives          # Sanctions en cours
```

---

## 🔄 Flux de données Admin

### 1. Connexion Admin
```
Frontend                Backend                    Database
   |                       |                          |
   |-- POST /login ------->|                          |
   |                       |-- Vérif credentials ---->|
   |                       |<-- User data ------------|
   |<-- JWT Token ---------|                          |
   |                       |                          |
   |-- Store Token         |                          |
   |-- Redirect /admin     |                          |
```

### 2. Affichage Dashboard
```
Frontend                Backend                    Database
   |                       |                          |
   |-- GET /stats -------->|                          |
   |   (JWT Header)        |-- Query stats ---------->|
   |                       |<-- Stats data ----------|
   |<-- Stats JSON --------|                          |
   |                       |                          |
   |-- Render Dashboard    |                          |
```

### 3. Vérification Artisan
```
Frontend                Backend                    Database
   |                       |                          |
   |-- GET /artisans/ ---->|                          |
   |   pending             |-- Query pending -------->|
   |<-- List ---------------|<-- Artisans data -------|
   |                       |                          |
   |-- Click Approve       |                          |
   |-- PUT /artisans/:id-->|                          |
   |   /approve            |-- UPDATE status -------->|
   |                       |-- Create notification -->|
   |<-- Success -----------|                          |
   |                       |                          |
   |-- Refresh list        |                          |
```

### 4. Modération de contenu
```
Frontend                Backend                    Database
   |                       |                          |
   |-- GET /signalements-->|                          |
   |<-- List --------------|<-- Signalements --------|
   |                       |                          |
   |-- Click Suspend       |                          |
   |-- POST /sanctions --->|                          |
   |   {userId, motif}     |-- INSERT sanction ------>|
   |                       |-- UPDATE user status --->|
   |                       |-- Create notification -->|
   |<-- Success -----------|                          |
```

---

## 🔒 Sécurité Admin

### 1. Authentification
- **JWT Tokens** avec expiration
- **Refresh tokens** pour renouvellement
- **Password hashing** avec bcrypt
- **2FA** recommandé pour admins

### 2. Autorisation
```php
// Middleware Laravel
Route::middleware(['auth:api', 'role:admin'])->group(function () {
    Route::prefix('admin')->group(function () {
        // Routes admin
    });
});
```

### 3. Validation des données
- **Form Request Validation** Laravel
- **Sanitization** des entrées utilisateur
- **CSRF Protection** sur toutes les mutations

### 4. Protection des routes Frontend
```jsx
// ProtectedRoute.jsx
function ProtectedRoute({ children, allowedRoles }) {
  const user = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;
  
  return children;
}
```

### 5. Rate Limiting
```php
// Laravel: config/api.php
'throttle:60,1'  // 60 requêtes par minute
```

### 6. Logs et Audit
- **Logs de connexion** admin
- **Logs des actions** (sanctions, suppressions)
- **Historique des modifications**
- **IP tracking**

---

## 📦 Services à créer (Frontend)

### api.js
```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour JWT
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
```

### statsService.js
```javascript
import API from './api';

export const statsService = {
  getGlobalStats: () => API.get('/admin/stats'),
  getUserStats: () => API.get('/admin/stats/users'),
  getServiceStats: () => API.get('/admin/stats/services'),
};
```

### moderationService.js
```javascript
import API from './api';

export const moderationService = {
  getSignalements: (filters) => API.get('/admin/signalements', { params: filters }),
  resolveSignalement: (id, data) => API.put(`/admin/signalements/${id}/resolve`, data),
  applySanction: (data) => API.post('/admin/sanctions', data),
  deleteContent: (type, id) => API.delete(`/admin/content/${type}/${id}`),
};
```

---

## 🎯 Checklist d'implémentation

### Phase 1: Base ✅
- [x] Structure des dossiers Admin
- [x] AdminLayout avec Sidebar
- [x] Système de routing
- [x] Script SQL complet

### Phase 2: Pages principales ✅
- [x] AdminDashboard
- [x] AdminUsers
- [x] AdminArtisanVerification
- [x] AdminModeration

### Phase 3: Backend (À faire) ⏳
- [ ] Setup Laravel
- [ ] Models & Migrations
- [ ] Controllers Admin
- [ ] Middleware & Authentication
- [ ] API Routes

### Phase 4: Intégration (À faire) ⏳
- [ ] Services API Frontend
- [ ] Connexion Frontend-Backend
- [ ] Gestion des erreurs
- [ ] Loading states

### Phase 5: Pages restantes (À faire) ⏳
- [ ] AdminAteliers
- [ ] AdminServices
- [ ] AdminAppointments
- [ ] AdminReviews
- [ ] AdminSettings

### Phase 6: Finalisation (À faire) ⏳
- [ ] Tests
- [ ] Documentation API
- [ ] Déploiement
- [ ] Monitoring

---

## 📚 Documentation complémentaire

- **ADMIN_DOCUMENTATION.md** - Guide d'utilisation admin
- **GUIDE_MODERATION.md** - Processus de modération
- **DigitalArt_database.sql** - Structure complète BDD

