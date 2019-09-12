import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

import UnprocessableEntityException from '../utils/exceptions/UnprocessableEntityException';
import UnauthorizedException from '../utils/exceptions/UnauthorizedException';

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
  try {
    const token = await admin.auth().verifyIdToken(authToken);
    if (token) {
      req.body.uid = token.uid;
      next();
    } else {
      next(new UnauthorizedException('Unable to authorize user'));
    }
  } catch (e) {
    next(new UnauthorizedException('Unable to authorize user'));
  }
}
