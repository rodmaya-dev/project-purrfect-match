// Rutas públicas de autenticación: registro e inicio de sesión. No requieren token, pero sí pasan por el limitador.
import { Router } from 'express';
import { signin, signup } from '../controllers/auth';
import { authRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.post('/signup', authRateLimiter, signup);
router.post('/signin', authRateLimiter, signin);

export default router;