import { useState, useEffect } from 'react';
import { User, LoginPayload } from '../../domain/types/auth.types';
import { authApi } from '../../infrastructure/api/authApi';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem('auth_user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials: LoginPayload) => {
        setLoading(true);
        setError(null);
        try {
            const data = await authApi.login(credentials);
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('auth_user', JSON.stringify(data.user));
            setUser(data.user);
            return true;
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        setUser(null);
    };

    return { user, loading, error, login, logout, isAuthenticated: !!user };
}
