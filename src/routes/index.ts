import TestRoute from './testRoute';
import RouterData from '@interfaces/RouterData';
import BaseRouter from './BaseRouter';
import UserRoutes from './userRoutes';

class ApiRoutes extends BaseRouter {
  constructor() {
    super();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.initTestRoute();
    this.initUserRoutes();
  }

  private initUserRoutes(): void {
    const userRoute = new UserRoutes().getRouterData();
    this.router.use(userRoute.path, userRoute.router);
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
