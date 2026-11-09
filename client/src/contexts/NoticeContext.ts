// Contexto del aviso global. App lo inserta con NoticeContext.Provider; lo
// leen SaveCatButton y SavedCats para avisar del resultado de una acción.

import { createContext } from 'react';

export type NoticeVariant = 'success' | 'info' | 'error';

export interface NoticeContextValue {
  showNotice: (message: string, variant?: NoticeVariant) => void;
}

// Valor por defecto: solo se usa si un componente se renderiza fuera del Provider
export const NoticeContext = createContext<NoticeContextValue>({
  showNotice: () => {},
});