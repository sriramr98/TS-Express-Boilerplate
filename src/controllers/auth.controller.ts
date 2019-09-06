import { Request, Response, NextFunction } from 'express';

import Result from './../utils/Result';
import RegisterInput from '../types/input/RegisterInput.type';
import VendorData from './../data/VendorData';

import { hashPassword } from './../utils/passwordUtils';
import ConflictException from '../utils/exceptions/ConflictException';

export default class AuthController {
  static async getRegisterController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const vendorData: RegisterInput = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      contactNo: req.body.contactNo,
      referralCode: req.body.referralCode,
    };

    const userWithEmail = await VendorData.getVendorWithEmail(vendorData.email);
    if (userWithEmail) {
      next(new ConflictException('User with email already exists'));
      return;
    }

    const hashedPassword = await hashPassword(vendorData.password);
    vendorData.password = hashedPassword;

    const savedVendor = await VendorData.insertVendor(vendorData);
    const successResult = Result.success(savedVendor);
    return res.json(successResult.toObject());
  }
}
