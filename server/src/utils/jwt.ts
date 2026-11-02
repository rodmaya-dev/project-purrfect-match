// Generación del token de sesión. Lo usa el controlador de inicio de sesión.
// El payload lleva solo el identificador del usuario y el token caduca.
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN_SECONDS } from '../config/constants';
import { env } from '../config/env';

export function signToken(userId: string): string {
  return jwt.sign({ _id: userId }, env.JWT_SECRET, { expiresIn: JWT_EXPIRES_IN_SECONDS });
}