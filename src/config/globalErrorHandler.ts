import { Request, Response, NextFunction } from 'express';
import BaseException from '@utils/exceptions/BaseException';
import logger from '@config/winston';
import Result from '@utils/Result';

export default (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): Response => {
  if (err instanceof BaseException) {
    logger.error(`BaseException status code ${err.getStatusCode()}`);
    const result = Result.failure(err.getError());
    return res.status(err.getStatusCode() || 500).json(result);
  }
  return res.status(500).json(
    Result.failure({
      message: 'Something went wrong',
    }),
  );
};
