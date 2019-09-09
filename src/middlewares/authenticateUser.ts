import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

import Result from './../utils/Result';
import UnprocessableEntityException from '../utils/exceptions/UnprocessableEntityException';

export default async function(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> {
  const authToken = req.headers.authorization;
  if (!authToken) {
    next(new UnprocessableEntityException('Unable to find token id'));
    return;
  }
  const token = await admin.auth().verifyIdToken(authToken);
}
