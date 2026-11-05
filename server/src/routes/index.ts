// Punto único de entrada de las rutas. app.ts monta este router; cada recurso agrega su archivo aquí.
// /health va antes de ensureDatabase: responde sin base ni token. Las rutas públicas van sin
// requireAuth; cada grupo protegido pasa por él.
import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import { ensureDatabase } from '../middlewares/ensureDatabase';
import authRouter from './auth';
import healthRouter from './health';
import savedCatsRouter from './savedCats';
import usersRouter from './users';

const router = Router();

router.use(healthRouter);
router.use(ensureDatabase);
router.use(authRouter);
router.use('/users', requireAuth, usersRouter);
router.use('/saved-cats', requireAuth, savedCatsRouter);

export default router;