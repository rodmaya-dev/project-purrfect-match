// Punto único de entrada de las rutas. app.ts monta este router; cada recurso agrega su archivo aquí.
import { Router } from 'express';
import authRouter from './auth';
import healthRouter from './health';

const router = Router();

router.use(healthRouter);
router.use(authRouter);

export default router;