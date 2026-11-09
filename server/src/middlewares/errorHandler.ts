// Manejo centralizado de errores. app.ts monta estos dos middlewares al final, después de las rutas.
// Nunca se devuelve la traza ni el error original de la base de datos: solo un mensaje seguro.
import type { ErrorRequestHandler, RequestHandler } from 'express';
import mongoose from 'mongoose';
import { MESSAGES } from '../config/messages';
import { AppError, NotFoundError } from '../errors/httpErrors';

interface NormalizedError {
  statusCode: number;
  message: string;
}

const DUPLICATE_KEY_CODE = 11000;

function hasProperty<K extends string>(value: unknown, key: K): value is Record<K, unknown> {
  return typeof value === 'object' && value !== null && key in value;
}

// El índice único que falló se identifica por sus campos (keyPattern) para dar un mensaje preciso.
function getDuplicateMessage(error: unknown): string {
  const keyPattern = hasProperty(error, 'keyPattern') ? error.keyPattern : undefined;

  if (hasProperty(keyPattern, 'email')) {
    return MESSAGES.EMAIL_TAKEN;
  }

  if (hasProperty(keyPattern, 'breedId')) {
    return MESSAGES.CAT_ALREADY_SAVED;
  }

  return MESSAGES.DUPLICATE_RECORD;
}

function normalizeError(error: unknown): NormalizedError {
  if (error instanceof AppError) {
    return { statusCode: error.statusCode, message: error.message };
  }

  if (error instanceof mongoose.Error.ValidationError) {
    const firstError = Object.values(error.errors)[0];
    return { statusCode: 400, message: firstError?.message ?? MESSAGES.VALIDATION_FAILED };
  }

  if (error instanceof mongoose.Error.CastError) {
    return { statusCode: 400, message: MESSAGES.INVALID_ID };
  }

  if (hasProperty(error, 'code') && error.code === DUPLICATE_KEY_CODE) {
    return { statusCode: 409, message: getDuplicateMessage(error) };
  }

  if (hasProperty(error, 'type') && error.type === 'entity.parse.failed') {
    return { statusCode: 400, message: MESSAGES.INVALID_JSON };
  }

  return { statusCode: 500, message: MESSAGES.INTERNAL_ERROR };
}

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(new NotFoundError(MESSAGES.ROUTE_NOT_FOUND));
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const { statusCode, message } = normalizeError(error);

  // El detalle de los errores inesperados queda solo en el registro del servidor.
  if (statusCode === 500) {
    console.error(error);
  }

  res.status(statusCode).json({ message });
};