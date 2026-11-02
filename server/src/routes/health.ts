// Ruta de estado. La usan la plataforma de despliegue y nosotros para comprobar que el servidor vive.
// No toca la base de datos ni el token, así que siempre responde igual.
import { Router } from 'express';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default router;