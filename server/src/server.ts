// Punto de entrada del proceso: conecta la base de datos y después abre el puerto.
import { env } from './config/env';
import { connectDatabase } from './config/database';
import app from './app';

async function start(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(env.PORT, () => {
      console.log(`Servidor escuchando en el puerto ${env.PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

void start();