// Espera a que la base este conectda antes de las rutas que la usan. Lo monta routes/index.ts
// despues de /health. Si la conexion falla, el error llega al manejador de errores central.
import type { NextFunction, Request, Response } from 'express';
import { connectDatabase } from '../config/database';

export function ensureDatabase(_req: Request, _res: Response, next: NextFunction): void {
  connectDatabase().then(() => next(), next);
}