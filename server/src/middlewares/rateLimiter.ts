// Limitador de solicitudes para el registro y el inicio de sesión. Lo aplica routes/auth.ts.
// Un solo contador por dirección IP, compartido por las dos rutas; al superarlo responde 429.
import rateLimit from 'express-rate-limit';
import { AUTH_RATE_LIMIT_MAX_REQUESTS, AUTH_RATE_LIMIT_WINDOW_MS } from '../config/constants';
import { MESSAGES } from '../config/messages';
import { TooManyRequestsError } from '../errors/httpErrors';

export const authRateLimiter = rateLimit({
  windowMs: AUTH_RATE_LIMIT_WINDOW_MS,
  limit: AUTH_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  // Se delega al manejador central para que la respuesta tenga el mismo formato que el resto de errores.
  handler: (_req, _res, next) => {
    next(new TooManyRequestsError(MESSAGES.TOO_MANY_REQUESTS));
  },
});