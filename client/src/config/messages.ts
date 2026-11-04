// Textos de la interfaz que dependen del estado de la aplicación: carga,
// error, listas, cuestionario, sesión y errores de la conexión con la API
// propia. Los usan components/Main, Quiz, QuizResults, BreedList, Header,
// AuthForm, Register y Login, y utils/api.ts y utils/errors.ts. Están aquí y
// no dentro de los componentes para poder cambiarlos fácilmente si se
// requiere. Las entradas que son funciones reciben los números que van dentro
// de la frase.

export const MESSAGES = {
  // Estados de la petición y lista de razas
  loading: 'Loading breeds...',
  empty: 'No breeds found.',
  error:
    'Something went wrong with the request. It may be a connection or server problem. Please try again later.',
  loadMore: 'Load more',
  shownCount: (shown: number, total: number) =>
    `Showing ${shown} of ${total} breeds`,

  // Errores de la API propia (cuando no hay una respuesta útil del servidor)
  networkError: 'Could not reach the server. Please try again.',
  unexpectedError: 'Something went wrong. Please try again.',

  // Encabezado según haya sesión o no
  headerSignIn: 'Sign in',
  headerSignOut: 'Sign out',
  headerSavedCats: 'My Cats',

  // Formularios de registro e inicio de sesión
  authSignUpTitle: 'Sign up',
  authSignInTitle: 'Sign in',
  authSignUpSubmit: 'Sign up',
  authSigningUp: 'Signing up...',
  authSignInSubmit: 'Sign in',
  authSigningIn: 'Signing in...',
  authNamePlaceholder: 'Name',
  authEmailPlaceholder: 'Email',
  authPasswordPlaceholder: 'Password',
  authConfirmPasswordPlaceholder: 'Confirm password',
  authOr: 'or',
  authGoToSignIn: 'Sign in',
  authGoToSignUp: 'Sign up',
  authPasswordMismatch: 'Passwords do not match.',
  authAccountCreatedNotice: 'Account created. Please sign in to continue.',

  // Cuestionario
  quizProgress: (current: number, total: number) =>
    `Question ${current} of ${total}`,
  quizNoPreference: 'No preference',
  quizBack: 'Back',
  quizNext: 'Next',
  quizFinish: 'See my matches',
  quizNeedAnswer: 'Answer at least one question to see your matches.',

  // Resultados del cuestionario
  quizSectionTitle: 'Find your match',
  quizResultsTitle: 'Your top matches',
  quizAffinity: (percent: number) => `${percent}% match`,
  quizMatchesCount: (shown: number, total: number) =>
    `Showing ${shown} of ${total} matches`,
  quizShowMore: 'Show more matches',
  quizRetake: 'Retake the quiz',
  quizNoMatches: 'No breed matched your answers. Try different options.',
  quizDisclaimer:
    'This result is a guide, not a diagnosis. Talk to a vet or a breeder before you decide.',
} as const;