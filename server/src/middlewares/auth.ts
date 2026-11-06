// Middleware de autorización: exige un JWT válido en el encabezado Authorization (Bearer).
// Se aplica a cada grupo de rutas protegidas en routes/index.ts; deja el id del usuario en req.user.
import type { RequestHandler } from 'express';
import { MESSAGES } from '../config/messages';
import { UnauthorizedError } from '../errors/httpErrors';
import { verifyToken } from '../utils/jwt';

export const requireAuth: RequestHandler = (req, _res, next) => {
  const [scheme, token] = (req.headers.authorization ?? '').split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new UnauthorizedError(MESSAGES.AUTH_REQUIRED);
  }

  req.user = { _id: verifyToken(token) };
  next();
};