// Controladores de gatos guardados. Los conecta routes/savedCats.ts.
// Toda consulta se filtra por el dueño que viene del token, nunca por datos del cliente.
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { MESSAGES } from '../config/messages';
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors/httpErrors';
import { SavedCat, type ISavedCat } from '../models/savedCat';
import { createSavedCatSchema } from '../schemas/savedCat';
import { getAuthUserId } from '../utils/authUser';
import { parseBody } from '../utils/parseBody';

type SavedCatSource = Pick<ISavedCat, 'breedId' | 'breedName' | 'imageUrl' | 'note'> & {
  _id: mongoose.Types.ObjectId;
};

// Solo se envían los campos que el cliente necesita; el dueño no se expone.
function toResponse(savedCat: SavedCatSource) {
  return {
    _id: savedCat._id,
    breedId: savedCat.breedId,
    breedName: savedCat.breedName,
    imageUrl: savedCat.imageUrl,
    note: savedCat.note,
  };
}

export async function getSavedCats(req: Request, res: Response): Promise<void> {
  const owner = getAuthUserId(req);

  const savedCats = await SavedCat.find({ owner }).sort({ createdAt: -1 }).lean();

  res.status(200).json(savedCats.map(toResponse));
}

export async function createSavedCat(req: Request, res: Response): Promise<void> {
  const data = parseBody(createSavedCatSchema, req.body);
  const owner = new mongoose.Types.ObjectId(getAuthUserId(req));

  // Si la raza ya está guardada, el índice único (owner, breedId) lanza un error que se convierte en 409.
  const savedCat = await SavedCat.create({ ...data, owner });

  res.status(201).json(toResponse(savedCat));
}

export async function deleteSavedCat(req: Request<{ id: string }>, res: Response): Promise<void> {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new BadRequestError(MESSAGES.INVALID_ID);
  }

  const savedCat = await SavedCat.findById(id);

  if (!savedCat) {
    throw new NotFoundError(MESSAGES.SAVED_CAT_NOT_FOUND);
  }

  if (savedCat.owner.toString() !== getAuthUserId(req)) {
    throw new ForbiddenError(MESSAGES.SAVED_CAT_FORBIDDEN);
  }

  await savedCat.deleteOne();

  res.status(200).json(toResponse(savedCat));
}