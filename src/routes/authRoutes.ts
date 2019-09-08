import RouterData from './../types/RouterData';
import BaseRouter from './BaseRouter';
import AuthController from './../controllers/auth.controller';
import AuthValidator from './../validators/auth.validator';
import inputValidator from './../middlewares/validateInputMiddleware';

class AuthRoutes extends BaseRouter {
  constructor() {
    super();
    this.setRegisterRoute();
    this.setLoginRoute();
  }

  private setRegisterRoute(): void {
    this.router.post(
      '/register',
      AuthValidator.validateRegisterInput,
      inputValidator,
      AuthController.getRegisterController,
    );
  }

  private setLoginRoute(): void {
    this.router.post(
      '/login',
      AuthValidator.validateLoginInput,
      inputValidator,
      AuthController.getLoginController,
    );
  }

  getRouterData(): RouterData {
    return {
      path: '/auth',
      router: this.router,
    };
  }
}

export default AuthRoutes;
