// Generación y verificación del token de sesión. Lo usan el inicio de sesión y el middleware de autorización.
// El payload lleva solo el identificador del usuario y el token caduca.
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN_SECONDS } from '../config/constants';
import { env } from '../config/env';
import { MESSAGES } from '../config/messages';
import { UnauthorizedError } from '../errors/httpErrors';

const JWT_ALGORITHM = 'HS256';

export function signToken(userId: string): string {
  return jwt.sign({ _id: userId }, env.JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: JWT_EXPIRES_IN_SECONDS,
  });
}

export function verifyToken(token: string): string {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET, { algorithms: [JWT_ALGORITHM] });

    if (typeof payload === 'object' && typeof payload._id === 'string') {
      return payload._id;
    }
  } catch {
    // Firma inválida, token caducado o malformado: se trata igual que cualquier token inválido.
  }

  throw new UnauthorizedError(MESSAGES.INVALID_TOKEN);
}