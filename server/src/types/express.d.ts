// Amplía el tipo Request de Express con el usuario autenticado.
// Lo rellena middlewares/auth.ts y lo leen los controladores mediante utils/authUser.ts.
declare namespace Express {
  interface Request {
    user?: { _id: string };
  }
}