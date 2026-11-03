// Esquema de validación del cuerpo de POST /saved-cats. Lo usa el controlador de gatos guardados.
// El dueño no viene en el cuerpo: sale del token, así nadie puede crear registros a nombre de otra persona.
import { z } from 'zod';
import {
  BREED_FIELD_MAX_LENGTH,
  IMAGE_URL_MAX_LENGTH,
  NOTE_MAX_LENGTH,
} from '../config/constants';
import { MESSAGES } from '../config/messages';

export const createSavedCatSchema = z.object({
  breedId: z
    .string({ error: MESSAGES.BREED_ID_REQUIRED })
    .trim()
    .min(1, MESSAGES.BREED_ID_REQUIRED)
    .max(BREED_FIELD_MAX_LENGTH, MESSAGES.BREED_ID_TOO_LONG),
  breedName: z
    .string({ error: MESSAGES.BREED_NAME_REQUIRED })
    .trim()
    .min(1, MESSAGES.BREED_NAME_REQUIRED)
    .max(BREED_FIELD_MAX_LENGTH, MESSAGES.BREED_NAME_TOO_LONG),
  imageUrl: z
    .url({ protocol: /^https?$/, error: MESSAGES.IMAGE_URL_INVALID })
    .max(IMAGE_URL_MAX_LENGTH, MESSAGES.IMAGE_URL_INVALID)
    .optional(),
  // Una nota vacía se trata como si no hubiera nota.
  note: z
    .string()
    .trim()
    .max(NOTE_MAX_LENGTH, MESSAGES.NOTE_TOO_LONG)
    .transform((value) => value || undefined)
    .optional(),
});