// Punto único de entrada de las rutas. app.ts monta este router; cada recurso agrega su archivo aquí.
// Las rutas públicas van sin middleware; cada grupo protegido pasa por requireAuth.
import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import authRouter from './auth';
import healthRouter from './health';
import usersRouter from './users';

const router = Router();

router.use(healthRouter);
router.use(authRouter);
router.use('/users', requireAuth, usersRouter);

export default router;