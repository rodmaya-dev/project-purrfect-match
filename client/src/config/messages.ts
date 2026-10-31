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
} as const;