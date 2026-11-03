import './StatusMessage.css';

interface StatusMessageProps {
  variant: 'loading' | 'empty' | 'error';
  message: string;
}

function StatusMessage({ variant, message }: StatusMessageProps) {
  return (
    <div
      className={`status-message status-message_${variant}`}
      // alert interrumpe al lector de pantalla (errores); status espera su turno.
      role={variant === 'error' ? 'alert' : 'status'}
    >
      {variant === 'loading' && (
        <span className="status-message__spinner" aria-hidden="true" />
      )}
      <p className="status-message__text">{message}</p>
    </div>
  );
}

export default StatusMessage;