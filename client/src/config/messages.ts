// Textos de la interfaz para los estados de la petición.
// Están aquí y no dentro de los componentes para poder cambiar el idioma
// en un solo lugar por si se requiere.
//
//   loading: 'Cargando...'
//   empty:   'No se encontró nada'
//   error:   'Algo salió mal con la solicitud. Puede ser un problema de conexión
//             o del servidor. Inténtalo de nuevo más tarde.'
export const MESSAGES = {
  loading: 'Loading breeds...',
  empty: 'No breeds found.',
  error:
    'Something went wrong with the request. It may be a connection or server problem. Please try again later.',
  loadMore: 'Load more',
  shownCount: (shown: number, total: number) =>
    `Showing ${shown} of ${total} breeds`,
  quizProgress: (current: number, total: number) =>
    `Question ${current} of ${total}`,
  quizNoPreference: 'No preference',
  quizBack: 'Back',
  quizNext: 'Next',
  quizFinish: 'See my matches',
  quizNeedAnswer: 'Answer at least one question to see your matches.',
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