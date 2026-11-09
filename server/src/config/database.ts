// Conexión a MongoDB Atlas con Mongoose. La llaman server.ts al arrancar y el middleware
// ensureDatabase en cada petición; la conexión se abre una sola vez por instancia.
import dns from 'node:dns';
import mongoose from 'mongoose';
import { env } from './env';
import {
  DB_MAX_POOL_SIZE,
  DB_SERVER_SELECTION_TIMEOUT_MS,
  DEV_DNS_SERVERS,
} from './constants';

mongoose.connection.on('error', (error) => {
  console.error('Error en la conexión a MongoDB:', error.message);
});

async function openConnection(): Promise<void> {
  // En desarrollo, algunas redes bloquean la resolución SRV de Atlas; se usan los DNS de Google.
  if (env.NODE_ENV === 'development') {
    dns.setServers(DEV_DNS_SERVERS);
  }

  await mongoose.connect(env.MONGODB_URI, {
    maxPoolSize: DB_MAX_POOL_SIZE,
    serverSelectionTimeoutMS: DB_SERVER_SELECTION_TIMEOUT_MS,
  });

  console.log('Conectado a MongoDB');
}

// En serverless la instancia se reutiliza entre peticiones: se conserva la promesa para no
// abrir una conexión por solicitud, y se descarta si falla para que la siguiente reintente.
let connectionPromise: Promise<void> | null = null;

export function connectDatabase(): Promise<void> {
  if (!connectionPromise) {
    connectionPromise = openConnection().catch((error: unknown) => {
      connectionPromise = null;
      throw error;
    });
  }
  return connectionPromise;
}