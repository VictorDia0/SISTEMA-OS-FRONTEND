"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface AuthContextType {
    isAuthenticated: boolean;
    userRole: string | null;
    login: (token: string, role: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        console.log('🔐 Verificando autenticação:', { token: !!token, role });

        if (token && role) {
            setIsAuthenticated(true);
            setUserRole(role);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            setIsAuthenticated(false);
            setUserRole(null);
        }

        setLoading(false);
    };

    const login = (token: string, role: string) => {
        console.log('🔑 Fazendo login:', { token: !!token, role });

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setIsAuthenticated(true);
        setUserRole(role);

        console.log('✅ Login realizado com sucesso');
    };

    const logout = () => {
        console.log('🚪 Fazendo logout');

        localStorage.removeItem('token');
        localStorage.removeItem('role');

        delete api.defaults.headers.common['Authorization'];

        setIsAuthenticated(false);
        setUserRole(null);

        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            userRole,
            login,
            logout,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}