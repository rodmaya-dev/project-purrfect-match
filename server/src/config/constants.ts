// Constantes de configuración del servidor. Se usan en config/database.ts y en los modelos.
export const DB_MAX_POOL_SIZE = 10;
export const DB_SERVER_SELECTION_TIMEOUT_MS = 10_000;
export const DEV_DNS_SERVERS = ['8.8.8.8', '8.8.4.4'];

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 30;
export const NOTE_MAX_LENGTH = 500;