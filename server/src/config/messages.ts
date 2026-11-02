// Mensajes de error de validación del servidor. Los usan los modelos y los controladores.
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, NOTE_MAX_LENGTH } from './constants';

export const MESSAGES = {
  EMAIL_REQUIRED: 'El correo electrónico es obligatorio',
  EMAIL_INVALID: 'El correo electrónico no es válido',
  PASSWORD_REQUIRED: 'La contraseña es obligatoria',
  NAME_REQUIRED: 'El nombre es obligatorio',
  NAME_TOO_SHORT: `El nombre debe tener al menos ${NAME_MIN_LENGTH} caracteres`,
  NAME_TOO_LONG: `El nombre no puede superar los ${NAME_MAX_LENGTH} caracteres`,
  OWNER_REQUIRED: 'El dueño del registro es obligatorio',
  BREED_ID_REQUIRED: 'El id de la raza es obligatorio',
  BREED_NAME_REQUIRED: 'El nombre de la raza es obligatorio',
  NOTE_TOO_LONG: `La nota no puede superar los ${NOTE_MAX_LENGTH} caracteres`,
} as const;