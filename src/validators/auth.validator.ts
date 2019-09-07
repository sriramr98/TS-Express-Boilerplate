import { Request, Response, NextFunction } from 'express';

export default class AuthValidator {
  static validateRegisterInput(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    //TODO: Add validation rules
    next();
  }

  static validateLoginInput(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    //TODO: Add validation rules
    next();
  }
}
