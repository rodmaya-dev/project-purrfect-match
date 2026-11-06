// Modelo de usuario. Lo usarán el registro, el inicio de sesión y la ruta de perfil.
// La contraseña guarda solo el hash y no se incluye en las consultas salvo que se pida con select('+password').
import { Schema, model } from 'mongoose';
import validator from 'validator';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../config/constants';
import { MESSAGES } from '../config/messages';

export interface IUser {
  email: string;
  password: string;
  name: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, MESSAGES.EMAIL_REQUIRED],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: MESSAGES.EMAIL_INVALID,
      },
    },
    password: {
      type: String,
      required: [true, MESSAGES.PASSWORD_REQUIRED],
      select: false,
    },
    name: {
      type: String,
      required: [true, MESSAGES.NAME_REQUIRED],
      trim: true,
      minlength: [NAME_MIN_LENGTH, MESSAGES.NAME_TOO_SHORT],
      maxlength: [NAME_MAX_LENGTH, MESSAGES.NAME_TOO_LONG],
    },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', userSchema);