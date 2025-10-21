"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Spinner } from '@/components/ui/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!loading && isAuthenticated && requiredRole && userRole !== requiredRole) {
      if (userRole === 'ADMIN') {
        router.push('/admin/dashboard');
      } else if (userRole === 'DOCENTE') {
        router.push('/docente/dashboard');
      } else {
        router.push('/aluno/dashboard');
      }
      return;
    }
  }, [isAuthenticated, loading, userRole, requiredRole, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Spinner className="w-8 h-8 text-white mx-auto mb-4" />
          <p className="text-white">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white">Redirecionando para login...</p>
        </div>
      </div>
    );
  }

  if (requiredRole && userRole !== requiredRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white">Acesso não autorizado...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}