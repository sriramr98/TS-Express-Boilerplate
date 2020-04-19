import BaseRouter from './BaseRouter';
import RouterData from '@interfaces/RouterData';
import UserController from '@controllers/UserController';
import authenticateUser from '@middlewares/authenticateUser';
import asyncHandler from '@utils/asyncHandler';

export default class UserRoutes extends BaseRouter {
  constructor() {
    super();

    this.router
      .route('/')
      .get(authenticateUser, asyncHandler(UserController.getAllUsersController))
      .post(
        authenticateUser,
        asyncHandler(UserController.registerUserDataController),
      )
      .delete(
        authenticateUser,
        asyncHandler(UserController.deleteAllUsersController),
      );

    this.router.get(
      '/me',
      authenticateUser,
      asyncHandler(UserController.getUserController),
    );
  }

  getRouterData(): RouterData {
    return {
      path: '/user',
      router: this.router,
    };
  }
}
