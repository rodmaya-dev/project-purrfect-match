// Controladores del recurso usuario. Los conecta routes/users.ts.
import type { Request, Response } from 'express';
import { MESSAGES } from '../config/messages';
import { NotFoundError } from '../errors/httpErrors';
import { User } from '../models/user';
import { getAuthUserId } from '../utils/authUser';

export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  const user = await User.findById(getAuthUserId(req));

  if (!user) {
    throw new NotFoundError(MESSAGES.USER_NOT_FOUND);
  }

  // Solo se envían los campos que el cliente necesita; nunca la contraseña ni su hash.
  res.status(200).json({ _id: user._id, email: user.email, name: user.name });
}