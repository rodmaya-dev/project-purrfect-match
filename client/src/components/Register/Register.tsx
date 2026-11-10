// Página /signup. Crea la cuenta y, si sale bien, inicia sesión sola. Si el
// registro funciona pero el inicio de sesión falla, la cuenta ya existe: se
// manda a /signin con un aviso.

import { useContext, useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../../config/api';
import { MESSAGES } from '../../config/messages';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { NoticeContext } from '../../contexts/NoticeContext';
import { signInAndLoadUser, signUp } from '../../utils/auth';
import { getErrorMessage } from '../../utils/errors';
import AuthForm from '../AuthForm/AuthForm';

interface RegisterValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const INITIAL_VALUES: RegisterValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function Register() {
  const { currentUser, setCurrentUser, isCheckingSession } =
    useContext(CurrentUserContext);
  const { showNotice } = useContext(NoticeContext);
  const navigate = useNavigate();
  const [values, setValues] = useState<RegisterValues>(INITIAL_VALUES);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      setErrorMessage(MESSAGES.authPasswordMismatch);
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    const email = values.email.trim();

    try {
      await signUp({ email, password: values.password, name: values.name.trim() });
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setIsSubmitting(false);
      return;
    }

    try {
      const user = await signInAndLoadUser({ email, password: values.password });
      showNotice(MESSAGES.noticeSignedUp(user.name));
      // Al haber sesión, el Navigate de abajo lleva a "/"
      setCurrentUser(user);
    } catch {
      navigate('/signin', {
        replace: true,
        state: { notice: MESSAGES.authAccountCreatedNotice },
      });
    }
  };

  if (isCheckingSession) {
    return null;
  }

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthForm
      title={MESSAGES.authSignUpTitle}
      submitLabel={
        isSubmitting ? MESSAGES.authSigningUp : MESSAGES.authSignUpSubmit
      }
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
      alternativeTo="/signin"
      alternativeLabel={MESSAGES.authGoToSignIn}
      onSubmit={handleSubmit}
    >
      <input
        className="auth-form__input"
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder={MESSAGES.authNamePlaceholder}
        aria-label={MESSAGES.authNamePlaceholder}
        autoComplete="name"
        minLength={NAME_MIN_LENGTH}
        maxLength={NAME_MAX_LENGTH}
        required
      />
      <input
        className="auth-form__input"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder={MESSAGES.authEmailPlaceholder}
        aria-label={MESSAGES.authEmailPlaceholder}
        autoComplete="email"
        required
      />
      <input
        className="auth-form__input"
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder={MESSAGES.authPasswordPlaceholder}
        aria-label={MESSAGES.authPasswordPlaceholder}
        autoComplete="new-password"
        minLength={PASSWORD_MIN_LENGTH}
        maxLength={PASSWORD_MAX_LENGTH}
        required
      />
      <input
        className="auth-form__input"
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        placeholder={MESSAGES.authConfirmPasswordPlaceholder}
        aria-label={MESSAGES.authConfirmPasswordPlaceholder}
        autoComplete="new-password"
        minLength={PASSWORD_MIN_LENGTH}
        maxLength={PASSWORD_MAX_LENGTH}
        required
      />
    </AuthForm>
  );
}

export default Register;