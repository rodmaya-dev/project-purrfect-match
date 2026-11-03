import { useEffect, useState } from 'react';
import type { Breed } from '../types/breed';
import { fetchBreeds } from '../utils/catApi';

// breeds solo existe cuando el estado es 'success'.
export type BreedsState =
  | { status: 'loading' }
  | { status: 'success'; breeds: Breed[] }
  | { status: 'error' };

export function useBreeds(): BreedsState {
  const [state, setState] = useState<BreedsState>({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();

    fetchBreeds(controller.signal)
      .then((breeds) => setState({ status: 'success', breeds }))
      .catch((error: unknown) => {
        // Una cancelación es intencional (el componente se desmontó), no un fallo.
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.error(error); // detalle técnico para programador
        setState({ status: 'error' });
      });

    return () => controller.abort();
  }, []);

  return state;
}