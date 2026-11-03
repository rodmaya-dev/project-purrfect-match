/**
 * Acceso a The Cat API (servicio third-party).
 *
 * Flujo de los datos:
 *   The Cat API  ->  fetchBreeds()  ->  cleanBreeds()  ->  Breed[]  ->  interfaz
 *   (CatApiBreed[], crudo)             (catApiCleaner.ts)  (limpio)
 *
 * Los componentes solo conocen `Breed`. Los datos crudos (`CatApiBreed`)
 * no salen de este módulo ni de catApiCleaner.ts.
 *
 * Se pide todo en una sola petición porque el cuestionario necesita las
 * 100 razas a la vez. Límite del plan gratuito: 120 solicitudes por minuto.
 */
import {
  BREEDS_ENDPOINT,
  BREEDS_REQUEST_LIMIT,
  CAT_API_BASE_URL,
  CAT_API_KEY_HEADER,
} from '../config/catApi';
import type { Breed } from '../types/breed';
import type { CatApiBreed } from '../types/catApi';
import { cleanBreeds } from './catApiCleaner';

// Vite solo expone al navegador las variables que empiezan con VITE_.
// La clave queda visible en el bundle final: usar solo claves gratuitas.
const API_KEY = import.meta.env.VITE_CAT_API_KEY as string | undefined;

export async function fetchBreeds(signal?: AbortSignal): Promise<Breed[]> {
  if (!API_KEY) {
    throw new Error('Missing VITE_CAT_API_KEY. Check client/.env');
  }

  const url = `${CAT_API_BASE_URL}${BREEDS_ENDPOINT}?limit=${BREEDS_REQUEST_LIMIT}`;
  const response = await fetch(url, {
    headers: { [CAT_API_KEY_HEADER]: API_KEY },
    signal, // permite cancelar la petición si el componente se desmonta
  });

  // fetch() solo rechaza la promesa por fallos de red; un 401 o un 500
  // llegan como respuesta normal, por eso se revisa el estado a mano.
  if (!response.ok) {
    throw new Error(`The Cat API responded with status ${response.status}`);
  }

  // `unknown` obliga a validar antes de usar lo que llega de fuera.
  const rawBreeds: unknown = await response.json();
  if (!Array.isArray(rawBreeds)) {
    throw new Error('Unexpected response from The Cat API');
  }

  return cleanBreeds(rawBreeds as CatApiBreed[]);
}