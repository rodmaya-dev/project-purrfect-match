// Acceso al token guardado en localStorage. Lo usa utils/api.ts en cada
// petición, y más adelante el contexto de sesión al iniciar o cerrar sesión.

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