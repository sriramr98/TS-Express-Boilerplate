import TestRoute from './testRoute';
import RouterData from './../types/RouterData';
import BaseRouter from './BaseRouter';
import AuthRoutes from './authRoutes';

class ApiRoutes extends BaseRouter {
  constructor() {
    super();
    this.initRoutes();
  }

  private initAuthRoutes(): void {
    const authRoute = new AuthRoutes().getRouterData();
    this.router.use(authRoute.path, authRoute.router);
  }

  private initRoutes(): void {
    this.initTestRoute();
    this.initAuthRoutes();
  }

  private initTestRoute(): void {
    const testRoute = new TestRoute().getRouterData();
    this.router.use(testRoute.path, testRoute.router);
  }

  getRouterData(): RouterData {
    return {
      path: '/api',
      router: this.router,
    };
  }
}

export default ApiRoutes;
