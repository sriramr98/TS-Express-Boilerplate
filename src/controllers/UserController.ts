import { Request, Response } from 'express';
import { User } from '@models/User';
import UserService from '@services/UserService';
import Result from '@utils/Result';
import logger from '@config/winston';

export default class UserController {
  static async registerUserDataController(
    req: Request,
    res: Response,
  ): Promise<Response | void> {
    const user = {
      _id: res.locals.uid,
      ...(req.body as User),
    };
    const userWithId = await UserService.findUserById(res.locals.uid);
    if (userWithId) {
      return res
        .status(401)
        .json(
          Result.failure({
            message: 'User already registerd',
            errorCode: 'USER_ALREADY_REGISTERED',
          }),
        );
    }
    const savedUser = await UserService.createNewUser(user);
    logger.info({ savedUser });
    return res.json(Result.success(savedUser));
  }

  static async getAllUsersController(
    req: Request,
    res: Response,
  ): Promise<Response | void> {
    const users = await UserService.getAllUsers();
    return res.json(Result.success(users));
  }

  static async deleteAllUsersController(
    req: Request,
    res: Response,
  ): Promise<Response | void> {
    await UserService.deleteAllUsers();
    return res.json(Result.success({ deleted: true }));
  }
}
