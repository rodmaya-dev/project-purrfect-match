// Tarjeta de formulario compartida por Register y Login: título, aviso, campos
// (children), error sobre el botón y enlace a la otra página.

import type { ReactNode, SubmitEvent } from 'react';
import { Link } from 'react-router-dom';
import { MESSAGES } from '../../config/messages';
import Button from '../Button/Button';
import './AuthForm.css';

interface AuthFormProps {
  title: string;
  submitLabel: string;
  isSubmitting: boolean;
  errorMessage: string;
  notice?: string;
  alternativeTo: string;
  alternativeLabel: string;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

function AuthForm({
  title,
  submitLabel,
  isSubmitting,
  errorMessage,
  notice,
  alternativeTo,
  alternativeLabel,
  onSubmit,
  children,
}: AuthFormProps) {
  return (
    <main className="auth-page">
      <section className="auth-form">
        <h1 className="auth-form__title">{title}</h1>
        {notice && (
          <p className="auth-form__notice" role="status">
            {notice}
          </p>
        )}
        <form className="auth-form__form" onSubmit={onSubmit}>
          <div className="auth-form__fields">{children}</div>
          {errorMessage && (
            <p className="auth-form__error" role="alert">
              {errorMessage}
            </p>
          )}
          <div className="auth-form__actions">
            <Button type="submit" disabled={isSubmitting}>
              {submitLabel}
            </Button>
            <p className="auth-form__alternative">
              {MESSAGES.authOr}{' '}
              <Link to={alternativeTo} className="auth-form__link">
                {alternativeLabel}
              </Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AuthForm;