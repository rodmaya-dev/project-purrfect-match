// Valida el cuerpo de una solicitud con un esquema de zod. Lo usan los controladores antes de tocar la base.
import type { ZodType } from 'zod';
import { MESSAGES } from '../config/messages';
import { BadRequestError } from '../errors/httpErrors';

export function parseBody<T>(schema: ZodType<T>, body: unknown): T {
  const result = schema.safeParse(body ?? {});

  if (!result.success) {
    throw new BadRequestError(result.error.issues[0]?.message ?? MESSAGES.VALIDATION_FAILED);
  }

  return result.data;
}