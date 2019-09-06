import RouterData from './../types/RouterData';
import BaseRouter from './BaseRouter';
import AuthController from './../controllers/auth.controller';
import AuthValidator from './../validators/auth.validator';

class AuthRoutes extends BaseRouter {
  constructor() {
    super();
    this.setRegisterRoute();
  }

  private setRegisterRoute(): void {
    this.router.post(
      '/register',
      AuthValidator.validateRegisterInput,
      AuthController.getRegisterController,
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
