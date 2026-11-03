// Rutas del recurso usuario. routes/index.ts las monta bajo /users y detrás del middleware de autorización.
import { Router } from 'express';
import { getCurrentUser } from '../controllers/users';

const router = Router();

router.get('/me', getCurrentUser);

export default router;