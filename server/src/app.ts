// Builds the Express application: middleware and routes. Kept separate from server.ts so it can be tested without opening a port.
import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

export default app;