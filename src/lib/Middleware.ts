import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const ProtectedRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.params.APIPASS === process.env.API_PASS) {
    console.log('pass');
    next();
  } else {
    console.log('unautn');
    res.sendStatus(404);
  }
};
