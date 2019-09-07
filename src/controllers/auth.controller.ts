import { Request, Response, NextFunction } from 'express';

import Result from './../utils/Result';
import RegisterInput from '../types/input/RegisterInput.type';
import VendorData from './../data/VendorData';
import { hashPassword, comparePassword } from './../utils/passwordUtils';
import ConflictException from '../utils/exceptions/ConflictException';
import NotFoudException from '../utils/exceptions/NotFoundException';
import UnauthorizedException from '../utils/exceptions/UnauthorizedException';
import { createJwt } from './../utils/utils';
import { logger } from '../utils/logger';

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

  static async getLoginController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const loginInput = {
      email: req.body.email,
      password: req.body.password,
    };
    const vendorData = await VendorData.getVendorWithEmail(loginInput.email);
    if (!vendorData) {
      next(new NotFoudException('Unable to find user.'));
      return;
    }
    const isPasswordValid = await comparePassword(
      loginInput.password,
      vendorData.password,
    );
    if (!isPasswordValid) {
      next(new UnauthorizedException('Wrong password'));
      return;
    }
    const accessToken = createJwt({
      id: vendorData._id,
    });
    const refreshToken = createJwt(
      {
        id: vendorData._id,
      },
      true,
    );
    const result = Result.success({
      accessToken,
      refreshToken,
    });
    return res.json(result.toObject());
  }
}
