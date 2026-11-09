// Aviso global del resultado de una acción (guardado, eliminado, error). App
// lo renderiza una sola vez. La región con aria-live existe siempre, para que
// los lectores de pantalla anuncien el texto cuando aparece.

import { MESSAGES } from '../../config/messages';
import type { NoticeState } from '../../hooks/useNotice';
import './Notice.css';

interface NoticeProps {
  notice: NoticeState | null;
  onClose: () => void;
}

function Notice({ notice, onClose }: NoticeProps) {
  return (
    <div className="notice-region" role="status" aria-live="polite">
      {notice && (
        <div className={`notice notice_${notice.variant}`}>
          <p className="notice__text">{notice.message}</p>
          <button
            type="button"
            className="notice__close"
            aria-label={MESSAGES.noticeClose}
            onClick={onClose}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default Notice;