// Textos de la interfaz que dependen del estado de la aplicación: carga,
// error, listas y cuestionario. Los usan components/Main, Quiz, QuizResults
// y BreedList. Están aquí y no dentro de los componentes para poder cambiarlos
// facilimemte si se requiere. Las entradas que son funciones reciben los
// números que van dentro de la frase.

export const MESSAGES = {
  // Estados de la petición y lista de razas
  loading: 'Loading breeds...',
  empty: 'No breeds found.',
  error:
    'Something went wrong with the request. It may be a connection or server problem. Please try again later.',
  loadMore: 'Load more',
  shownCount: (shown: number, total: number) =>
    `Showing ${shown} of ${total} breeds`,

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