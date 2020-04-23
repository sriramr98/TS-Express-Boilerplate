import { Request, Response, NextFunction } from 'express';
import { User } from '@models/User';
import UserService from '@services/UserService';
import Result from '@utils/Result';
import logger from '@config/winston';
import NotFoudException from '@utils/exceptions/NotFoundException';
import errorCodes from '@config/errorCodes';

export default class UserController {
  static async registerUserDataController(
    req: Request,
    res: Response,
  ): Promise<Response | void> {
    const { uid: userId } = res.locals.user || {};

    const userBody = req.body as User;
    // no one should be able to modify this field through an api call
    // TODO: Find a more efficient solution
    delete userBody['isAdmin'];

    const user = {
      _id: userId,
      ...userBody,
    };
    const userWithId = await UserService.findUserById(userId);
    if (userWithId) {
      return res.status(401).json(
        Result.failure({
          message: 'User already registerd',
          errorCode: errorCodes.USER_ALREADY_REGISTERED,
        }),
      );
    }
    const savedUser = await UserService.createNewUser(user);
    return res.json(Result.success(savedUser));
  }

  static async getAllUsersController(
    _: Request,
    res: Response,
  ): Promise<Response | void> {
    const users = await UserService.getAllUsers();
    return res.json(Result.success(users));
  }

  static async deleteAllUsersController(
    _: Request,
    res: Response,
  ): Promise<Response | void> {
    await UserService.deleteAllUsers();
    return res.json(Result.success({ deleted: true }));
  }

  static async getUserController(
    _: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { uid: userId } = res.locals.user || {};
    const userData = await UserService.findUserById(userId);
    if (!userData) {
      return next(new NotFoudException('User not found'));
    }
    const userMeta = UserService.getUserMeta(userData, res.locals.user);

    return res.json(
      Result.success({
        user: userData,
        meta: userMeta,
      }),
    );
  }
}
