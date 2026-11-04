// Estado de la sesión: la persona actual y la recuperación del token guardado
// al abrir la app. Lo llama App una sola vez y entrega el resultado al
// CurrentUserContext.Provider.

import { useEffect, useState } from 'react';
import { REJECTED_SESSION_STATUSES } from '../config/api';
import type { CurrentUserContextValue } from '../contexts/CurrentUserContext';
import type { CurrentUser } from '../types/auth';
import { ApiError, getCurrentUser } from '../utils/api';
import { getToken, removeToken } from '../utils/token';

export function useSession(): CurrentUserContextValue {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  // Sin token no hay nada que validar, así que arranca en false
  const [isCheckingSession, setIsCheckingSession] = useState<boolean>(
    () => getToken() !== null,
  );

  useEffect(() => {
    if (!getToken()) {
      return undefined;
    }

    let isCancelled = false;

    getCurrentUser()
      .then((user) => {
        if (!isCancelled) {
          setCurrentUser(user);
        }
      })
      .catch((error: unknown) => {
        // Si falla la red o el servidor, el token se conserva: puede seguir siendo válido
        if (
          error instanceof ApiError &&
          REJECTED_SESSION_STATUSES.includes(error.status)
        ) {
          removeToken();
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsCheckingSession(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return { currentUser, setCurrentUser, isCheckingSession };
}