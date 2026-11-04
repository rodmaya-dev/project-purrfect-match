// Estado del aviso global: el aviso visible, su cierre automático y el valor
// que App entrega al NoticeContext.Provider.

import { useCallback, useEffect, useMemo, useState } from 'react';
import { NOTICE_DURATION_MS } from '../config/notice';
import type {
  NoticeContextValue,
  NoticeVariant,
} from '../contexts/NoticeContext';

export interface NoticeState {
  message: string;
  variant: NoticeVariant;
}

interface UseNoticeResult {
  notice: NoticeState | null;
  dismissNotice: () => void;
  contextValue: NoticeContextValue;
}

export function useNotice(): UseNoticeResult {
  const [notice, setNotice] = useState<NoticeState | null>(null);

  const showNotice = useCallback(
    (message: string, variant: NoticeVariant = 'success') => {
      setNotice({ message, variant });
    },
    [],
  );

  const dismissNotice = useCallback(() => setNotice(null), []);

  // Cada aviso nuevo es un objeto nuevo, así que reinicia el temporizador
  useEffect(() => {
    if (!notice) {
      return undefined;
    }

    const timeoutId = setTimeout(dismissNotice, NOTICE_DURATION_MS);
    return () => clearTimeout(timeoutId);
  }, [notice, dismissNotice]);

  const contextValue = useMemo(() => ({ showNotice }), [showNotice]);

  return { notice, dismissNotice, contextValue };
}