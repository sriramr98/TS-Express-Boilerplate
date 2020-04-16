import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Result from '@utils/Result';
import logger from '@config/winston';

export default function validateInputMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | undefined {
  const errors = validationResult(req);
  logger.info('Errors', errors.array());
  if (!errors.isEmpty()) {
    const topError = errors.array()[0];
    const result = Result.failure({
      message: topError.msg,
    });
    return res.status(400).json(result);
  }
  next();
  return;
}
