// Construye la aplicación Express: middleware y rutas.
// Está separada de server.ts para poder probarla sin abrir un puerto.
import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

export default app;