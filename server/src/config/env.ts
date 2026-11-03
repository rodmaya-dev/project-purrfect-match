// Lee y valida las variables de entorno una sola vez al arrancar.
// Lo importan server.ts y los módulos de configuración; si falta algo, el proceso termina.
import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3001),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGODB_URI: z
    .string()
    .min(1, 'MONGODB_URI es obligatoria')
    .refine((uri) => uri.startsWith('mongodb'), 'MONGODB_URI debe empezar con "mongodb"')
    .refine((uri) => !uri.includes('<'), 'MONGODB_URI aún tiene marcadores <...> sin reemplazar'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET debe tener al menos 32 caracteres'),
  // CORS compara el origen exacto (sin barra final ni ruta), por eso se reduce a new URL(...).origin.
  CLIENT_ORIGIN: z
    .url('CLIENT_ORIGIN debe ser una URL válida')
    .transform((value) => new URL(value).origin),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const details = result.error.issues
    .map((issue) => `- ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');
  console.error(`Configuración de entorno inválida:\n${details}`);
  process.exit(1);
}

export const env = result.data;