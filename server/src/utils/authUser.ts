// Devuelve el id del usuario autenticado dentro de un controlador protegido.
// Mantiene el tipado estricto: req.user es opcional, y esta función lo garantiza.
import type { Request } from 'express';
import { MESSAGES } from '../config/messages';
import { UnauthorizedError } from '../errors/httpErrors';

export function getAuthUserId(req: Request): string {
  const userId = req.user?._id;

  if (!userId) {
    throw new UnauthorizedError(MESSAGES.AUTH_REQUIRED);
  }

  return userId;
}