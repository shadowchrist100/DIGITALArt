import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../../../../services/api';

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user,    setUser]    = useState(null);
    const [token,   setToken]   = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Au montage : si un token existe en localStorage, on recharge l'utilisateur
    useEffect(() => {
        const checkSession = async () => {
            // si un refresh est en cours on sort immediatement
            if (isRefreshing.current) return;
            isRefreshing.current = true;

            // on tente de renouveler l'access token de l'user avec le refresh token en cookie
            try {
                await refreshAccessToken();
            } catch (error) {
                setUser(null);
                setLoading(null);
                setLoading(false);
                return;
            }
            try {
                const data = await authAPI.me();   // GET /auth/me
                setUser(data.user ?? data);
                setToken(savedToken);
            } catch {
                // Token invalide ou expiré → on nettoie
                localStorage.removeItem('token');
                setUser(null);
                setToken(null);
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

    const refreshAccessToken = async () => {
        try {
            const response = await fetch("/api/refresh", {
                method: "GET",
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                const errorDetails = await response.json().catch(() => ({}));
                throw new Error(errorDetails.message || `Erreur serveur: ${response.status}`);
            }

            const data = await response.json();

            if (!data.user || !data.accessToken) {
                throw new Error("Réponse du serveur incomplète (user ou accessToken manquant)");
            }

            setUser(data.user);
            setAccessToken(data.accessToken);
        } catch (error) {
            console.error("Échec du rafraîchissement du token :", error.message);

            // Logique de déconnexion si le refresh échoue
            setUser(null);
            setAccessToken(null);

            throw error; // Permet au composant appelant de réagir
        }


    }

    const login = (userData, token) => {
        setAccessToken(token)
        setUser(userData);
    };

    /** Déconnexion */
    const logout = async () => {
        try {
            await authAPI.logout();   // POST /auth/logout
        } catch {
            // On déconnecte côté client même si l'API échoue
        } finally {
            localStorage.removeItem('token');
            setUser(null);
            setToken(null);
        }
    };

    const value = {
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        isClient:  user?.role === 'CLIENT',
        isArtisan: user?.role === 'ARTISAN',
        isAdmin:   user?.role === 'ADMIN',
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
