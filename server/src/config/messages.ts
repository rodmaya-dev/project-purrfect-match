// Mensajes de error del servidor. Los usan los modelos, los esquemas de validación y el manejador de errores.
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NOTE_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from './constants';

export const MESSAGES = {
  EMAIL_REQUIRED: 'El correo electrónico es obligatorio',
  EMAIL_INVALID: 'El correo electrónico no es válido',
  EMAIL_TAKEN: 'Ya existe una cuenta con ese correo electrónico',
  PASSWORD_REQUIRED: 'La contraseña es obligatoria',
  PASSWORD_TOO_SHORT: `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`,
  PASSWORD_TOO_LONG: `La contraseña no puede superar los ${PASSWORD_MAX_LENGTH} caracteres`,
  NAME_REQUIRED: 'El nombre es obligatorio',
  NAME_TOO_SHORT: `El nombre debe tener al menos ${NAME_MIN_LENGTH} caracteres`,
  NAME_TOO_LONG: `El nombre no puede superar los ${NAME_MAX_LENGTH} caracteres`,
  OWNER_REQUIRED: 'El dueño del registro es obligatorio',
  BREED_ID_REQUIRED: 'El id de la raza es obligatorio',
  BREED_NAME_REQUIRED: 'El nombre de la raza es obligatorio',
  NOTE_TOO_LONG: `La nota no puede superar los ${NOTE_MAX_LENGTH} caracteres`,
  INVALID_CREDENTIALS: 'Correo electrónico o contraseña incorrectos',
  VALIDATION_FAILED: 'Los datos enviados no son válidos',
  INVALID_JSON: 'El cuerpo de la solicitud no es un JSON válido',
  INVALID_ID: 'El identificador no tiene un formato válido',
  DUPLICATE_RECORD: 'El registro ya existe',
  ROUTE_NOT_FOUND: 'La ruta solicitada no existe',
  INTERNAL_ERROR: 'Ocurrió un error en el servidor',
} as const;