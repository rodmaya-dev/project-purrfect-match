// Envuelve las rutas que exigen sesión. Sin sesión manda a /signin. App la usa
// en la ruta /saved.

import { useContext } from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, isCheckingSession } = useContext(CurrentUserContext);

  // Mientras se valida el token guardado todavía no se sabe si hay sesión
  if (isCheckingSession) {
    return null;
  }

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;