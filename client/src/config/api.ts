// Configuración de la API propia (cuentas, sesión y gatos guardados), no de la
// API de terceros (The Cat API). La usan utils/api.ts, utils/token.ts,
// hooks/useSession.ts, y los componentes Register y SaveCatButton.

const rawApiUrl: string | undefined = import.meta.env.VITE_API_URL;

// Falla al arrancar y con un mensaje claro, en vez de lanzar peticiones a "undefined/signin"
if (!rawApiUrl) {
  throw new Error('VITE_API_URL is not defined. Check client/.env');
}

// Sin barra final, para concatenar rutas como "/signin"
export const API_URL = rawApiUrl.replace(/\/+$/, '');

export const TOKEN_STORAGE_KEY = 'token';

// Respuestas de GET /users/me con las que el token guardado se da por inservible:
// 401 (token inválido o caducado) y 404 (el usuario ya no existe)
export const REJECTED_SESSION_STATUSES: readonly number[] = [401, 404];

// Límites que los formularios copian de server/src/config/constants.ts para avisar
// antes de enviar; el servidor sigue siendo quien los hace cumplir.
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 30;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 72;
export const NOTE_MAX_LENGTH = 500;