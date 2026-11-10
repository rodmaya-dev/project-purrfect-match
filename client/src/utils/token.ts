// Acceso al token guardado en localStorage. Lo usan utils/api.ts en cada
// petición, utils/auth.ts al iniciar sesión, hooks/useSession.ts al recuperarla
// y el Header al cerrarla.

import { TOKEN_STORAGE_KEY } from '../config/api';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}