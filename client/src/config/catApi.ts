export const CAT_API_BASE_URL = 'https://api.thecatapi.com/v1';
export const BREEDS_ENDPOINT = '/breeds';
export const CAT_API_KEY_HEADER = 'x-api-key';

// La API tiene 107 razas; con este límite llegan todas en una sola petición.
export const BREEDS_REQUEST_LIMIT = 200;

// Cuántas razas se muestran por tramo en la lista ("Cargar más").
// 12 es divisible entre 1, 2, 3 y 4 columnas: las filas siempre quedan completas.
export const BREEDS_PAGE_SIZE = 12;