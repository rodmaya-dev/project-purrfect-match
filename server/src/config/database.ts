// Conexión a MongoDB Atlas con Mongoose. La llama server.ts antes de abrir el puerto.
import dns from 'node:dns';
import mongoose from 'mongoose';
import { env } from './env';
import {
  DB_MAX_POOL_SIZE,
  DB_SERVER_SELECTION_TIMEOUT_MS,
  DEV_DNS_SERVERS,
} from './constants';

export async function connectDatabase(): Promise<void> {
  // En desarrollo, algunas redes bloquean la resolución SRV de Atlas; se usan los DNS de Google.
  if (env.NODE_ENV === 'development') {
    dns.setServers(DEV_DNS_SERVERS);
  }

  mongoose.connection.on('error', (error) => {
    console.error('Error en la conexión a MongoDB:', error.message);
  });

  await mongoose.connect(env.MONGODB_URI, {
    maxPoolSize: DB_MAX_POOL_SIZE,
    serverSelectionTimeoutMS: DB_SERVER_SELECTION_TIMEOUT_MS,
  });

  console.log('Conectado a MongoDB');
}