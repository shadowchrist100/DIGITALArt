import { createContext, useState, useEffect, useRef } from 'react';
import { authAPI } from '../../../../services/api';

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const isRefreshing = useRef(false);

    useEffect(() => {
        const checkSession = async () => {
            if (isRefreshing.current) return;
            isRefreshing.current = true;

            try {
                // /api/refresh retourne déjà user + accessToken → pas besoin de rappeler /auth/me
                await refreshAccessToken();
            } catch {
                setUser(null);
                setAccessToken(null);
            } finally {
                setLoading(false);
                isRefreshing.current = false;
            }
        };

        checkSession();
    }, []);

    const refreshAccessToken = async () => {
        const response = await fetch("/api/refresh", {
            method: "GET",
            credentials: 'include',
            headers: { 'Accept': 'application/json' },
        });

        if (!response.ok) {
            const errorDetails = await response.json().catch(() => ({}));
            throw new Error(errorDetails.message || `Erreur serveur: ${response.status}`);
        }

        const data = await response.json();

        if (!data.user || !data.accessToken) {
            throw new Error("Réponse incomplète (user ou accessToken manquant)");
        }

        setUser(data.user);
        setAccessToken(data.accessToken);
    };

    const login = (userData, accessToken) => {
        setAccessToken(accessToken);
        setUser(userData);
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch {
            // Déconnexion côté client même si l'API échoue
        } finally {
            setUser(null);
            setAccessToken(null);
        }
    };

    const value = {
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        isClient: user?.role === 'CLIENT',
        isArtisan: user?.role === 'ARTISAN',
        isAdmin: user?.role === 'ADMIN',
    };

    if (loading) return null; // ou un spinner

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}