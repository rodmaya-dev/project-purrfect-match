// Modelo del gato guardado: una raza que una persona marcó, con nota opcional.
// Guarda nombre e imagen de la raza para listar sin volver a consultar The Cat API.
import { Schema, model, type Types } from 'mongoose';
import { NOTE_MAX_LENGTH } from '../config/constants';
import { MESSAGES } from '../config/messages';

export interface ISavedCat {
  owner: Types.ObjectId;
  breedId: string;
  breedName: string;
  imageUrl?: string;
  note?: string;
}

const savedCatSchema = new Schema<ISavedCat>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, MESSAGES.OWNER_REQUIRED],
    },
    breedId: {
      type: String,
      required: [true, MESSAGES.BREED_ID_REQUIRED],
      trim: true,
    },
    breedName: {
      type: String,
      required: [true, MESSAGES.BREED_NAME_REQUIRED],
      trim: true,
    },
    imageUrl: { type: String, trim: true },
    note: {
      type: String,
      trim: true,
      maxlength: [NOTE_MAX_LENGTH, MESSAGES.NOTE_TOO_LONG],
    },
  },
  { timestamps: true },
);

// Una persona no puede guardar la misma raza dos veces. Al repetirse responderemos 409.
savedCatSchema.index({ owner: 1, breedId: 1 }, { unique: true });

export const SavedCat = model<ISavedCat>('SavedCat', savedCatSchema);