// Página /signin. Inicia sesión, guarda el token y carga la persona en el
// contexto. Muestra el aviso que le envía Register si la cuenta se creó pero
// el inicio de sesión automático falló.

import { useContext, useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { MESSAGES } from '../../config/messages';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { NoticeContext } from '../../contexts/NoticeContext';
import { signInAndLoadUser } from '../../utils/auth';
import { getErrorMessage } from '../../utils/errors';
import AuthForm from '../AuthForm/AuthForm';

interface LoginValues {
  email: string;
  password: string;
}

interface LoginLocationState {
  notice?: string;
}

const INITIAL_VALUES: LoginValues = { email: '', password: '' };

function Login() {
  const { currentUser, setCurrentUser, isCheckingSession } =
    useContext(CurrentUserContext);
  const { showNotice } = useContext(NoticeContext);
  const location = useLocation();
  const notice = (location.state as LoginLocationState | null)?.notice;
  const [values, setValues] = useState<LoginValues>(INITIAL_VALUES);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const user = await signInAndLoadUser({
        email: values.email.trim(),
        password: values.password,
      });
      showNotice(MESSAGES.noticeSignedIn(user.name));
      // Al haber sesión, el Navigate de abajo lleva a "/"
      setCurrentUser(user);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setIsSubmitting(false);
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
      title={MESSAGES.authSignInTitle}
      submitLabel={
        isSubmitting ? MESSAGES.authSigningIn : MESSAGES.authSignInSubmit
      }
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
      notice={notice}
      alternativeTo="/signup"
      alternativeLabel={MESSAGES.authGoToSignUp}
      onSubmit={handleSubmit}
    >
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
        autoComplete="current-password"
        required
      />
    </AuthForm>
  );
}

export default Login;