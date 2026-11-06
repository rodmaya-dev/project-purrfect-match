// Controladores de registro e inicio de sesión. Los conecta routes/auth.ts.
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { BCRYPT_SALT_ROUNDS } from '../config/constants';
import { MESSAGES } from '../config/messages';
import { UnauthorizedError } from '../errors/httpErrors';
import { User } from '../models/user';
import { signinSchema, signupSchema } from '../schemas/auth';
import { signToken } from '../utils/jwt';
import { parseBody } from '../utils/parseBody';

export async function signup(req: Request, res: Response): Promise<void> {
  const { email, password, name } = parseBody(signupSchema, req.body);

  const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  // Si el correo ya existe, el índice único lanza un error que el manejador central convierte en 409.
  const user = await User.create({ email, password: passwordHash, name });

  res.status(201).json({ _id: user._id, email: user.email, name: user.name });
}

export async function signin(req: Request, res: Response): Promise<void> {
  const { email, password } = parseBody(signinSchema, req.body);

  const user = await User.findOne({ email }).select('+password');
  const isPasswordValid = user ? await bcrypt.compare(password, user.password) : false;

  // Mismo mensaje si falla el correo o la contraseña, para no revelar qué cuentas existen.
  if (!user || !isPasswordValid) {
    throw new UnauthorizedError(MESSAGES.INVALID_CREDENTIALS);
  }

  res.status(200).json({ token: signToken(user._id.toString()) });
}