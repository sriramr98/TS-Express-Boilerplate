import { Request, Response } from 'express';

import ApiResponse from './../utils/ApiResponse';
import Result from './../utils/Result';
import RegisterInput from '../types/input/RegisterInput.type';
import VendorData from './../data/VendorData';

import { hashPassword } from './../utils/passwordUtils';

export default class AuthController {
  static async getRegisterController(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const vendorData: RegisterInput = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      contactNo: req.body.contactNo,
      referralCode: req.body.referralCode,
    };

    const userWithEmail = await VendorData.getVendorWithEmail(vendorData.email);
    if (userWithEmail) {
      const errorResult = Result.failure({
        message: 'User with email alrßady exists',
      });
      return new ApiResponse(res, errorResult).conflict();
    }

    const hashedPassword = await hashPassword(vendorData.password);
    vendorData.password = hashedPassword;

    const savedVendor = await VendorData.insertVendor(vendorData);
    const successResult = Result.success(savedVendor);
    return new ApiResponse(res, successResult).apiSuccess();
  }
}
