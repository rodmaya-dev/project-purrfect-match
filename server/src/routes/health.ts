// Status route. Used by the hosting platform and by us to check the server is up.
// It never touches the database or the token, so it always answers the same way.
import { Router } from 'express';

const router = Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default router;