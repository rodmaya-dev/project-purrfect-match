// Configuración de mi API propia (cuentas, sesión y gatos guardados), no la de
// The Cat API. La usan utils/api.ts y utils/token.ts.

const rawApiUrl: string | undefined = import.meta.env.VITE_API_URL;

// Falla al arrancar y con un mensaje claro, en vez de lanzar peticiones a "undefined/signin"
if (!rawApiUrl) {
  throw new Error('VITE_API_URL is not defined. Check client/.env');
}

// Sin barra final, para concatenar rutas como "/signin"
export const API_URL = rawApiUrl.replace(/\/+$/, '');

export const TOKEN_STORAGE_KEY = 'token';