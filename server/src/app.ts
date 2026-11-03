// Construye la aplicación Express: middleware y rutas.
// Está separada de server.ts para poder probarla sin abrir un puerto.
import cors from 'cors';
import express from 'express';
import { TRUSTED_PROXY_HOPS } from './config/constants';
import { env } from './config/env';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import routes from './routes';

const app = express();

// En producción la plataforma de despliegue está delante del servidor; sin esto, el limitador vería
// la misma IP para todas las personas. En desarrollo no hay proxy, y activarlo permitiría falsear la IP.
if (env.NODE_ENV === 'production') {
  app.set('trust proxy', TRUSTED_PROXY_HOPS);
}

// Antes de las rutas: las solicitudes de verificación previa (OPTIONS) del navegador no llevan token.
app.use(cors({ origin: env.CLIENT_ORIGIN }));
app.use(express.json());
app.use(routes);

// Deben ir al final: primero la ruta inexistente y después el manejador de errores.
app.use(notFoundHandler);
app.use(errorHandler);

export default app;