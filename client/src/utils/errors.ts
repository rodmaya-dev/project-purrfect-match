// Convierte cualquier error en un texto listo para mostrar. Lo usan los
// formularios. Los ApiError ya traen el mensaje del servidor.

import { MESSAGES } from '../config/messages';
import { ApiError } from './api';

export function getErrorMessage(error: unknown): string {
  return error instanceof ApiError ? error.message : MESSAGES.unexpectedError;
}