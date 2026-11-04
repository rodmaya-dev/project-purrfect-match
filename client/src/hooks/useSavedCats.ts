// Gatos guardados de la persona con sesión: los pide al abrir la página y
// permite eliminar uno. Lo llama SavedCats. Misma forma de estado que useBreeds.

import { useEffect, useState } from 'react';
import type { SavedCat } from '../types/savedCat';
import { deleteSavedCat, getSavedCats } from '../utils/api';

// cats solo existe cuando el estado es 'success'.
export type SavedCatsState =
  | { status: 'loading' }
  | { status: 'success'; cats: SavedCat[] }
  | { status: 'error' };

interface UseSavedCatsResult {
  state: SavedCatsState;
  // Lanza el error si el servidor falla; quien llama decide qué mostrar.
  removeCat: (id: string) => Promise<void>;
}

export function useSavedCats(): UseSavedCatsResult {
  const [state, setState] = useState<SavedCatsState>({ status: 'loading' });

  useEffect(() => {
    let isCancelled = false;

    getSavedCats()
      .then((cats) => {
        if (!isCancelled) {
          setState({ status: 'success', cats });
        }
      })
      .catch((error: unknown) => {
        if (!isCancelled) {
          console.error(error); // detalle técnico para programador
          setState({ status: 'error' });
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const removeCat = async (id: string): Promise<void> => {
    await deleteSavedCat(id);
    // Se quita de la lista local solo después de que el servidor lo confirma
    setState((previous) =>
      previous.status === 'success'
        ? {
            status: 'success',
            cats: previous.cats.filter((cat) => cat._id !== id),
          }
        : previous,
    );
  };

  return { state, removeCat };
}