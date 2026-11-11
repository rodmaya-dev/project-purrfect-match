// Contexto global con la persona que tiene la sesión abierta. App lo inserta
// con CurrentUserContext.Provider; lo leen el encabezado, los formularios de
// registro e inicio de sesión, el botón de guardar y la ruta protegida.

import { createContext } from 'react';
import type { CurrentUser } from '../types/auth';

export interface CurrentUserContextValue {
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser | null) => void;
  // true mientras se valida el token guardado al abrir la app
  isCheckingSession: boolean;
}

// Valor por defecto: solo se usa si un componente se renderiza fuera del Provider
export const CurrentUserContext = createContext<CurrentUserContextValue>({
  currentUser: null,
  setCurrentUser: () => {},
  isCheckingSession: false,
});