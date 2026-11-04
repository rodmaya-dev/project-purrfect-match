// Registro e inicio de sesión contra la API propia. Los llaman los formularios y el
// contexto de sesión. Reutilizan request() de utils/api.ts; sin token, porque
// todavía no hay sesión.

import type {
  CurrentUser,
  SignInPayload,
  SignInResponse,
  SignUpPayload,
} from '../types/auth';
import { request } from './api';

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