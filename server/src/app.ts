// Construye la aplicación Express: middleware y rutas.
// Está separada de server.ts para poder probarla sin abrir un puerto.
import express from 'express';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

// Deben ir al final: primero la ruta inexistente y después el manejador de errores.
app.use(notFoundHandler);
app.use(errorHandler);

export default app;