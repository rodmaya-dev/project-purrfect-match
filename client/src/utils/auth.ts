// Registro e inicio de sesión contra la API propia. Los llaman Register y
// Login. Reutilizan request() de utils/api.ts; sin token, porque todavía no
// hay sesión.

import type {
  CurrentUser,
  SignInPayload,
  SignInResponse,
  SignUpPayload,
} from '../types/auth';
import { getCurrentUser, request } from './api';
import { removeToken, setToken } from './token';

export function signUp(payload: SignUpPayload): Promise<CurrentUser> {
  return request<CurrentUser>('/signup', {
    method: 'POST',
    body: payload,
    authorized: false,
  });
}

export function signIn(payload: SignInPayload): Promise<SignInResponse> {
  return request<SignInResponse>('/signin', {
    method: 'POST',
    body: payload,
    authorized: false,
  });
}

// Inicia sesión, guarda el token y devuelve la persona. Si no se puede cargar
// el perfil, borra el token para no dejar una sesión a medias.
export async function signInAndLoadUser(
  payload: SignInPayload,
): Promise<CurrentUser> {
  const { token } = await signIn(payload);
  setToken(token);

  try {
    return await getCurrentUser();
  } catch (error) {
    removeToken();
    throw error;
  }
}