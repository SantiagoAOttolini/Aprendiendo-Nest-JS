"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Solo redirigir si la autenticación ya se ha inicializado y el usuario no está autenticado
    if (isInitialized && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isInitialized, router]);

  // No mostrar nada mientras se verifica la autenticación
  if (!isInitialized) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  // Si el usuario está autenticado, mostrar el contenido
  return isAuthenticated ? <>{children}</> : null;
}
