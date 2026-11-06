// Capa de peticiones a la API propia: la función central request() y las
// llamadas que necesitan sesión (perfil y gatos guardados). El registro y el
// inicio de sesión viven en utils/auth.ts. Las peticiones a The Cat API
// siguen en utils/catApi.ts.

import { API_URL } from '../config/api';
import { MESSAGES } from '../config/messages';
import type { CurrentUser } from '../types/auth';
import type { SavedCat, SaveCatPayload } from '../types/savedCat';
import { getToken } from './token';

// Error con el código HTTP y el texto que devuelve el servidor, listo para mostrarse
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'DELETE';
  body?: unknown;
  authorized?: boolean;
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const data: unknown = await response.json();
    if (
      typeof data === 'object' &&
      data !== null &&
      'message' in data &&
      typeof data.message === 'string'
    ) {
      return data.message;
    }
  } catch {
    // La respuesta no era JSON: se usa el mensaje genérico
  }
  return MESSAGES.unexpectedError;
}

export async function request<T>(
  path: string,
  { method = 'GET', body, authorized = true }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {};

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  // El token se lee aquí, en cada petición, para que cerrar sesión surta efecto de inmediato
  if (authorized) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, MESSAGES.networkError);
  }

  if (!response.ok) {
    throw new ApiError(response.status, await readErrorMessage(response));
  }

  return (await response.json()) as T;
}

export function getCurrentUser(): Promise<CurrentUser> {
  return request<CurrentUser>('/users/me');
}

export function getSavedCats(): Promise<SavedCat[]> {
  return request<SavedCat[]>('/saved-cats');
}

export function saveCat(payload: SaveCatPayload): Promise<SavedCat> {
  return request<SavedCat>('/saved-cats', { method: 'POST', body: payload });
}

export function deleteSavedCat(id: string): Promise<SavedCat> {
  return request<SavedCat>(`/saved-cats/${id}`, { method: 'DELETE' });
}