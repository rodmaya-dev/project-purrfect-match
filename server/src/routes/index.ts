// Single entry point for all routes. app.ts mounts this router; each resource adds its own file here.
import { Router } from 'express';
import healthRouter from './health';

const router = Router();

router.use(healthRouter);

export default router;