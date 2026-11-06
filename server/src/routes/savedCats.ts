// Rutas de gatos guardados. routes/index.ts las monta bajo /saved-cats y detrás del middleware de autorización.
import { Router } from 'express';
import { createSavedCat, deleteSavedCat, getSavedCats } from '../controllers/savedCats';

const router = Router();

router.get('/', getSavedCats);
router.post('/', createSavedCat);
router.delete('/:id', deleteSavedCat);

export default router;