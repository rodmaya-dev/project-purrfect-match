// Esquemas de validación del cuerpo de /signup y /signin. Los usa el controlador de autenticación.
import { z } from 'zod';
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../config/constants';
import { MESSAGES } from '../config/messages';

const emailField = z
  .string({ error: MESSAGES.EMAIL_REQUIRED })
  .trim()
  .toLowerCase()
  .pipe(z.email({ error: MESSAGES.EMAIL_INVALID }));

export const signupSchema = z.object({
  email: emailField,
  password: z
    .string({ error: MESSAGES.PASSWORD_REQUIRED })
    .min(PASSWORD_MIN_LENGTH, MESSAGES.PASSWORD_TOO_SHORT)
    .max(PASSWORD_MAX_LENGTH, MESSAGES.PASSWORD_TOO_LONG),
  name: z
    .string({ error: MESSAGES.NAME_REQUIRED })
    .trim()
    .min(NAME_MIN_LENGTH, MESSAGES.NAME_TOO_SHORT)
    .max(NAME_MAX_LENGTH, MESSAGES.NAME_TOO_LONG),
});

// En el inicio de sesión no se revelan las reglas de la contraseña: solo se exige que venga.
export const signinSchema = z.object({
  email: emailField,
  password: z.string({ error: MESSAGES.PASSWORD_REQUIRED }).min(1, MESSAGES.PASSWORD_REQUIRED),
});