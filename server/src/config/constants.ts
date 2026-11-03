// Constantes de configuración del servidor. Se usan en config/database.ts, los modelos, los esquemas, la autenticación y app.ts.
export const DB_MAX_POOL_SIZE = 10;
export const DB_SERVER_SELECTION_TIMEOUT_MS = 10_000;
export const DEV_DNS_SERVERS = ['8.8.8.8', '8.8.4.4'];

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 30;
export const NOTE_MAX_LENGTH = 500;
export const BREED_FIELD_MAX_LENGTH = 100;
export const IMAGE_URL_MAX_LENGTH = 2048;

export const PASSWORD_MIN_LENGTH = 8;
// bcrypt solo procesa los primeros 72 bytes; más allá se ignora.
export const PASSWORD_MAX_LENGTH = 72;
export const BCRYPT_SALT_ROUNDS = 10;
export const JWT_EXPIRES_IN_SECONDS = 7 * 24 * 60 * 60;

export const AUTH_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const AUTH_RATE_LIMIT_MAX_REQUESTS = 10;
// Número de proxies de la plataforma de despliegue delante del servidor.
export const TRUSTED_PROXY_HOPS = 1;