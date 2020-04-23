import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import logger from '@config/winston';

import UnprocessableEntityException from '@utils/exceptions/UnprocessableEntityException';
import UnauthorizedException from '@utils/exceptions/UnauthorizedException';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | undefined> {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    next(new UnprocessableEntityException('Unable to find token id'));
    return;
  }
  try {
    const user = await admin.auth().verifyIdToken(token, true);
    if (user) {
      logger.info(user);
      res.locals.user = user;
      next();
    } else {
      next(new UnauthorizedException('Unable to authorize user'));
    }
  } catch (e) {
    next(new UnauthorizedException('Unable to authorize user'));
  }
}
