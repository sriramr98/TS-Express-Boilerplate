import { Request, Response, NextFunction } from 'express';

import Result from './../utils/Result';
import RegisterInput from '../types/input/RegisterInput.type';
import UserData from '../data/UserData';
import { hashPassword, comparePassword } from './../utils/passwordUtils';
import ConflictException from '../utils/exceptions/ConflictException';
import NotFoudException from '../utils/exceptions/NotFoundException';
import UnauthorizedException from '../utils/exceptions/UnauthorizedException';
import { createJwt } from './../utils/utils';

export default class AuthController {
  static async getRegisterController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const userData: RegisterInput = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      contactNo: req.body.contactNo,
      referralCode: req.body.referralCode,
    };

    const userWithEmail = await UserData.getUserWithEmail(userData.email);
    if (userWithEmail) {
      next(new ConflictException('User with email already exists'));
      return;
    }

    const hashedPassword = await hashPassword(userData.password);
    userData.password = hashedPassword;

    const savedVendor = await UserData.insertUser(userData);
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
    const userData = await UserData.getUserWithEmail(loginInput.email);
    if (!userData) {
      next(new NotFoudException('Unable to find user.'));
      return;
    }
    const isPasswordValid = await comparePassword(
      loginInput.password,
      userData.password,
    );
    if (!isPasswordValid) {
      next(new UnauthorizedException('Wrong password'));
      return;
    }
    const accessToken = createJwt({
      id: userData._id,
    });
    const refreshToken = createJwt(
      {
        id: userData._id,
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
