// Tipos de usuario y autenticación de la API propia. Los usan utils/api.ts y
// utils/auth.ts, y después el contexto de sesión y los formularios.

export interface CurrentUser {
  _id: string;
  email: string;
  name: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  name: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}